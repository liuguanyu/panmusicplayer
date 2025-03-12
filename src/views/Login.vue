<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">百度云音乐播放器</h1>
        <p class="login-subtitle">{{ loginMode === 'qrcode' ? '请使用百度云盘客户端扫码登录' : '请使用设备码登录' }}</p>
      </div>
      
      <div class="login-mode-switch">
        <a-radio-group v-model:value="loginMode" button-style="solid">
          <a-radio-button value="qrcode">二维码登录</a-radio-button>
          <a-radio-button value="device">设备码登录</a-radio-button>
        </a-radio-group>
      </div>
      
      <!-- 二维码登录模式 -->
      <div v-if="loginMode === 'qrcode'" class="login-content">
        <div v-if="qrCodeLoading" class="qrcode-loading">
          <a-spin tip="获取二维码中..." />
        </div>
        
        <div v-else-if="qrCodeError" class="qrcode-error">
          <a-result status="error" title="获取二维码失败">
            <template #extra>
              <a-button type="primary" @click="getQRCode">
                重新获取
              </a-button>
            </template>
          </a-result>
        </div>
        
        <div v-else-if="qrCode" class="qrcode-container">
          <div class="qrcode-wrapper">
            <img :src="qrCode.imgUrl" alt="登录二维码" class="qrcode-img" />
          </div>
          
          <div class="qrcode-status">
            <p v-if="qrCodeStatus === 'WAITING'" class="status-text">
              <a-badge status="processing" text="等待扫码" />
            </p>
            <p v-else-if="qrCodeStatus === 'SCANNED'" class="status-text">
              <a-badge status="warning" text="已扫码，请在手机上确认" />
            </p>
            <p v-else-if="qrCodeStatus === 'EXPIRED'" class="status-text">
              <a-badge status="error" text="二维码已过期" />
              <a-button type="primary" size="small" @click="getQRCode" class="refresh-btn">
                刷新二维码
              </a-button>
            </p>
          </div>
          
          <div class="qrcode-tips">
            <p>1. 打开百度网盘App</p>
            <p>2. 点击"我的"，然后点击右上角扫一扫</p>
            <p>3. 扫描二维码登录</p>
          </div>
        </div>
      </div>
      
      <!-- 设备码登录模式 -->
      <div v-else class="login-content">
        <div v-if="deviceCodeLoading" class="device-code-loading">
          <a-spin tip="获取设备码中..." />
        </div>
        
        <div v-else-if="deviceCodeError" class="device-code-error">
          <a-result status="error" title="获取设备码失败">
            <template #extra>
              <a-button type="primary" @click="getDeviceCode">
                重新获取
              </a-button>
            </template>
          </a-result>
        </div>
        
        <div v-else-if="deviceCode" class="device-code-container">
          <div class="device-code-wrapper">
            <div class="user-code-display">
              <h3>用户码</h3>
              <div class="user-code">{{ deviceCode.user_code }}</div>
            </div>
            
            <div class="verification-url">
              <p>请访问以下网址并输入上方用户码：</p>
              <a :href="deviceCode.verification_url" target="_blank" class="url-link">
                {{ deviceCode.verification_url }}
              </a>
            </div>
            
            <div v-if="deviceCode.qrcode_url" class="device-qrcode-wrapper">
              <p>或扫描下方二维码：</p>
              <img :src="deviceCode.qrcode_url" alt="设备码二维码" class="device-qrcode-img" />
            </div>
          </div>
          
          <div class="device-code-status">
            <p v-if="deviceCodeStatus === 'WAITING'" class="status-text">
              <a-badge status="processing" text="等待授权" />
            </p>
            <p v-else-if="deviceCodeStatus === 'CONFIRMED'" class="status-text">
              <a-badge status="success" text="授权成功，正在登录..." />
            </p>
            <p v-else-if="deviceCodeStatus === 'EXPIRED'" class="status-text">
              <a-badge status="error" text="设备码已过期" />
              <a-button type="primary" size="small" @click="getDeviceCode" class="refresh-btn">
                刷新设备码
              </a-button>
            </p>
            <p v-else-if="deviceCodeStatus === 'ERROR'" class="status-text">
              <a-badge status="error" :text="deviceCodeStatusMessage || '授权出错'" />
              <a-button type="primary" size="small" @click="getDeviceCode" class="refresh-btn">
                重新获取
              </a-button>
            </p>
          </div>
          
          <div class="device-code-tips">
            <p>1. 打开上方链接或使用手机扫描二维码</p>
            <p>2. 登录百度账号（如已登录可跳过此步）</p>
            <p>3. 输入用户码并确认授权</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();

