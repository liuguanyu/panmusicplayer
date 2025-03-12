<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="w-[30rem] p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
      <div class="text-center mb-6">
        <h1 class="text-2xl mb-2">百度云音乐播放器</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">请使用百度云盘客户端扫码或输入用户码登录</p>
      </div>
      
      <div class="min-h-[18.75rem] flex flex-col items-center justify-center">
        <div v-if="authCodeLoading" class="flex items-center justify-center h-[18.75rem]">
          <a-spin tip="获取授权码中..." />
        </div>
        
        <div v-else-if="authCodeError" class="flex items-center justify-center h-[18.75rem]">
          <a-result status="error" title="获取授权码失败">
            <template #extra>
              <a-button type="primary" @click="getAuthCode">
                重新获取
              </a-button>
            </template>
          </a-result>
        </div>
        
        <div v-else-if="authCode" class="w-full flex flex-col items-center justify-center">
          <div class="w-full flex flex-col items-center justify-center mb-6">
            <!-- Tab切换 -->
            <a-tabs 
              v-model:activeKey="activeTabKey" 
              centered 
              class="w-full login-tabs"
              :tab-bar-style="{ margin: '0 0 24px 0' }"
            >
              <!-- 二维码登录Tab -->
              <a-tab-pane key="qrcode" tab="扫码登录">
                <div class="w-full text-center">
                  <div class="qrcode-container mx-auto">
                    <div class="p-4 border border-gray-200 rounded-lg mb-4 flex items-center justify-center">
                      <img :src="authCode.qrcode_url" alt="登录二维码" class="w-[12.5rem] h-[12.5rem]" />
                    </div>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded">
                      <p class="mb-2 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">1. 打开百度网盘App</p>
                      <p class="mb-2 text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">2. 点击"我的"，然后点击右上角扫一扫</p>
                      <p class="text-gray-500 dark:text-gray-400 text-left whitespace-nowrap">3. 扫描二维码登录</p>
                    </div>
                  </div>
                </div>
              </a-tab-pane>
              
              <!-- 用户码登录Tab -->
              <a-tab-pane key="usercode" tab="用户码登录">
                <div class="w-full text-center">
                  <div class="text-center mb-4">
                    <div class="user-code-container">
                      <div class="user-code">
                        {{ authCode.user_code }}
                      </div>
                      <a-button 
                        type="primary" 
                        class="copy-button" 
                        @click="copyUserCode"
                        :icon="copyIcon"
                      >
                        复制
                      </a-button>
                    </div>
                  </div>
                  
                  <div class="text-center mb-4">
                    <p class="mb-2 text-gray-500 dark:text-gray-400">请访问以下网址并输入上方用户码：</p>
                    <a :href="authCode.verification_url" target="_blank" class="text-primary hover:underline">
                      {{ authCode.verification_url }}
                    </a>
                  </div>
                </div>
              </a-tab-pane>
            </a-tabs>
          </div>
          
          <div class="mb-6 text-center" v-if="activeTabKey === 'usercode'">
            <p v-if="authCodeStatus === 'WAITING'" class="text-base flex items-center justify-center">
              <a-badge status="processing" text="等待授权" />
            </p>
            <p v-else-if="authCodeStatus === 'CONFIRMED'" class="text-base flex items-center justify-center">
              <a-badge status="success" text="授权成功，正在登录..." />
            </p>
            <p v-else-if="authCodeStatus === 'EXPIRED'" class="text-base flex items-center justify-center">
              <a-badge status="error" text="授权码已过期" />
              <a-button type="primary" size="small" @click="getAuthCode" class="ml-2">
                刷新授权码
              </a-button>
            </p>
            <p v-else-if="authCodeStatus === 'ERROR'" class="text-base flex items-center justify-center">
              <a-badge status="error" :text="authCodeStatusMessage || '授权出错'" />
              <a-button type="primary" size="small" @click="getAuthCode" class="ml-2">
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
import { ref, onMounted, onBeforeUnmount, h } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { CopyOutlined } from '@ant-design/icons-vue';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();

// 复制图标
const copyIcon = h(CopyOutlined);

// Tab切换
const activeTabKey = ref('qrcode'); // 默认选中二维码登录tab

// 复制用户码到剪贴板
const copyUserCode = () => {
  if (authCode.value && authCode.value.user_code) {
    navigator.clipboard.writeText(authCode.value.user_code)
      .then(() => {
        message.success('用户码已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
        message.error('复制失败，请手动复制');
      });
  }
};

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

<style scoped>
/* 标签样式 */
.login-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 24px;
}

.login-tabs :deep(.ant-tabs-nav::before) {
  display: none;
}

.login-tabs :deep(.ant-tabs-tab) {
  border-radius: 4px;
  padding: 8px 16px;
  margin: 0 4px;
  transition: all 0.3s;
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px solid rgba(0, 0, 0, 0.04);
}

.login-tabs :deep(.ant-tabs-tab-active) {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border-color: rgba(0, 0, 0, 0.06);
}

.login-tabs :deep(.ant-tabs-tab-active .ant-tabs-tab-btn) {
  color: #1890ff !important;
  font-weight: 500;
}

.login-tabs :deep(.ant-tabs-content-holder) {
  padding: 16px;
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.01);
}

/* 暗黑模式适配 */
:global(.dark) .login-tabs :deep(.ant-tabs-tab) {
  background-color: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.04);
}

:global(.dark) .login-tabs :deep(.ant-tabs-tab-active) {
  background-color: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .login-tabs :deep(.ant-tabs-content-holder) {
  background-color: rgba(255, 255, 255, 0.01);
}

/* 确保两个tab内容区域布局合理 */
.login-tabs :deep(.ant-tabs-content) {
  min-height: 250px;
}

.login-tabs :deep(.ant-tabs-tabpane) {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* 用户码和复制按钮样式 */
.user-code-container {
  display: inline-flex;
  align-items: stretch;
  max-width: 300px;
  width: 100%;
}

.user-code {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  letter-spacing: 0.1em;
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border-radius: 4px 0 0 4px;
  height: 40px;
  flex: 1;
}

.copy-button {
  border-radius: 0 4px 4px 0;
  display: flex;
  align-items: center;
  height: 40px;
}

:global(.dark) .user-code {
  background-color: #333;
}
</style>
