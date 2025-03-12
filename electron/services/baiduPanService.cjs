const axios = require('axios');
const crypto = require('crypto');

// 导入认证服务
const authService = require('./baiduPanAuthService.cjs');

// 从认证服务获取配置
let config;

// 初始化函数，加载配置
const initialize = async () => {
  config = await authService.loadConfig();
  return config;
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

// 获取文件列表
const getFileList = async (path = '/', options = {}) => {
  try {
    // 确保配置已加载
    if (!config) {
      await initialize();
    }
    
    const token = await authService.getValidToken();
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
    // 确保配置已加载
    if (!config) {
      await initialize();
    }
    
    const token = await authService.getValidToken();
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
    // 确保配置已加载
    if (!config) {
      await initialize();
    }
    
    const token = await authService.getValidToken();
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

// 初始化配置
initialize().catch(console.error);

// 导出函数 - 保持与原来相同的接口
module.exports = {
  // 从认证服务导出的函数
  loadConfig: authService.loadConfig,
  saveConfig: authService.saveConfig,
  getLoginQRCode: authService.getLoginQRCode,
  checkQRCodeStatus: authService.checkQRCodeStatus,
  login: authService.login,
  getAuthCode: authService.getAuthCode,
  checkAuthCodeStatus: authService.checkAuthCodeStatus,
  loginWithAuthCode: authService.loginWithAuthCode,
  getDeviceCode: authService.getDeviceCode, // 为了向后兼容
  checkDeviceCodeStatus: authService.checkDeviceCodeStatus, // 为了向后兼容
  loginWithDeviceCode: authService.loginWithDeviceCode, // 为了向后兼容
  logout: authService.logout,
  verifyToken: authService.verifyToken,
  getUserInfo: authService.getUserInfo,
  
  // 本地实现的文件操作函数
  getFileList,
  getAudioFileList,
  getFileDownloadLink,
  searchFiles,
  searchAudioFiles,
  getLyricFile,
  getLyricContent,
};
