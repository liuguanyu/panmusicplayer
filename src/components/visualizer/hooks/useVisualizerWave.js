/**
 * 波形图可视化效果
 */
import { computed } from 'vue';
import { useVisualizerUtils } from './useVisualizerUtils';

/**
 * 波形图可视化效果
 * @param {Object} options 配置项
 * @returns {Object} 波形图可视化功能
 */
export function useVisualizerWave(options = {}) {
  const { settings = {} } = options;
  
  // 获取工具函数
  const { getTimeDomainData } = useVisualizerUtils({ settings });
  
  // 波形图设置
  const lineWidth = computed(() => settings.lineWidth || 2);
  const fillWave = computed(() => settings.fillWave !== undefined ? settings.fillWave : true);
  const primaryColor = computed(() => settings.primaryColor || '#1890ff');
  
  /**
   * 绘制波形图
   * @param {Object} drawContext 绘制上下文
   */
  const drawWave = (drawContext) => {
    const { ctx, canvas, analyser } = drawContext;
    
    if (!analyser || !ctx || !canvas) return;
    
    const { width, height } = canvas;
    
    // 获取时域数据
    const dataArray = getTimeDomainData(analyser);
    const bufferLength = dataArray.length;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 设置线条样式
    ctx.lineWidth = lineWidth.value;
    ctx.strokeStyle = primaryColor.value;
    
    // 开始绘制路径
    ctx.beginPath();
    
    // 如果需要填充，设置填充样式
    if (fillWave.value) {
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, `${primaryColor.value}80`); // 半透明
      gradient.addColorStop(1, `${primaryColor.value}00`); // 透明
      ctx.fillStyle = gradient;
    }
    
    const sliceWidth = width / bufferLength;
    let x = 0;
    
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArray[i] / 128.0;
      const y = v * height / 2;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      
      x += sliceWidth;
    }
    
    // 完成路径
    if (fillWave.value) {
      ctx.lineTo(width, height / 2);
      ctx.lineTo(0, height / 2);
      ctx.fill();
    }
    
    ctx.stroke();
  };
  
  /**
   * 创建绘制函数
   * @returns {Function} 绘制函数
   */
  const createDrawFunction = () => {
    return (drawContext) => {
      drawWave(drawContext);
    };
  };
  
  return {
    drawWave,
    createDrawFunction
  };
}
