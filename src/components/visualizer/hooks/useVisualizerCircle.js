/**
 * 环形频谱可视化效果
 */
import { computed } from 'vue';
import { useVisualizerUtils } from './useVisualizerUtils';

/**
 * 环形频谱可视化效果
 * @param {Object} options 配置项
 * @returns {Object} 环形频谱可视化功能
 */
export function useVisualizerCircle(options = {}) {
  const { settings = {} } = options;
  
  // 获取工具函数
  const { getColor, getFrequencyData } = useVisualizerUtils({ settings });
  
  // 环形频谱设置
  const circleRadius = computed(() => settings.circleRadius || 100);
  const rotationSpeed = computed(() => settings.rotationSpeed || 0.5);
  const barCount = computed(() => settings.circleBarCount || 180);
  const lineWidth = computed(() => settings.circleLineWidth || 2);
  
  /**
   * 绘制环形频谱
   * @param {Object} drawContext 绘制上下文
   */
  const drawCircle = (drawContext) => {
    const { ctx, canvas, analyser, sensitivity } = drawContext;
    
    if (!analyser || !ctx || !canvas) return;
    
    const { width, height } = canvas;
    
    // 获取频率数据
    const dataArray = getFrequencyData(analyser);
    const bufferLength = dataArray.length;
    
    // 清空画布
    ctx.clearRect(0, 0, width, height);
    
    // 计算中心点
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 计算旋转角度
    const rotation = Date.now() * 0.001 * rotationSpeed.value;
    
    // 绘制每个频率点
    const angleStep = (Math.PI * 2) / barCount.value;
    
    for (let i = 0; i < barCount.value; i++) {
      // 获取数据点
      const dataIndex = Math.floor(i * bufferLength / barCount.value);
      const value = dataArray[dataIndex] / 255;
      
      // 应用灵敏度
      const barHeight = value * circleRadius.value * sensitivity;
      
      // 计算角度
      const angle = i * angleStep + rotation;
      
      // 计算内外点
      const innerRadius = circleRadius.value;
      const outerRadius = innerRadius + barHeight;
      
      const innerX = centerX + Math.cos(angle) * innerRadius;
      const innerY = centerY + Math.sin(angle) * innerRadius;
      const outerX = centerX + Math.cos(angle) * outerRadius;
      const outerY = centerY + Math.sin(angle) * outerRadius;
      
      // 设置颜色
      ctx.strokeStyle = getColor(i, barCount.value);
      ctx.lineWidth = lineWidth.value;
      
      // 绘制线段
      ctx.beginPath();
      ctx.moveTo(innerX, innerY);
      ctx.lineTo(outerX, outerY);
      ctx.stroke();
    }
    
    // 可选：绘制中心圆
    if (settings.showCenterCircle) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, circleRadius.value * 0.1, 0, Math.PI * 2);
      ctx.fillStyle = settings.centerCircleColor || '#ffffff';
      ctx.fill();
    }
  };
  
  /**
   * 创建绘制函数
   * @returns {Function} 绘制函数
   */
  const createDrawFunction = () => {
    return (drawContext) => {
      drawCircle(drawContext);
    };
  };
  
  return {
    drawCircle,
    createDrawFunction
  };
}
