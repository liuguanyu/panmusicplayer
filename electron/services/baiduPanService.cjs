const axios = require('axios');
const crypto = require('crypto');
const querystring = require('querystring');
const { app } = require('electron');
const { join } = require('path');
const fs = require('fs');
const { promisify } = require('util');
const path = require('path');

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

// 生成签名
const generateSignature = (params) => {
  // 按照参数名排序
  const sortedParams = Object.keys(params)
    .sort()
    .reduce((result, key) => {
      result[key] = params[key];
      return result;
    }, {});

  // 构建签名字符串
  let signStr = '';
  for (const key in sortedParams) {
    if (key !== 'sign' && sortedParams[key] !== '') {
      signStr += key + '=' + sortedParams[key];
    }
  }

  // 添加签名密钥
  signStr += config.signKey;

  // 计算MD5
  return crypto.createHash('md5').update(signStr).digest('hex');
};

// 创建API客户端
const createApiClient = (token) => {
  const client = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'pan.baidu.com',
    },
  });

  // 请求拦截器，添加通用参数和签名
  client.interceptors.request.use((config) => {
    const params = {
      ...config.params,
      access_token: token.access_token,
      app_id: config.appId,
      device_id: config.deviceId,
      device_name: config.deviceName,
      timestamp: Math.floor(Date.now() / 1000),
      version: '1.0.0',
    };

    // 添加签名
    params.sign = generateSignature(params);
    config.params = params;

    return config;
  });

  return client;
};

