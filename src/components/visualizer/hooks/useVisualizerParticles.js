/**
 * 粒子效果可视化
 */
import { ref, computed, onMounted } from 'vue';
import { useVisualizerUtils } from './useVisualizerUtils';

/**
 * 粒子效果可视化
 * @param {Object} options 配置项
 * @returns {Object} 粒子效果可视化功能
 */
export function useVisualizerParticles(options = {}) {
  const { settings = {} } = options;
  
  // 获取工具函数
  const { getAverageEnergy, getFrequencyData } = useVisualizerUtils({ settings });
  
  // 粒子设置
  const particleCount = computed(() => settings.particleCount || 200);
  const particleSize = computed(() => settings.particleSize || 3);
  const particleSpeed = computed(() => settings.particleSpeed || 2);
  const rainbowSpeed = computed(() => settings.rainbowSpeed || 0.5);
  const colorMode = computed(() => settings.colorMode || 'gradient');
  
  // 粒子数组
  const particles = ref([]);
  
  /**
   * 初始化粒子
   * @param {HTMLCanvasElement} canvas 画布元素
   */
  const initParticles = (canvas) => {
    if (!canvas) return;
    
    particles.value = [];
    
    const { width, height } = canvas;
    
    for (let i = 0; i < particleCount.value; i++) {
      particles.value.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * particleSize.value + 1,
        speedX: (Math.random() - 0.5) * particleSpeed.value,
        speedY: (Math.random() - 0.5) * particleSpeed.value,
        hue: Math.random() * 360
      });
    }
  };
  
  /**
   * 绘制粒子效果
   * @param {Object} drawContext 绘制上下文
   */
  const drawParticles = (drawContext) => {
    const { ctx, canvas, analyser, sensitivity } = drawContext;
    
    if (!analyser || !ctx || !canvas) return;
    
    const { width, height } = canvas;
    
    // 如果粒子数组为空，初始化粒子
    if (particles.value.length === 0) {
      initParticles(canvas);
    }
    
    // 获取频率数据
    const dataArray = getFrequencyData(analyser);
    const bufferLength = dataArray.length;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 计算平均能量
    const baseEnergy = getAverageEnergy(dataArray) * sensitivity;
    
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
      if (colorMode.value === 'rainbow') {
        p.hue = (p.hue + rainbowSpeed.value) % 360;
      } else {
        // 根据频率获取颜色
        const freqIndex = Math.floor((p.x / width) * bufferLength);
        const energy = dataArray[freqIndex] / 255;
        p.hue = energy * 360;
      }
      
      // 设置颜色
      ctx.fillStyle = `hsla(${p.hue}, 100%, 50%, ${baseEnergy})`;
      
      // 绘制粒子
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (1 + baseEnergy), 0, Math.PI * 2);
      ctx.fill();
    }
  };
  
  /**
   * 重置粒子
   * @param {HTMLCanvasElement} canvas 画布元素
   */
  const resetParticles = (canvas) => {
    initParticles(canvas);
  };
  
  /**
   * 创建绘制函数
   * @returns {Function} 绘制函数
   */
  const createDrawFunction = () => {
    return (drawContext) => {
      drawParticles(drawContext);
    };
  };
  
  // 监听设置变化
  onMounted(() => {
    // 初始化时不做任何操作，等待第一次绘制时初始化粒子
  });
  
  return {
    particles,
    initParticles,
    drawParticles,
    resetParticles,
    createDrawFunction
  };
}
