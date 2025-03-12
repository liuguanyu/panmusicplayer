<template>
  <div class="not-found flex-center flex-col h-full">
    <a-result
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在"
    >
      <template #extra>
        <a-button type="primary" @click="$router.push('/')">
          返回首页
        </a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup>
// 404 页面不需要额外的逻辑
</script>

<style lang="less" scoped>
.not-found {
  padding: 2rem;
}
</style>
