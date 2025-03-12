/**
 * 柱状图可视化效果
 */
import { computed } from 'vue';
import { useVisualizerUtils } from './useVisualizerUtils';

/**
 * 柱状图可视化效果
 * @param {Object} options 配置项
 * @returns {Object} 柱状图可视化功能
 */
export function useVisualizerBars(options = {}) {
  const { settings = {} } = options;
  
  // 获取工具函数
  const { getColor, roundRect, getFrequencyData } = useVisualizerUtils({ settings });
  
  // 柱状图设置
  const barCount = computed(() => settings.barCount || 64);
  const barSpacing = computed(() => settings.barSpacing || 1);
  const barRounded = computed(() => settings.barRounded !== undefined ? settings.barRounded : true);
  
  /**
   * 绘制柱状图
   * @param {Object} drawContext 绘制上下文
   */
  const drawBars = (drawContext) => {
    const { ctx, canvas, analyser, sensitivity } = drawContext;
    
    if (!analyser || !ctx || !canvas) return;
    
    const { width, height } = canvas;
    const bufferLength = Math.min(analyser.frequencyBinCount, barCount.value);
    
    // 获取频率数据
    const dataArray = getFrequencyData(analyser, bufferLength);
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 计算柱状宽度
    const barWidth = (width / bufferLength) - barSpacing.value;
    
    // 绘制每个柱状
    for (let i = 0; i < bufferLength; i++) {
      // 应用灵敏度
      const barHeight = (dataArray[i] / 255) * height * sensitivity;
      
      // 计算位置
      const x = i * (barWidth + barSpacing.value);
      const y = height - barHeight;
      
      // 设置颜色
      ctx.fillStyle = getColor(i, bufferLength);
      
      // 绘制柱状
      if (barRounded.value) {
        // 圆角矩形
        const radius = Math.min(barWidth / 2, 4);
        roundRect(ctx, x, y, barWidth, barHeight, radius);
      } else {
        // 普通矩形
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    }
  };
  
  /**
   * 创建绘制函数
   * @returns {Function} 绘制函数
   */
  const createDrawFunction = () => {
    return (drawContext) => {
      drawBars(drawContext);
    };
  };
  
  return {
    drawBars,
    createDrawFunction
  };
}
