const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { join } = require('path');
const Store = require('electron-store');
const baiduPanService = require('./services/baiduPanService.cjs');

// 初始化存储
const store = new Store();

// 加载百度云盘配置
const loadBaiduPanConfig = async () => {
  try {
    await baiduPanService.loadConfig();
  } catch (error) {
    console.error('加载百度云盘配置失败:', error);
  }
};

// 应用启动时加载配置
loadBaiduPanConfig();

// 保持对window对象的全局引用，如果不这样做，
// 当JavaScript对象被垃圾回收，window会自动关闭
let mainWindow;

async function createWindow() {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      sandbox: false,
      experimentalFeatures: true,
      preload: join(__dirname, 'preload.cjs')
    },
    // 设置应用图标
    icon: join(__dirname, '../public/icon.png')
  });

  // 加载应用
  if (app.isPackaged) {
    // 生产环境下加载打包后的index.html
    await mainWindow.loadFile(join(__dirname, '../dist/index.html'));
  } else {
    // 开发环境下连接到Vite开发服务器
    await mainWindow.loadURL('http://localhost:5173');
    // 打开开发者工具
    mainWindow.webContents.openDevTools();
  }

  // 当window被关闭时，触发下面的事件
  mainWindow.on('closed', () => {
    // 取消引用window对象，如果你的应用支持多窗口，
    // 通常会把多个window对象存放在一个数组里面，
    // 这时你应该删除相应的元素
    mainWindow = null;
  });
}

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
app.whenReady().then(createWindow);

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  // 在macOS上，除非用户用Cmd + Q确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当点击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口
  if (mainWindow === null) {
    createWindow();
  }
});

// 处理IPC通信
ipcMain.handle('select-files', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: '音频文件', extensions: ['mp3', 'wav', 'flac', 'ogg', 'm4a', 'ra'] }
    ]
  });
  if (canceled) {
    return [];
  }
  return filePaths;
});

// 处理播放列表存储
ipcMain.handle('get-playlists', () => {
  return store.get('playlists', []);
});

ipcMain.handle('save-playlists', (event, playlists) => {
  store.set('playlists', playlists);
  return true;
});

// 处理最近播放记录
ipcMain.handle('get-recent-tracks', () => {
  return store.get('recentTracks', []);
});

ipcMain.handle('add-recent-track', (event, track) => {
  const recentTracks = store.get('recentTracks', []);
  
  // 如果已存在相同ID的曲目，先移除它
  const filteredTracks = recentTracks.filter(item => item.id !== track.id);
  
  // 将新曲目添加到列表开头
  filteredTracks.unshift(track);
  
  // 只保留最近的20首
  const updatedTracks = filteredTracks.slice(0, 20);
  
  store.set('recentTracks', updatedTracks);
  return updatedTracks;
});

// 处理用户设置
ipcMain.handle('get-settings', () => {
  return store.get('settings', {
    theme: 'system', // 'light', 'dark', 'system'
    visualizer: 'spectrum', // 'spectrum', 'waveform', 'none'
    playMode: 'sequential' // 'sequential', 'repeat', 'random'
  });
});

ipcMain.handle('save-settings', (event, settings) => {
  store.set('settings', settings);
  return true;
});

// 百度云盘API相关处理函数
ipcMain.handle('baidu-pan-save-config', async (event, config) => {
  try {
    const result = await baiduPanService.saveConfig(config);
    return { success: true, data: result };
  } catch (error) {
    console.error('保存百度云盘配置失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-login-qrcode', async () => {
  try {
    const result = await baiduPanService.getLoginQRCode();
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘登录二维码失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-check-qrcode-status', async (event, qrCode) => {
  try {
    const result = await baiduPanService.checkQRCodeStatus(qrCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('检查百度云盘二维码状态失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-login', async (event, qrCode) => {
  try {
    const result = await baiduPanService.login(qrCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('百度云盘登录失败:', error);
    return { success: false, error: error.message };
  }
});

// 授权码模式授权相关处理函数
ipcMain.handle('baidu-pan-get-auth-code', async () => {
  try {
    const result = await baiduPanService.getAuthCode();
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘授权码失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-check-auth-code-status', async (event, authCode) => {
  try {
    const result = await baiduPanService.checkAuthCodeStatus(authCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('检查百度云盘授权码状态失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-login-with-auth-code', async (event, authCode) => {
  try {
    const result = await baiduPanService.loginWithAuthCode(authCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('使用授权码登录百度云盘失败:', error);
    return { success: false, error: error.message };
  }
});

// 设备码模式授权相关处理函数（保留向后兼容性）
ipcMain.handle('baidu-pan-get-device-code', async () => {
  try {
    const result = await baiduPanService.getAuthCode();
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘设备码失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-check-device-code-status', async (event, deviceCode) => {
  try {
    const result = await baiduPanService.checkAuthCodeStatus(deviceCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('检查百度云盘设备码状态失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-login-with-device-code', async (event, deviceCode) => {
  try {
    const result = await baiduPanService.loginWithAuthCode(deviceCode);
    return { success: true, data: result };
  } catch (error) {
    console.error('使用设备码登录百度云盘失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-logout', async () => {
  try {
    await baiduPanService.logout();
    return { success: true };
  } catch (error) {
    console.error('百度云盘登出失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-verify-token', async () => {
  try {
    const result = await baiduPanService.verifyToken();
    return { success: true, data: result };
  } catch (error) {
    console.error('验证百度云盘令牌失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-user-info', async () => {
  try {
    const result = await baiduPanService.getUserInfo();
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘用户信息失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-file-list', async (event, path, options) => {
  try {
    const result = await baiduPanService.getFileList(path, options);
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘文件列表失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-audio-file-list', async (event, path, options) => {
  try {
    const result = await baiduPanService.getAudioFileList(path, options);
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘音频文件列表失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-file-download-link', async (event, fsId) => {
  try {
    const result = await baiduPanService.getFileDownloadLink(fsId);
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘文件下载链接失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-search-files', async (event, keyword, options) => {
  try {
    const result = await baiduPanService.searchFiles(keyword, options);
    return { success: true, data: result };
  } catch (error) {
    console.error('搜索百度云盘文件失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-search-audio-files', async (event, keyword, options) => {
  try {
    const result = await baiduPanService.searchAudioFiles(keyword, options);
    return { success: true, data: result };
  } catch (error) {
    console.error('搜索百度云盘音频文件失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-lyric-file', async (event, audioFileName) => {
  try {
    const result = await baiduPanService.getLyricFile(audioFileName);
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘歌词文件失败:', error);
    return { success: false, error: error.message };
  }
});

ipcMain.handle('baidu-pan-get-lyric-content', async (event, fsId) => {
  try {
    const result = await baiduPanService.getLyricContent(fsId);
    return { success: true, data: result };
  } catch (error) {
    console.error('获取百度云盘歌词内容失败:', error);
    return { success: false, error: error.message };
  }
});
