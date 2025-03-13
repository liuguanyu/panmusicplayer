const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const { app } = require('electron');
const { join } = require('path');
const fs = require('fs');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);

// 导入百度云盘API配置
let config;
try {
  // 尝试加载实际配置文件
  config = require('../config/baiduPanConfig.cjs');
} catch (error) {
  console.error('无法加载百度云盘配置文件，请确保已创建 electron/config/baiduPanConfig.cjs 文件');
  console.error('可以复制 electron/config/baiduPanConfig.example.cjs 并填入你的实际配置');
  // 使用空配置，避免程序崩溃
  config = {
    appId: '',
    appKey: '',
    secretKey: '',
    signKey: '',
    redirectUri: 'oob',
    scope: 'basic,netdisk',
    deviceId: '',
    deviceName: '度盘读天下',
    apiBaseUrl: 'https://pan.baidu.com/rest/2.0',
    oauthUrl: 'https://openapi.baidu.com/oauth/2.0',
  };
}

// 存储路径
const configPath = join(app.getPath('userData'), 'baiduPan');
const tokenPath = join(configPath, 'token.json');

// 确保配置目录存在
const ensureConfigDir = async () => {
  if (!(await exists(configPath))) {
    await mkdir(configPath, { recursive: true });
  }
};

// 保存配置
const saveConfig = async (newConfig) => {
  await ensureConfigDir();
  Object.assign(config, newConfig);
  await writeFile(
    join(configPath, 'config.json'),
    JSON.stringify(config, null, 2)
  );
  return config;
};

// 加载配置
const loadConfig = async () => {
  await ensureConfigDir();
  try {
    const configFile = join(configPath, 'config.json');
    if (await exists(configFile)) {
      const data = await readFile(configFile, 'utf8');
      Object.assign(config, JSON.parse(data));
    }
    return config;
  } catch (error) {
    console.error('加载配置失败:', error);
    return config;
  }
};

// 保存令牌
const saveToken = async (token) => {
  await ensureConfigDir();
  await writeFile(tokenPath, JSON.stringify(token, null, 2));
  return token;
};