// 刷新令牌
const refreshToken = async (token) => {
  try {
    const response = await axios.post(
      `${config.oauthUrl}/token`,
      querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token,
        client_id: config.appKey,
        client_secret: config.secretKey,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
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

// 获取设备码和用户码
const getDeviceCode = async () => {
  try {
    await loadConfig();
    
    // 生成设备ID（如果不存在）
    if (!config.deviceId) {
      config.deviceId = crypto.randomUUID();
      await saveConfig(config);
    }

    console.log('正在获取设备码，使用参数:', {
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

    console.log('设备码API响应:', response.data);

    if (response.data.error) {
      throw new Error(`获取设备码失败: ${response.data.error_description || response.data.error}`);
    }

    return {
      device_code: response.data.device_code,
      user_code: response.data.user_code,
      verification_url: response.data.verification_url || 'https://openapi.baidu.com/device',
      qrcode_url: response.data.qrcode_url,
      expires_in: response.data.expires_in,
      interval: response.data.interval || 5,
    };
  } catch (error) {
    console.error('获取设备码失败:', error);
    throw error;
  }
};

// 检查设备码状态
const checkDeviceCodeStatus = async (deviceCode) => {
  try {
    await loadConfig();
    
    const response = await axios.get(`${config.oauthUrl}/token`, {
      params: {
        grant_type: 'device_token',
        code: deviceCode,
        client_id: config.appKey,
        client_secret: config.secretKey,
      },
      headers: {
        'User-Agent': 'pan.baidu.com',
      },
    });

    // 如果成功获取到token，表示用户已授权
    if (response.data.access_token) {
      return {
        status: 'CONFIRMED',
        token: {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in,
          expires_at: Date.now() + response.data.expires_in * 1000,
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
        return { status: 'EXPIRED', message: '设备码已过期，请重新获取' };
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

      // 其他错误
      return { 
        status: 'ERROR', 
        message: errorData.error_description || errorData.error || '未知错误' 
      };
    }
    
    console.error('检查设备码状态失败:', error);
    return { status: 'ERROR', message: error.message || '网络错误' };
  }
};

// 使用设备码获取令牌
const getTokenByDeviceCode = async (deviceCode) => {
  try {
    await loadConfig();
    
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
        },
      }
    );

    if (!response.data.access_token) {
      throw new Error('获取令牌失败: 未返回access_token');
    }

    const token = {
      access_token: response.data.access_token,
      refresh_token: response.data.refresh_token,
      expires_in: response.data.expires_in,
      expires_at: Date.now() + response.data.expires_in * 1000,
      scope: response.data.scope,
    };

    await saveToken(token);
    return token;
  } catch (error) {
    // 检查错误类型
    if (error.response && error.response.data) {
      const errorData = error.response.data;
      
      // 授权码过期
      if (errorData.error === 'expired_token') {
        throw new Error('设备码已过期，请重新获取');
      }
      
      // 用户取消授权
      if (errorData.error === 'authorization_declined') {
        throw new Error('用户已取消授权');
      }
      
      // 授权码未被使用，继续等待
      if (errorData.error === 'authorization_pending') {
        throw new Error('等待用户授权，请稍后再试');
      }
      
      // 请求过于频繁
      if (errorData.error === 'slow_down') {
        throw new Error('请求过于频繁，请降低请求频率');
      }

      // 其他错误
      throw new Error(errorData.error_description || errorData.error || '获取令牌失败');
    }
    
    console.error('获取令牌失败:', error);
    throw new Error(error.message || '网络错误');
  }
};

// 使用设备码登录
const loginWithDeviceCode = async (deviceCode) => {
  try {
    // 检查设备码状态
    const status = await checkDeviceCodeStatus(deviceCode);
    
    if (status.status !== 'CONFIRMED' || !status.token) {
      throw new Error('设备码未确认或令牌无效');
    }

    // 保存令牌
    await saveToken(status.token);
    
    // 获取用户信息
    const userInfo = await getUserInfo(status.token);
    
    return {
      token: status.token,
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
    const token = tokenObj || await getValidToken();
    
    const response = await axios.get(`${config.apiBaseUrl}/xpan/nas`, {
      params: {
        method: 'uinfo',
        access_token: token.access_token,
      },
    });

    if (response.data.errno !== 0) {
      throw new Error(`获取用户信息失败: ${response.data.errmsg}`);
    }

    return {
      uk: response.data.uk,
      baiduid: response.data.baidu_name,
      username: response.data.netdisk_name,
      avatarUrl: response.data.avatar_url,
      vipType: response.data.vip_type,
      isVip: response.data.is_vip === 1,
    };
  } catch (error) {
    console.error('获取用户信息失败:', error);
    throw error;
  }
};

// 获取文件列表
const getFileList = async (path = '/', options = {}) => {
  try {
    const token = await getValidToken();
    const client = createApiClient(token);
    
    const params = {
      method: 'list',
      dir: path,
      order: options.order || 'name',
      desc: options.desc ? 1 : 0,
      limit: options.limit || 1000,
      start: options.start || 0,
      web: 1, // 返回更多信息
    };

    const response = await client.get('/xpan/file', { params });

    if (response.data.errno !== 0) {
      throw new Error(`获取文件列表失败: ${response.data.errmsg}`);
    }

    return response.data.list || [];
  } catch (error) {
    console.error('获取文件列表失败:', error);
    throw error;
  }
};

// 获取音频文件列表
const getAudioFileList = async (path = '/', options = {}) => {
  try {
    const fileList = await getFileList(path, options);
    
    // 过滤音频文件
    return fileList.filter(file => {
      const ext = file.server_filename.split('.').pop().toLowerCase();
      return ['mp3', 'flac', 'wav', 'aac', 'm4a', 'ogg'].includes(ext);
    });
  } catch (error) {
    console.error('获取音频文件列表失败:', error);
    throw error;
  }
};

// 获取文件下载链接
const getFileDownloadLink = async (fsId) => {
  try {
    const token = await getValidToken();
    const client = createApiClient(token);
    
    const params = {
      method: 'filemetas',
      fsids: `[${fsId}]`,
      dlink: 1,
    };

    const response = await client.get('/xpan/multimedia', { params });

    if (response.data.errno !== 0) {
      throw new Error(`获取文件下载链接失败: ${response.data.errmsg}`);
    }

    if (!response.data.list || response.data.list.length === 0) {
      throw new Error('未找到文件');
    }

    const file = response.data.list[0];
    
    // 获取实际下载链接
    const dlinkResponse = await axios.get(file.dlink, {
      headers: {
        'User-Agent': 'pan.baidu.com',
      },
      params: {
        access_token: token.access_token,
      },
      maxRedirects: 0,
      validateStatus: status => status >= 200 && status < 400,
    });

    // 如果是重定向，返回重定向地址
    if (dlinkResponse.status === 302) {
      return dlinkResponse.headers.location;
    }

    return file.dlink;
  } catch (error) {
    console.error('获取文件下载链接失败:', error);
    throw error;
  }
};

// 搜索文件
const searchFiles = async (keyword, path = '/', options = {}) => {
  try {
    const token = await getValidToken();
    const client = createApiClient(token);
    
    const params = {
      method: 'search',
      key: keyword,
      dir: path,
      recursion: options.recursion ? 1 : 0,
      limit: options.limit || 1000,
      web: 1, // 返回更多信息
    };

    const response = await client.get('/xpan/file', { params });

    if (response.data.errno !== 0) {
      throw new Error(`搜索文件失败: ${response.data.errmsg}`);
    }

    return response.data.list || [];
  } catch (error) {
    console.error('搜索文件失败:', error);
    throw error;
  }
};

// 搜索音频文件
const searchAudioFiles = async (keyword, path = '/', options = {}) => {
  try {
    const fileList = await searchFiles(keyword, path, options);
    
    // 过滤音频文件
    return fileList.filter(file => {
      const ext = file.server_filename.split('.').pop().toLowerCase();
      return ['mp3', 'flac', 'wav', 'aac', 'm4a', 'ogg'].includes(ext);
    });
  } catch (error) {
    console.error('搜索音频文件失败:', error);
    throw error;
  }
};

// 获取歌词文件
const getLyricFile = async (audioFile) => {
  try {
    // 从音频文件名推断歌词文件名
    const audioFileName = audioFile.server_filename;
    const lrcFileName = audioFileName.substring(0, audioFileName.lastIndexOf('.')) + '.lrc';
    
    // 在同一目录下搜索歌词文件
    const path = audioFile.path.substring(0, audioFile.path.lastIndexOf('/') + 1);
    const fileList = await getFileList(path);
    
    // 查找匹配的歌词文件
    const lrcFile = fileList.find(file => file.server_filename === lrcFileName);
    
    return lrcFile || null;
  } catch (error) {
    console.error('获取歌词文件失败:', error);
    return null;
  }
};

// 获取歌词内容
const getLyricContent = async (lrcFile) => {
  try {
    if (!lrcFile) {
      return null;
    }
    
    // 获取歌词文件下载链接
    const downloadLink = await getFileDownloadLink(lrcFile.fs_id);
    
    // 下载歌词内容
    const response = await axios.get(downloadLink, {
      headers: {
        'User-Agent': 'pan.baidu.com',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('获取歌词内容失败:', error);
    return null;
  }
};

// 导出函数
module.exports = {
  loadConfig,
  saveConfig,
  getDeviceCode,
  checkDeviceCodeStatus,
  getTokenByDeviceCode,
  loginWithDeviceCode,
  logout,
  verifyToken,
  getUserInfo,
  getFileList,
  getAudioFileList,
  getFileDownloadLink,
  searchFiles,
  searchAudioFiles,
  getLyricFile,
  getLyricContent,
};
