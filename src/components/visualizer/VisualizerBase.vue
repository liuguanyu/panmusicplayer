<template>
  <div class="visualizer-base" :class="{ 'dark': isDarkMode }">
    <!-- 可视化效果画布 -->
    <canvas ref="canvas" class="visualizer-canvas"></canvas>
    
    <!-- 插槽用于控制组件 -->
    <slot name="controls"></slot>
    
    <!-- 插槽用于设置组件 -->
    <slot name="settings"></slot>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { useSettingsStore } from '@/stores/settings';

// 定义props
const props = defineProps({
  audioContext: {
    type: Object,
    required: true
  },
  audioSource: {
    type: Object,
    default: null
  },
  isPlaying: {
    type: Boolean,
    default: false
  },
  visualizerType: {
    type: String,
    default: 'bars'
  },
  settings: {
    type: Object,
    default: () => ({})
  }
});

// 定义emit
const emit = defineEmits(['update:settings']);

// 获取设置
const settingsStore = useSettingsStore();
const isDarkMode = computed(() => settingsStore.isDarkMode);

// 状态
const canvas = ref(null);
const ctx = ref(null);
const analyser = ref(null);
const animationId = ref(null);

// 通用设置
const sensitivity = computed(() => props.settings.sensitivity || 2);
const smoothingTimeConstant = computed(() => props.settings.smoothingTimeConstant || 0.8);
const fftSize = computed(() => props.settings.fftSize || 2048);

// 初始化可视化
const initVisualizer = () => {
  if (!props.audioContext || !canvas.value) return;
  
  // 创建分析器
  analyser.value = props.audioContext.createAnalyser();
  analyser.value.fftSize = fftSize.value;
  analyser.value.smoothingTimeConstant = smoothingTimeConstant.value;
  
  // 如果有音频源，连接到分析器
  if (props.audioSource) {
    props.audioSource.connect(analyser.value);
  }
  
  // 获取画布上下文
  ctx.value = canvas.value.getContext('2d');
  
  // 调整画布大小
  resizeCanvas();
  
  // 开始动画
  startAnimation();
};

// 调整画布大小
const resizeCanvas = () => {
  if (!canvas.value || !ctx.value) return;
  
  const container = canvas.value.parentElement;
  canvas.value.width = container.clientWidth;
  canvas.value.height = container.clientHeight;
};

// 开始动画
const startAnimation = () => {
  if (!ctx.value || !analyser.value) return;
  
  // 取消之前的动画
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
  
  // 绘制静态效果
  const render = () => {
    if (!props.isPlaying) {
      // 如果没有播放，只绘制静态效果
      drawStaticEffect();
      animationId.value = requestAnimationFrame(render);
      return;
    }
    
    // 根据当前类型选择渲染函数
    switch (props.visualizerType) {
      case 'bars':
        drawBars();
        break;
      case 'wave':
        drawWave();
        break;
      case 'circle':
        drawCircle();
        break;
      case 'particles':
        drawParticles();
        break;
      default:
        drawBars();
    }
    
    animationId.value = requestAnimationFrame(render);
  };
  
  render();
};

// 绘制静态效果
const drawStaticEffect = () => {
  if (!canvas.value || !ctx.value) return;
  
  const { width, height } = canvas.value;
  
  // 清空画布
  ctx.value.clearRect(0, 0, width, height);
  
  // 绘制提示文本
  ctx.value.fillStyle = isDarkMode.value ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)';
  ctx.value.font = '16px sans-serif';
  ctx.value.textAlign = 'center';
  ctx.value.textBaseline = 'middle';
  ctx.value.fillText('播放音乐以查看可视化效果', width / 2, height / 2);
};

// 绘制柱状图
const drawBars = () => {
  if (!analyser.value || !ctx.value || !canvas.value) return;
  
  const { width, height } = canvas.value;
  const barCount = props.settings.barCount || 64;
  const barSpacing = props.settings.barSpacing || 1;
  const barRounded = props.settings.barRounded !== undefined ? props.settings.barRounded : true;
  
  const bufferLength = Math.min(analyser.value.frequencyBinCount, barCount);
  const dataArray = new Uint8Array(bufferLength);
  
  analyser.value.getByteFrequencyData(dataArray);
  
  // 清空画布
  ctx.value.clearRect(0, 0, width, height);
  
  // 计算柱状宽度
  const barWidth = (width / bufferLength) - barSpacing;
  
  // 绘制每个柱状
  for (let i = 0; i < bufferLength; i++) {
    // 应用灵敏度
    const barHeight = (dataArray[i] / 255) * height * sensitivity.value;
    
    // 计算位置
    const x = i * (barWidth + barSpacing);
    const y = height - barHeight;
    
    // 设置颜色
    ctx.value.fillStyle = getColor(i, bufferLength);
    
    // 绘制柱状
    if (barRounded) {
      // 圆角矩形
      const radius = Math.min(barWidth / 2, 4);
      roundRect(ctx.value, x, y, barWidth, barHeight, radius);
    } else {
      // 普通矩形
      ctx.value.fillRect(x, y, barWidth, barHeight);
    }
  }
};