// 加载令牌
const loadToken = async () => {
  try {
    if (await exists(tokenPath)) {
      const data = await readFile(tokenPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('加载令牌失败:', error);
  }
  return null;
};

// 清除令牌
const clearToken = async () => {
  try {
    if (await exists(tokenPath)) {
      await fs.promises.unlink(tokenPath);
    }
  } catch (error) {
    console.error('清除令牌失败:', error);
  }
};

// 刷新令牌
const refreshToken = async (token) => {
  try {
    const response = await axios.get(
      `${config.oauthUrl}/token`,
      {
        params: {
          grant_type: 'refresh_token',
          refresh_token: token.refresh_token,
          client_id: config.appKey,
          client_secret: config.secretKey,
        },
        headers: {
          'User-Agent': 'pan.baidu.com',
        },
      }
    );

    const newToken = {
      ...token,
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token || token.refresh_token,
      expires_in: response.data.expires_in,
      expires_at: Date.now() + response.data.expires_in * 1000,
    };

    await saveToken(newToken);
    return newToken;
  } catch (error) {
    console.error('刷新令牌失败:', error);
    throw error;
  }
};

// 获取有效令牌
const getValidToken = async () => {
  let token = await loadToken();

  if (!token) {
    throw new Error('未登录，请先登录');
  }

  // 如果令牌即将过期（提前5分钟刷新），则刷新令牌
  if (token.expires_at - Date.now() < 300000) {
    token = await refreshToken(token);
  }

  return token;
};

// 获取授权码（设备码和用户码）
const getAuthCode = async () => {
  try {
    await loadConfig();
    
    // 生成设备ID（如果不存在）
    if (!config.deviceId) {
      config.deviceId = crypto.randomUUID();
      await saveConfig(config);
    }

    console.log('正在获取授权码，使用参数:', {
      client_id: config.appKey,
      response_type: 'device_code',
      scope: config.scope,
    });

    // 使用设备码模式API
    const response = await axios.get(`${config.oauthUrl}/device/code`, {
      params: {
        response_type: 'device_code',
        client_id: config.appKey,
        scope: config.scope,
      },
      headers: {
        'User-Agent': 'pan.baidu.com',
      },
    });

    console.log('授权码API响应:', response.data);

    if (response.data.error) {
      throw new Error(`获取授权码失败: ${response.data.error_description || response.data.error}`);
    }

    return {
      device_code: response.data.device_code,
      user_code: response.data.user_code,
      verification_url: response.data.verification_url || 'https://openapi.baidu.com/device',
      qrcode_url: response.data.qrcode_url,
      imgUrl: response.data.qrcode_url, // 为了兼容前端代码
      expires_in: response.data.expires_in,
      interval: response.data.interval || 5,
    };
  } catch (error) {
    console.error('获取授权码失败:', error);
    throw error;
  }
};

// 上次轮询时间
let lastPollTime = 0;
// 默认轮询间隔（秒）
const DEFAULT_POLL_INTERVAL = 5;

// 检查授权码状态
const checkAuthCodeStatus = async (authCode) => {
  console.log('检查授权码状态:', authCode);
  try {
    await loadConfig();
    
    // 支持传入完整的授权码对象或仅设备码字符串
    const deviceCode = typeof authCode === 'string' ? authCode : authCode.device_code;
    const interval = (typeof authCode === 'object' && authCode.interval) ? authCode.interval : DEFAULT_POLL_INTERVAL;
    
    // 确保轮询间隔符合要求（至少5秒）
    const now = Date.now();
    const timeSinceLastPoll = (now - lastPollTime) / 1000;
    
    if (timeSinceLastPoll < interval) {
      console.log(`轮询间隔过短，等待${interval - timeSinceLastPoll}秒后重试`);
      return { status: 'WAITING', message: '等待轮询间隔' };
    }
    
    // 更新轮询时间
    lastPollTime = now;
    
    console.log('发送请求到:', `${config.oauthUrl}/token`);
    console.log('请求参数:', {
      grant_type: 'device_token',
      code: deviceCode,
      client_id: config.appKey,
      client_secret: config.secretKey,
    });
    
    // 使用GET方法，与百度API文档保持一致
    const response = await axios.get(
      `${config.oauthUrl}/token`,
      {
        params: {
          grant_type: 'device_token',
          code: deviceCode,
          client_id: config.appKey,
          client_secret: config.secretKey,
        },
        headers: {
          'User-Agent': 'pan.baidu.com',
          'Accept': 'application/json',
        },
      }
    );

    // 如果成功获取到token，表示用户已授权
    if (response.data.access_token) {
      // 创建token对象
      const token = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
        expires_at: Date.now() + response.data.expires_in * 1000,
        scope: response.data.scope,
      };
      
      // 保存token到本地文件
      await saveToken(token);
      
      // 返回状态，但不包含完整token对象，避免序列化问题
      return {
        status: 'CONFIRMED',
        // 只返回必要的信息，不截取access_token，避免可能的问题
        tokenInfo: {
          access_token: response.data.access_token,
          expires_in: response.data.expires_in,
          scope: response.data.scope,
        }
      };
    }

    return { status: 'WAITING' };
  } catch (error) {
    // 检查错误类型
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      
      // 授权码过期
      if (errorData.error === 'expired_token') {
        return { status: 'EXPIRED', message: '授权码已过期，请重新获取' };
      }
      
      // 用户取消授权
      if (errorData.error === 'authorization_declined') {
        return { status: 'CANCELED', message: '用户已取消授权' };
      }
      
      // 授权码未被使用，继续等待
      if (errorData.error === 'authorization_pending') {
        return { status: 'WAITING', message: '等待用户授权' };
      }
      
      // 请求过于频繁
      if (errorData.error === 'slow_down') {
        return { 
          status: 'SLOW_DOWN', 
          message: '请求过于频繁，请降低请求频率',
          // 建议增加轮询间隔
          suggestedInterval: (error.response.data.interval || 10)
        };
      }
      
      // 无效的授权码
      if (errorData.error === 'invalid_grant' || errorData.error === 'invalid_request') {
        return { status: 'INVALID', message: '无效的授权码，请重新获取' };
      }
      
      // 授权码已被撤销
      if (errorData.error === 'access_denied') {
        return { status: 'REVOKED', message: '授权码已被撤销，请重新获取' };
      }

      // 其他错误
      return { 
        status: 'ERROR', 
        message: errorData.error_description || errorData.error || '未知错误' 
      };
    }
    
    console.error('检查授权码状态失败:', error);
    return { status: 'ERROR', message: error.message || '网络错误' };
  }
};

