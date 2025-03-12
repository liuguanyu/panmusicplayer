<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">百度云音乐播放器</h1>
        <p class="login-subtitle">请使用百度云盘客户端扫码或输入用户码登录</p>
      </div>
      
      <div class="login-content">
        <div v-if="authCodeLoading" class="auth-code-loading">
          <a-spin tip="获取授权码中..." />
        </div>
        
        <div v-else-if="authCodeError" class="auth-code-error">
          <a-result status="error" title="获取授权码失败">
            <template #extra>
              <a-button type="primary" @click="getAuthCode">
                重新获取
              </a-button>
            </template>
          </a-result>
        </div>
        
        <div v-else-if="authCode" class="auth-code-container">
          <div class="auth-code-wrapper">
            <!-- 二维码部分 -->
            <div class="qrcode-section">
              <h3>扫码登录</h3>
              <div class="qrcode-wrapper">
                <img :src="authCode.qrcode_url" alt="登录二维码" class="qrcode-img" />
              </div>
              <div class="qrcode-tips">
                <p>1. 打开百度网盘App</p>
                <p>2. 点击"我的"，然后点击右上角扫一扫</p>
                <p>3. 扫描二维码登录</p>
              </div>
            </div>
            
            <!-- 分隔线 -->
            <div class="divider">
              <span>或</span>
            </div>
            
            <!-- 用户码部分 -->
            <div class="user-code-section">
              <h3>用户码登录</h3>
              <div class="user-code-display">
                <div class="user-code">{{ authCode.user_code }}</div>
              </div>
              
              <div class="verification-url">
                <p>请访问以下网址并输入上方用户码：</p>
                <a :href="authCode.verification_url" target="_blank" class="url-link">
                  {{ authCode.verification_url }}
                </a>
              </div>
            </div>
          </div>
          
          <div class="auth-code-status">
            <p v-if="authCodeStatus === 'WAITING'" class="status-text">
              <a-badge status="processing" text="等待授权" />
            </p>
            <p v-else-if="authCodeStatus === 'CONFIRMED'" class="status-text">
              <a-badge status="success" text="授权成功，正在登录..." />
            </p>
            <p v-else-if="authCodeStatus === 'EXPIRED'" class="status-text">
              <a-badge status="error" text="授权码已过期" />
              <a-button type="primary" size="small" @click="getAuthCode" class="refresh-btn">
                刷新授权码
              </a-button>
            </p>
            <p v-else-if="authCodeStatus === 'ERROR'" class="status-text">
              <a-badge status="error" :text="authCodeStatusMessage || '授权出错'" />
              <a-button type="primary" size="small" @click="getAuthCode" class="refresh-btn">
                重新获取
              </a-button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();

// 授权码登录状态
const authCode = ref(null);
const authCodeLoading = ref(false);
const authCodeError = ref(false);
const authCodeStatus = ref('WAITING'); // WAITING, SCANNED, CONFIRMED, EXPIRED, ERROR
const authCodeStatusMessage = ref('');
const authCodeCheckInterval = ref(null);

// 清除检查间隔
const clearInterval = () => {
  if (authCodeCheckInterval.value) {
    window.clearInterval(authCodeCheckInterval.value);
    authCodeCheckInterval.value = null;
  }
};

// 获取授权码
const getAuthCode = async () => {
  authCodeLoading.value = true;
  authCodeError.value = false;
  authCodeStatus.value = 'WAITING';
  authCodeStatusMessage.value = '';
  
  try {
    // 清除之前的检查间隔
    clearInterval();
    
    // 获取设备码（包含二维码和用户码）
    const result = await userStore.getDeviceCode();
    authCode.value = result;
    
    // 开始检查授权码状态
    startCheckingAuthCodeStatus();
  } catch (error) {
    console.error('获取授权码失败:', error);
    authCodeError.value = true;
    message.error('获取授权码失败，请重试');
  } finally {
    authCodeLoading.value = false;
  }
};

// 检查授权码状态
const checkAuthCodeStatus = async () => {
  if (!authCode.value) return;
  
  try {
    // 只传递device_code属性，避免序列化问题
    const status = await userStore.checkDeviceCodeStatus({ device_code: authCode.value.device_code });
    
    if (status.status === 'SCANNED') {
      authCodeStatus.value = 'SCANNED';
    } else if (status.status === 'CONFIRMED') {
      authCodeStatus.value = 'CONFIRMED';
      clearInterval();
      
      // 使用授权码登录
      await loginWithAuthCode();
    } else if (status.status === 'EXPIRED') {
      authCodeStatus.value = 'EXPIRED';
      clearInterval();
    } else if (status.status === 'ERROR') {
      authCodeStatus.value = 'ERROR';
      authCodeStatusMessage.value = status.message || '授权出错';
      clearInterval();
    }
  } catch (error) {
    console.error('检查授权码状态失败:', error);
    authCodeStatus.value = 'ERROR';
    authCodeStatusMessage.value = error.message || '检查授权码状态失败';
  }
};

// 开始检查授权码状态
const startCheckingAuthCodeStatus = () => {
  // 每5秒检查一次，根据百度API要求，轮询间隔不能低于5秒
  authCodeCheckInterval.value = setInterval(checkAuthCodeStatus, 5000);
};

// 使用授权码登录
const loginWithAuthCode = async () => {
  try {
    // 只传递device_code属性，避免序列化问题
    await userStore.loginWithDeviceCode({ device_code: authCode.value.device_code });
    
    message.success('登录成功');
    router.push('/');
  } catch (error) {
    console.error('授权码登录失败:', error);
    authCodeStatus.value = 'ERROR';
    authCodeStatusMessage.value = error.message || '登录失败';
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
  getAuthCode();
});

onBeforeUnmount(() => {
  clearInterval();
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
  width: 480px;
  padding: 32px;
  background-color: var(--color-bg-container);
  border-radius: 8px;
  box-shadow: var(--shadow-2);
}

.login-header {
  text-align: center;
  margin-bottom: 24px;
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

.login-content {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.auth-code-loading,
.auth-code-error {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.auth-code-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.auth-code-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
}

.qrcode-section,
.user-code-section {
  width: 100%;
  text-align: center;
  margin-bottom: 16px;
  
  h3 {
    font-size: 18px;
    margin-bottom: 16px;
    color: var(--color-text-primary);
  }
}

.qrcode-wrapper {
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  margin-bottom: 16px;
  display: inline-block;
}

.qrcode-img {
  width: 200px;
  height: 200px;
}

.qrcode-tips {
  width: 100%;
  padding: 16px;
  background-color: var(--color-bg-subtle);
  border-radius: 4px;
  margin: 0 auto;
  max-width: 300px;
  
  p {
    margin-bottom: 8px;
    color: var(--color-text-secondary);
    text-align: left;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
}

.divider {
  width: 100%;
  position: relative;
  text-align: center;
  margin: 24px 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
  }
  
  span {
    position: relative;
    padding: 0 16px;
    background-color: var(--color-bg-container);
    color: var(--color-text-secondary);
  }
}

.user-code-display {
  text-align: center;
  margin-bottom: 16px;
}

.user-code {
  font-size: 24px;
  font-weight: bold;
  letter-spacing: 2px;
  padding: 12px 24px;
  background-color: var(--color-bg-subtle);
  border-radius: 4px;
  color: var(--color-text-primary);
  display: inline-block;
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

.auth-code-status {
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
</style>