// 绘制波形图
const drawWave = () => {
  if (!analyser.value || !ctx.value || !canvas.value) return;
  
  const { width, height } = canvas.value;
  const lineWidth = props.settings.lineWidth || 2;
  const fillWave = props.settings.fillWave !== undefined ? props.settings.fillWave : true;
  
  const bufferLength = analyser.value.fftSize;
  const dataArray = new Uint8Array(bufferLength);
  
  analyser.value.getByteTimeDomainData(dataArray);
  
  // 清空画布
  ctx.value.clearRect(0, 0, width, height);
  
  // 设置线条样式
  ctx.value.lineWidth = lineWidth;
  ctx.value.strokeStyle = props.settings.primaryColor || '#1890ff';
  
  // 开始绘制路径
  ctx.value.beginPath();
  
  // 如果需要填充，设置填充样式
  if (fillWave) {
    const gradient = ctx.value.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, `${props.settings.primaryColor || '#1890ff'}80`); // 半透明
    gradient.addColorStop(1, `${props.settings.primaryColor || '#1890ff'}00`); // 透明
    ctx.value.fillStyle = gradient;
  }
  
  const sliceWidth = width / bufferLength;
  let x = 0;
  
  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i] / 128.0;
    const y = v * height / 2;
    
    if (i === 0) {
      ctx.value.moveTo(x, y);
    } else {
      ctx.value.lineTo(x, y);
    }
    
    x += sliceWidth;
  }
  
  // 完成路径
  if (fillWave) {
    ctx.value.lineTo(width, height / 2);
    ctx.value.lineTo(0, height / 2);
    ctx.value.fill();
  }
  
  ctx.value.stroke();
};

// 绘制环形频谱
const drawCircle = () => {
  if (!analyser.value || !ctx.value || !canvas.value) return;
  
  const { width, height } = canvas.value;
  const circleRadius = props.settings.circleRadius || 100;
  const rotationSpeed = props.settings.rotationSpeed || 0.5;
  
  const bufferLength = analyser.value.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  analyser.value.getByteFrequencyData(dataArray);
  
  // 清空画布
  ctx.value.clearRect(0, 0, width, height);
  
  // 计算中心点
  const centerX = width / 2;
  const centerY = height / 2;
  
  // 计算旋转角度
  const rotation = Date.now() * 0.001 * rotationSpeed;
  
  // 绘制每个频率点
  const barCount = 180;
  const angleStep = (Math.PI * 2) / barCount;
  
  for (let i = 0; i < barCount; i++) {
    // 获取数据点
    const dataIndex = Math.floor(i * bufferLength / barCount);
    const value = dataArray[dataIndex] / 255;
    
    // 应用灵敏度
    const barHeight = value * circleRadius * sensitivity.value;
    
    // 计算角度
    const angle = i * angleStep + rotation;
    
    // 计算内外点
    const innerRadius = circleRadius;
    const outerRadius = innerRadius + barHeight;
    
    const innerX = centerX + Math.cos(angle) * innerRadius;
    const innerY = centerY + Math.sin(angle) * innerRadius;
    const outerX = centerX + Math.cos(angle) * outerRadius;
    const outerY = centerY + Math.sin(angle) * outerRadius;
    
    // 设置颜色
    ctx.value.strokeStyle = getColor(i, barCount);
    ctx.value.lineWidth = 2;
    
    // 绘制线段
    ctx.value.beginPath();
    ctx.value.moveTo(innerX, innerY);
    ctx.value.lineTo(outerX, outerY);
    ctx.value.stroke();
  }
};

// 粒子数组
const particles = ref([]);

// 初始化粒子
const initParticles = () => {
  if (!canvas.value) return;
  
  particles.value = [];
  
  const { width, height } = canvas.value;
  const particleCount = props.settings.particleCount || 200;
  const particleSize = props.settings.particleSize || 3;
  const particleSpeed = props.settings.particleSpeed || 2;
  
  for (let i = 0; i < particleCount; i++) {
    particles.value.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * particleSize + 1,
      speedX: (Math.random() - 0.5) * particleSpeed,
      speedY: (Math.random() - 0.5) * particleSpeed,
      hue: Math.random() * 360
    });
  }
};