// 使用授权码登录
const loginWithAuthCode = async (authCode) => {
  console.log('使用授权码登录:', authCode);
  try {
    // 支持传入完整的授权码对象或仅设备码字符串
    const deviceCode = typeof authCode === 'string' ? authCode : authCode.device_code;
    const interval = (typeof authCode === 'object' && authCode.interval) ? authCode.interval : DEFAULT_POLL_INTERVAL;
    
    // 检查授权码状态
    const status = await checkAuthCodeStatus({
      device_code: deviceCode,
      interval: interval
    });

    console.log('授权码状态:', status);
    
    // 如果状态是WAITING或SLOW_DOWN，则返回状态，让调用者继续轮询
    if (status.status === 'WAITING' || status.status === 'SLOW_DOWN') {
      return status;
    }
    
    // 如果状态不是CONFIRMED，则抛出错误
    if (status.status !== 'CONFIRMED') {
      throw new Error(`授权码未确认: ${status.message || status.status}`);
    }

    // 令牌已经在checkAuthCodeStatus中保存，直接加载
    const token = await loadToken();
    if (!token) {
      throw new Error('获取令牌失败');
    }
    
    // 获取用户信息
    const userInfo = await getUserInfo(token);
    
    return {
      token: {
        // 只返回必要的信息，不截取access_token，避免可能的问题
        access_token: token.access_token,
        expires_in: token.expires_in,
        scope: token.scope,
      },
      user: userInfo,
    };
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 登出
const logout = async () => {
  try {
    const token = await loadToken();
    
    if (token) {
      // 调用百度API注销令牌
      try {
        await axios.get(`${config.oauthUrl}/revoke`, {
          params: {
            access_token: token.access_token,
          },
        });
      } catch (error) {
        console.error('注销令牌失败:', error);
      }
      
      // 清除本地令牌
      await clearToken();
    }
    
    return true;
  } catch (error) {
    console.error('登出失败:', error);
    throw error;
  }
};

// 验证令牌
const verifyToken = async () => {
  try {
    const token = await loadToken();
    
    if (!token) {
      return false;
    }

    // 如果令牌已过期，尝试刷新
    if (token.expires_at <= Date.now()) {
      try {
        await refreshToken(token);
      } catch (error) {
        console.error('刷新令牌失败:', error);
        return false;
      }
    }

    // 验证令牌有效性
    try {
      const response = await axios.get(`${config.oauthUrl}/tokeninfo`, {
        params: {
          access_token: token.access_token,
        },
      });
      
      return !!response.data.scope;
    } catch (error) {
      console.error('验证令牌失败:', error);
      return false;
    }
  } catch (error) {
    console.error('验证令牌失败:', error);
    return false;
  }
};

// 获取用户信息
const getUserInfo = async (tokenObj) => {
  try {
    console.log('开始获取用户信息');
    const token = tokenObj || await getValidToken();
    console.log('获取到有效token:', token ? '成功' : '失败');
    
    console.log('请求用户信息API:', `${config.apiBaseUrl}/xpan/nas?method=uinfo`);
    const response = await axios.get(`${config.apiBaseUrl}/xpan/nas`, {
      params: {
        method: 'uinfo',
        access_token: token.access_token,
      },
      headers: {
        'User-Agent': 'pan.baidu.com'
      }
    });
    
    console.log('用户信息API响应:', response.data);

    if (response.data.errno !== 0) {
      console.error('API返回错误:', response.data);
      throw new Error(`获取用户信息失败: ${response.data.errmsg}`);
    }

    // 确保所有必要的字段都存在
    if (!response.data.netdisk_name) {
      console.warn('API响应中缺少netdisk_name字段，使用baidu_name作为备选');
    }

    const userInfo = {
      uk: response.data.uk,
      baiduid: response.data.baidu_name,
      username: response.data.netdisk_name || response.data.baidu_name || '未知用户',
      avatarUrl: response.data.avatar_url || '',
      vipType: response.data.vip_type,
      isVip: response.data.is_vip === 1,
    };
    
    console.log('解析后的用户信息:', userInfo);
    return userInfo;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 获取登录二维码 - 直接调用getAuthCode，因为它们使用相同的API
const getLoginQRCode = async () => {
  try {
    const result = await getAuthCode();
    return result;
  } catch (error) {
    console.error('获取登录二维码失败:', error);
    throw error;
  }
};

// 检查二维码状态 - 直接调用checkAuthCodeStatus，因为它们使用相同的API
const checkQRCodeStatus = async (qrCode) => {
  try {
    const result = await checkAuthCodeStatus(qrCode);
    return result;
  } catch (error) {
    console.error('检查二维码状态失败:', error);
    throw error;
  }
};

// 使用二维码登录 - 直接调用loginWithAuthCode，因为它们使用相同的API
const login = async (qrCode) => {
  try {
    const result = await loginWithAuthCode(qrCode);
    return result;
  } catch (error) {
    console.error('登录失败:', error);
    throw error;
  }
};

// 导出函数
module.exports = {
  loadConfig,
  saveConfig,
  getLoginQRCode,
  checkQRCodeStatus,
  login,
  getAuthCode,
  checkAuthCodeStatus,
  loginWithAuthCode,
  getDeviceCode: getAuthCode, // 为了向后兼容
  checkDeviceCodeStatus: checkAuthCodeStatus, // 为了向后兼容
  loginWithDeviceCode: loginWithAuthCode, // 为了向后兼容
  logout,
  verifyToken,
  getUserInfo,
  getValidToken,
  loadToken,
  saveToken,
  refreshToken,
  clearToken,
};
