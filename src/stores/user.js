import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const qrCode = ref(null);
  const qrCodeStatus = ref(null);
  const deviceCode = ref(null);
  const deviceCodeStatus = ref(null);

  // 计算属性
  const isLoggedIn = computed(() => !!user.value);
  const userInfo = computed(() => user.value);

  // 保存百度云盘配置
  const saveBaiduPanConfig = async (config) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.saveConfig(config);
      if (!response.success) {
        throw new Error(response.error || '保存配置失败');
      }
      return response.data;
    } catch (err) {
      console.error('保存百度云盘配置失败:', err);
      error.value = '保存百度云盘配置失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 获取登录二维码
  const getLoginQRCode = async () => {
    isLoading.value = true;
    error.value = null;
    qrCode.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.getLoginQRCode();
      if (!response.success) {
        throw new Error(response.error || '获取登录二维码失败');
      }
      qrCode.value = response.data;
      return qrCode.value;
    } catch (err) {
      console.error('获取登录二维码失败:', err);
      error.value = '获取登录二维码失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 检查二维码状态
  const checkQRCodeStatus = async () => {
    if (!qrCode.value) {
      throw new Error('请先获取二维码');
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.checkQRCodeStatus(qrCode.value);
      if (!response.success) {
        throw new Error(response.error || '检查二维码状态失败');
      }
      qrCodeStatus.value = response.data;
      return qrCodeStatus.value;
    } catch (err) {
      console.error('检查二维码状态失败:', err);
      error.value = '检查二维码状态失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 登录
  const login = async () => {
    if (!qrCode.value) {
      throw new Error('请先获取二维码');
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.login(qrCode.value);
      if (!response.success) {
        throw new Error(response.error || '登录失败');
      }
      
      // 保存用户信息和token
      user.value = response.data.user;
      token.value = response.data.token;
      
      // 清除二维码状态
      qrCode.value = null;
      qrCodeStatus.value = null;
      
      return response.data;
    } catch (err) {
      console.error('登录失败:', err);
      error.value = '登录失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 登出
  const logout = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.logout();
      if (!response.success) {
        throw new Error(response.error || '登出失败');
      }
      
      // 清除用户信息和token
      user.value = null;
      token.value = null;
      
      return true;
    } catch (err) {
      console.error('登出失败:', err);
      error.value = '登出失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 验证令牌
  const verifyToken = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.verifyToken();
      if (!response.success) {
        throw new Error(response.error || '验证令牌失败');
      }
      
      return response.data;
    } catch (err) {
      console.error('验证令牌失败:', err);
      error.value = '验证令牌失败';
      
      // 验证失败时清除用户信息
      user.value = null;
      token.value = null;
      
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // 检查登录状态
  const checkLoginStatus = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      // 验证token是否有效
      const isValid = await verifyToken();
      
      if (isValid) {
        // 获取用户信息
        await fetchUserInfo();
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('检查登录状态失败:', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  // 获取用户信息
  const fetchUserInfo = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.getUserInfo();
      if (!response.success) {
        throw new Error(response.error || '获取用户信息失败');
      }
      
      user.value = response.data;
      return user.value;
    } catch (err) {
      console.error('获取用户信息失败:', err);
      error.value = '获取用户信息失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  
  // 获取设备码
  const getDeviceCode = async () => {
    isLoading.value = true;
    error.value = null;
    deviceCode.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.getDeviceCode();
      if (!response.success) {
        throw new Error(response.error || '获取设备码失败');
      }
      deviceCode.value = response.data;
      return deviceCode.value;
    } catch (err) {
      console.error('获取设备码失败:', err);
      error.value = '获取设备码失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 检查设备码状态
  const checkDeviceCodeStatus = async (deviceCodeData) => {
    if (!deviceCodeData && !deviceCode.value) {
      throw new Error('请先获取设备码');
    }
    
    const codeToCheck = deviceCodeData || deviceCode.value;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.checkDeviceCodeStatus(codeToCheck);
      if (!response.success) {
        throw new Error(response.error || '检查设备码状态失败');
      }
      deviceCodeStatus.value = response.data;
      return deviceCodeStatus.value;
    } catch (err) {
      console.error('检查设备码状态失败:', err);
      error.value = '检查设备码状态失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  // 使用设备码登录
  const loginWithDeviceCode = async (deviceCodeData) => {
    if (!deviceCodeData && !deviceCode.value) {
      throw new Error('请先获取设备码');
    }
    
    const codeToUse = deviceCodeData || deviceCode.value;
    
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await window.electronAPI.baiduPan.loginWithDeviceCode(codeToUse);
      if (!response.success) {
        throw new Error(response.error || '使用设备码登录失败');
      }
      
      // 保存用户信息和token
      token.value = response.data.token;
      
      // 获取用户信息
      await fetchUserInfo();
      
      // 清除设备码状态
      deviceCode.value = null;
      deviceCodeStatus.value = null;
      
      return response.data;
    } catch (err) {
      console.error('使用设备码登录失败:', err);
      error.value = '使用设备码登录失败';
      throw err;
    } finally {
      isLoading.value = false;
    }
  };
  
  // 为了兼容性，添加getUserInfo作为fetchUserInfo的别名
  const getUserInfo = fetchUserInfo;

  return {
    user,
    token,
    isLoading,
    error,
    qrCode,
    qrCodeStatus,
    deviceCode,
    deviceCodeStatus,
    isLoggedIn,
    userInfo,
    saveBaiduPanConfig,
    getLoginQRCode,
    checkQRCodeStatus,
    login,
    logout,
    verifyToken,
    checkLoginStatus,
    fetchUserInfo,
    getUserInfo,
    getDeviceCode,
    checkDeviceCodeStatus,
    loginWithDeviceCode
  };
});