// 绘制粒子效果
const drawParticles = () => {
  if (!analyser.value || !ctx.value || !canvas.value) return;
  
  const { width, height } = canvas.value;
  const rainbowSpeed = props.settings.rainbowSpeed || 0.5;
  const colorMode = props.settings.colorMode || 'gradient';
  
  // 如果粒子数组为空，初始化粒子
  if (particles.value.length === 0) {
    initParticles();
  }
  
  const bufferLength = analyser.value.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  
  analyser.value.getByteFrequencyData(dataArray);
  
  // 清空画布
  ctx.value.clearRect(0, 0, width, height);
  
  // 更新粒子
  const baseEnergy = getAverageEnergy(dataArray) * sensitivity.value;
  
  // 更新和绘制每个粒子
  for (let i = 0; i < particles.value.length; i++) {
    const p = particles.value[i];
    
    // 更新位置
    p.x += p.speedX * (1 + baseEnergy);
    p.y += p.speedY * (1 + baseEnergy);
    
    // 边界检查
    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
    
    // 更新颜色
    if (colorMode === 'rainbow') {
      p.hue = (p.hue + rainbowSpeed) % 360;
    } else {
      // 根据频率获取颜色
      const freqIndex = Math.floor((p.x / width) * bufferLength);
      const energy = dataArray[freqIndex] / 255;
      p.hue = energy * 360;
    }
    
    // 设置颜色
    ctx.value.fillStyle = `hsla(${p.hue}, 100%, 50%, ${baseEnergy})`;
    
    // 绘制粒子
    ctx.value.beginPath();
    ctx.value.arc(p.x, p.y, p.size * (1 + baseEnergy), 0, Math.PI * 2);
    ctx.value.fill();
  }
};

// 获取平均能量
const getAverageEnergy = (dataArray) => {
  let sum = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sum += dataArray[i];
  }
  return sum / (dataArray.length * 255);
};

// 获取颜色
const getColor = (index, total) => {
  // 根据设置选择颜色模式
  const colorMode = props.settings.colorMode || 'gradient';
  
  switch (colorMode) {
    case 'solid':
      return props.settings.primaryColor || '#1890ff';
    
    case 'rainbow':
      const hue = (index / total) * 360;
      return `hsl(${hue}, 100%, 50%)`;
    
    case 'gradient':
    default:
      const gradientFrom = props.settings.gradientFrom || '#1890ff';
      const gradientTo = props.settings.gradientTo || '#722ed1';
      
      // 创建渐变色
      const canvas = document.createElement('canvas');
      const tempCtx = canvas.getContext('2d');
      const gradient = tempCtx.createLinearGradient(0, 0, 1, 0);
      
      gradient.addColorStop(0, gradientFrom);
      gradient.addColorStop(1, gradientTo);
      
      tempCtx.fillStyle = gradient;
      tempCtx.fillRect(0, 0, 1, 1);
      
      const position = index / total;
      const imageData = tempCtx.getImageData(position, 0, 1, 1).data;
      
      return `rgba(${imageData[0]}, ${imageData[1]}, ${imageData[2]}, ${imageData[3] / 255})`;
  }
};

// 绘制圆角矩形
const roundRect = (ctx, x, y, width, height, radius) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
};

// 更新音频源
const updateAudioSource = (source) => {
  if (!analyser.value) return;
  
  // 断开之前的连接
  if (props.audioSource) {
    props.audioSource.disconnect(analyser.value);
  }
  
  // 连接新的音频源
  if (source) {
    source.connect(analyser.value);
  }
};

// 监听设置变化
watch(() => [props.settings.fftSize, props.settings.smoothingTimeConstant], () => {
  if (analyser.value) {
    analyser.value.fftSize = fftSize.value;
    analyser.value.smoothingTimeConstant = smoothingTimeConstant.value;
  }
});

// 监听窗口大小变化
const handleResize = () => {
  resizeCanvas();
};

// 生命周期钩子
onMounted(() => {
  window.addEventListener('resize', handleResize);
  nextTick(() => {
    initVisualizer();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (animationId.value) {
    cancelAnimationFrame(animationId.value);
  }
});

// 导出方法
defineExpose({
  updateAudioSource
});
</script>

<style scoped>
.visualizer-base {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 0.5rem;
}

.visualizer-canvas {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
