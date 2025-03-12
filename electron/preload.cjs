const { contextBridge, ipcRenderer } = require('electron');

// 暴露给渲染进程的API
contextBridge.exposeInMainWorld('electronAPI', {
  // 文件选择
  selectFiles: () => ipcRenderer.invoke('select-files'),
  
  // 播放列表管理
  getPlaylists: () => ipcRenderer.invoke('get-playlists'),
  savePlaylists: (playlists) => ipcRenderer.invoke('save-playlists', playlists),
  
  // 最近播放记录
  getRecentTracks: () => ipcRenderer.invoke('get-recent-tracks'),
  addRecentTrack: (track) => ipcRenderer.invoke('add-recent-track', track),
  
  // 设置管理
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  // 百度云盘API相关
  baiduPan: {
    // 配置管理
    saveConfig: (config) => ipcRenderer.invoke('baidu-pan-save-config', config),
    
    // 登录相关
    getLoginQRCode: () => ipcRenderer.invoke('baidu-pan-get-login-qrcode'),
    checkQRCodeStatus: (qrCode) => ipcRenderer.invoke('baidu-pan-check-qrcode-status', qrCode),
    login: (qrCode) => ipcRenderer.invoke('baidu-pan-login', qrCode),
    // 授权码模式授权（统一的二维码和设备码登录）
    getAuthCode: () => ipcRenderer.invoke('baidu-pan-get-auth-code'),
    checkAuthCodeStatus: (authCode) => ipcRenderer.invoke('baidu-pan-check-auth-code-status', authCode),
    loginWithAuthCode: (authCode) => ipcRenderer.invoke('baidu-pan-login-with-auth-code', authCode),
    // 设备码模式授权（保留向后兼容性）
    getDeviceCode: () => ipcRenderer.invoke('baidu-pan-get-device-code'),
    checkDeviceCodeStatus: (deviceCode) => ipcRenderer.invoke('baidu-pan-check-device-code-status', deviceCode),
    loginWithDeviceCode: (deviceCode) => ipcRenderer.invoke('baidu-pan-login-with-device-code', deviceCode),
    logout: () => ipcRenderer.invoke('baidu-pan-logout'),
    verifyToken: () => ipcRenderer.invoke('baidu-pan-verify-token'),
    
    // 用户信息
    getUserInfo: () => ipcRenderer.invoke('baidu-pan-get-user-info'),
    
    // 文件操作
    getFileList: (path, options) => ipcRenderer.invoke('baidu-pan-get-file-list', path, options),
    getAudioFileList: (path, options) => ipcRenderer.invoke('baidu-pan-get-audio-file-list', path, options),
    getFileDownloadLink: (fsId) => ipcRenderer.invoke('baidu-pan-get-file-download-link', fsId),
    searchFiles: (keyword, options) => ipcRenderer.invoke('baidu-pan-search-files', keyword, options),
    searchAudioFiles: (keyword, options) => ipcRenderer.invoke('baidu-pan-search-audio-files', keyword, options),
    
    // 歌词相关
    getLyricFile: (audioFileName) => ipcRenderer.invoke('baidu-pan-get-lyric-file', audioFileName),
    getLyricContent: (fsId) => ipcRenderer.invoke('baidu-pan-get-lyric-content', fsId),
  }
});
