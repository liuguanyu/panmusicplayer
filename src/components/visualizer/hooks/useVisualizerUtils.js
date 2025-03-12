/**
 * 可视化效果工具函数
 */
import { computed } from 'vue';

/**
 * 可视化工具函数
 * @param {Object} options 配置项
 * @returns {Object} 工具函数集合
 */
export function useVisualizerUtils(options = {}) {
  const { settings = {} } = options;

  /**
   * 获取颜色
   * @param {Number} index 当前索引
   * @param {Number} total 总数
   * @returns {String} 颜色值
   */
  const getColor = (index, total) => {
    const colorMode = settings.colorMode || 'gradient';
    const primaryColor = settings.primaryColor || '#1890ff';
    const secondaryColor = settings.secondaryColor || '#722ed1';
    
    switch (colorMode) {
      case 'solid':
        return primaryColor;
      case 'rainbow':
        return `hsl(${(index / total) * 360}, 100%, 50%)`;
      case 'gradient':
      default:
        // 从主色到次色的渐变
        const hue = (index / total) * 360;
        return `hsl(${hue}, 100%, 50%)`;
    }
  };

  /**
   * 绘制圆角矩形
   * @param {CanvasRenderingContext2D} ctx Canvas上下文
   * @param {Number} x X坐标
   * @param {Number} y Y坐标
   * @param {Number} width 宽度
   * @param {Number} height 高度
   * @param {Number} radius 圆角半径
   */
  const roundRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
  };

  /**
   * 获取平均能量
   * @param {Uint8Array} dataArray 频率数据
   * @returns {Number} 平均能量值 (0-1)
   */
  const getAverageEnergy = (dataArray) => {
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    return sum / (dataArray.length * 255);
  };

  /**
   * 获取频率数据
   * @param {AnalyserNode} analyser 分析器节点
   * @param {Number} count 数据点数量
   * @returns {Uint8Array} 频率数据
   */
  const getFrequencyData = (analyser, count = null) => {
    if (!analyser) return new Uint8Array(0);
    
    const bufferLength = count ? Math.min(analyser.frequencyBinCount, count) : analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    
    return dataArray;
  };

  /**
   * 获取时域数据
   * @param {AnalyserNode} analyser 分析器节点
   * @returns {Uint8Array} 时域数据
   */
  const getTimeDomainData = (analyser) => {
    if (!analyser) return new Uint8Array(0);
    
    const bufferLength = analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    
    return dataArray;
  };

  return {
    getColor,
    roundRect,
    getAverageEnergy,
    getFrequencyData,
    getTimeDomainData
  };
}
