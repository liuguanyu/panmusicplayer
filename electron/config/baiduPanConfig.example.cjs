/**
 * 百度云盘API配置示例文件
 * 
 * 使用方法：
 * 1. 复制此文件为 baiduPanConfig.js
 * 2. 填入你的百度云盘开发者应用信息
 * 3. 保存文件
 */

module.exports = {
  appId: '你的应用ID', // 应用ID
  appKey: '你的应用密钥', // 应用密钥
  secretKey: '你的密钥', // 密钥
  signKey: '你的签名密钥', // 签名密钥
  redirectUri: 'oob', // 重定向URI
  scope: 'basic,netdisk', // 权限范围
  deviceId: '', // 设备ID，可以是随机生成的UUID，留空将自动生成
  deviceName: '度盘读天下', // 设备名称
  apiBaseUrl: 'https://pan.baidu.com/rest/2.0', // API基础URL
  oauthUrl: 'https://openapi.baidu.com/oauth/2.0', // OAuth URL
};