// 登录模式
const loginMode = ref('qrcode'); // qrcode 或 device

// 二维码登录状态
const qrCode = ref(null);
const qrCodeLoading = ref(false);
const qrCodeError = ref(false);
const qrCodeStatus = ref('WAITING'); // WAITING, SCANNED, EXPIRED
const qrCodeCheckInterval = ref(null);

// 设备码登录状态
const deviceCode = ref(null);
const deviceCodeLoading = ref(false);
const deviceCodeError = ref(false);
const deviceCodeStatus = ref('WAITING'); // WAITING, CONFIRMED, EXPIRED, ERROR
const deviceCodeStatusMessage = ref('');
const deviceCodeCheckInterval = ref(null);

// 监听登录模式变化
watch(loginMode, (newMode) => {
  // 清除所有检查间隔
  clearAllIntervals();
  
  if (newMode === 'qrcode') {
    if (!qrCode.value || qrCodeStatus.value === 'EXPIRED') {
      getQRCode();
    } else {
      startCheckingQRCodeStatus();
    }
  } else {
    if (!deviceCode.value || deviceCodeStatus.value === 'EXPIRED' || deviceCodeStatus.value === 'ERROR') {
      getDeviceCode();
    } else {
      startCheckingDeviceCodeStatus();
    }
  }
});

// 清除所有检查间隔
const clearAllIntervals = () => {
  if (qrCodeCheckInterval.value) {
    clearInterval(qrCodeCheckInterval.value);
    qrCodeCheckInterval.value = null;
  }
  
  if (deviceCodeCheckInterval.value) {
    clearInterval(deviceCodeCheckInterval.value);
    deviceCodeCheckInterval.value = null;
  }
};

// 获取二维码
const getQRCode = async () => {
  qrCodeLoading.value = true;
  qrCodeError.value = false;
  
  try {
    // 清除之前的检查间隔
    clearAllIntervals();
    
    // 获取二维码
    const result = await userStore.getLoginQRCode();
    qrCode.value = result;
    qrCodeStatus.value = 'WAITING';
    
    // 开始检查二维码状态
    startCheckingQRCodeStatus();
  } catch (error) {
    console.error('获取二维码失败:', error);
    qrCodeError.value = true;
    message.error('获取二维码失败，请重试');
  } finally {
    qrCodeLoading.value = false;
  }
};

// 检查二维码状态
const checkQRCodeStatus = async () => {
  if (!qrCode.value) return;
  
  try {
    const status = await userStore.checkQRCodeStatus(qrCode.value);
    
    if (status.status === 'SCANNED') {
      qrCodeStatus.value = 'SCANNED';
    } else if (status.status === 'CONFIRMED') {
      // 登录成功
      clearAllIntervals();
      
      // 保存登录信息
      await userStore.login(qrCode.value);
      
      message.success('登录成功');
      router.push('/');
    } else if (status.status === 'EXPIRED') {
      qrCodeStatus.value = 'EXPIRED';
      clearAllIntervals();
    }
  } catch (error) {
    console.error('检查二维码状态失败:', error);
  }
};

// 开始检查二维码状态
const startCheckingQRCodeStatus = () => {
  // 每3秒检查一次
  qrCodeCheckInterval.value = setInterval(checkQRCodeStatus, 3000);
};

// 获取设备码
const getDeviceCode = async () => {
  deviceCodeLoading.value = true;
  deviceCodeError.value = false;
  deviceCodeStatus.value = 'WAITING';
  deviceCodeStatusMessage.value = '';
  
  try {
    // 清除之前的检查间隔
    clearAllIntervals();
    
    // 获取设备码
    const result = await window.electronAPI.baiduPan.getDeviceCode();
    deviceCode.value = result;
    
    // 开始检查设备码状态
    startCheckingDeviceCodeStatus();
  } catch (error) {
    console.error('获取设备码失败:', error);
    deviceCodeError.value = true;
    message.error('获取设备码失败，请重试');
  } finally {
    deviceCodeLoading.value = false;
  }
};

// 检查设备码状态
const checkDeviceCodeStatus = async () => {
  if (!deviceCode.value) return;
  
  try {
    const status = await window.electronAPI.baiduPan.checkDeviceCodeStatus(deviceCode.value);
    
    if (status.status === 'CONFIRMED') {
      deviceCodeStatus.value = 'CONFIRMED';
      clearAllIntervals();
      
      // 使用设备码登录
      await loginWithDeviceCode();
    } else if (status.status === 'EXPIRED') {
      deviceCodeStatus.value = 'EXPIRED';
      clearAllIntervals();
    } else if (status.status === 'ERROR') {
      deviceCodeStatus.value = 'ERROR';
      deviceCodeStatusMessage.value = status.message || '授权出错';
      clearAllIntervals();
    }
  } catch (error) {
    console.error('检查设备码状态失败:', error);
    deviceCodeStatus.value = 'ERROR';
    deviceCodeStatusMessage.value = error.message || '检查设备码状态失败';
  }
};

// 开始检查设备码状态
const startCheckingDeviceCodeStatus = () => {
  // 每5秒检查一次，根据百度API要求，轮询间隔不能低于5秒
  deviceCodeCheckInterval.value = setInterval(checkDeviceCodeStatus, 5000);
};

// 使用设备码登录
const loginWithDeviceCode = async () => {
  try {
    await window.electronAPI.baiduPan.loginWithDeviceCode(deviceCode.value);
    
    // 获取用户信息
    await userStore.getUserInfo();
    
    message.success('登录成功');
    router.push('/');
  } catch (error) {
    console.error('设备码登录失败:', error);
    deviceCodeStatus.value = 'ERROR';
    deviceCodeStatusMessage.value = error.message || '登录失败';
    message.error('登录失败，请重试');
  }
};

// 检查是否已登录
const checkLoginStatus = async () => {
  try {
    const isLoggedIn = await userStore.checkLoginStatus();
    if (isLoggedIn) {
      router.push('/');
    }
  } catch (error) {
    console.error('检查登录状态失败:', error);
  }
};

// 生命周期钩子
onMounted(() => {
  checkLoginStatus();
  
  // 根据当前登录模式初始化
  if (loginMode.value === 'qrcode') {
    getQRCode();
  } else {
    getDeviceCode();
  }
});

onBeforeUnmount(() => {
  clearAllIntervals();
});
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: var(--color-bg-base);
}

.login-card {
  width: 400px;
  padding: 32px;
  background-color: var(--color-bg-container);
  border-radius: 8px;
  box-shadow: var(--shadow-2);
}

.login-header {
  text-align: center;
  margin-bottom: 16px;
}

.login-title {
  font-size: 24px;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.login-subtitle {
  font-size: 14px;
  color: var(--color-text-secondary);
}

.login-mode-switch {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.login-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.qrcode-loading,
.qrcode-error,
.device-code-loading,
.device-code-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.qrcode-container,
.device-code-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-wrapper {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 16px;
}

.qrcode-img,
.device-qrcode-img {
  width: 200px;
  height: 200px;
}

.qrcode-status,
.device-code-status {
  margin-bottom: 24px;
  text-align: center;
}

.status-text {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.refresh-btn {
  margin-left: 8px;
}

.qrcode-tips,
.device-code-tips {
  width: 100%;
  padding: 16px;
  background-color: var(--color-bg-subtle);
  border-radius: 4px;
  
  p {
    margin-bottom: 8px;
    color: var(--color-text-secondary);
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.device-code-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 16px;
}

.user-code-display {
  text-align: center;
  margin-bottom: 16px;
  
  h3 {
    margin-bottom: 8px;
    color: var(--color-text-secondary);
  }
}

.user-code {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 12px 24px;
  background-color: var(--color-bg-subtle);
  border-radius: 4px;
  color: var(--color-text-primary);
}

.verification-url {
  text-align: center;
  margin-bottom: 16px;
  
  p {
    margin-bottom: 8px;
    color: var(--color-text-secondary);
  }
}

.url-link {
  color: var(--color-primary);
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
}

.device-qrcode-wrapper {
  text-align: center;
  margin-top: 16px;
  
  p {
    margin-bottom: 8px;
    color: var(--color-text-secondary);
  }
}
