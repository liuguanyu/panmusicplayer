/**
 * 可视化效果核心功能
 */
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';

/**
 * 可视化效果核心功能
 * @param {Object} options 配置项
 * @returns {Object} 核心功能
 */
export function useVisualizerCore(options = {}) {
  const {
    audioContext,
    audioSource,
    isPlaying,
    settings = {},
    onDrawFrame = null
  } = options;

  // 状态
  const canvas = ref(null);
  const ctx = ref(null);
  const analyser = ref(null);
  const animationId = ref(null);

  // 通用设置
  const sensitivity = computed(() => settings.sensitivity || 2);
  const smoothingTimeConstant = computed(() => settings.smoothingTimeConstant || 0.8);
  const fftSize = computed(() => settings.fftSize || 2048);

  /**
   * 初始化可视化
   */
  const initVisualizer = () => {
    if (!audioContext || !canvas.value) return;
    
    // 创建分析器
    analyser.value = audioContext.createAnalyser();
    analyser.value.fftSize = fftSize.value;
    analyser.value.smoothingTimeConstant = smoothingTimeConstant.value;
    
    // 如果有音频源，连接到分析器
    if (audioSource) {
      audioSource.connect(analyser.value);
    }
    
    // 获取画布上下文
    ctx.value = canvas.value.getContext('2d');
    
    // 调整画布大小
    resizeCanvas();
    
    // 开始动画
    startAnimation();
  };

  /**
   * 调整画布大小
   */
  const resizeCanvas = () => {
    if (!canvas.value || !ctx.value) return;
    
    const container = canvas.value.parentElement;
    canvas.value.width = container.clientWidth;
    canvas.value.height = container.clientHeight;
  };

  /**
   * 开始动画
   */
  const startAnimation = () => {
    if (!ctx.value || !analyser.value) return;
    
    // 取消之前的动画
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
    }
    
    // 绘制静态效果
    const render = () => {
      if (!isPlaying) {
        // 如果没有播放，只绘制静态效果
        drawStaticEffect();
        animationId.value = requestAnimationFrame(render);
        return;
      }
      
      // 调用外部绘制函数
      if (typeof onDrawFrame === 'function') {
        onDrawFrame({
          ctx: ctx.value,
          canvas: canvas.value,
          analyser: analyser.value,
          sensitivity: sensitivity.value
        });
      }
      
      animationId.value = requestAnimationFrame(render);
    };
    
    render();
  };

  /**
   * 绘制静态效果
   */
  const drawStaticEffect = () => {
    if (!canvas.value || !ctx.value) return;
    
    const { width, height } = canvas.value;
    
    // 清空画布
    ctx.value.clearRect(0, 0, width, height);
    
    // 绘制提示文本
    ctx.value.fillStyle = 'rgba(128, 128, 128, 0.5)';
    ctx.value.font = '16px sans-serif';
    ctx.value.textAlign = 'center';
    ctx.value.textBaseline = 'middle';
    ctx.value.fillText('播放音乐以查看可视化效果', width / 2, height / 2);
  };

  /**
   * 清空画布
   */
  const clearCanvas = () => {
    if (!canvas.value || !ctx.value) return;
    
    const { width, height } = canvas.value;
    ctx.value.clearRect(0, 0, width, height);
  };

  /**
   * 停止动画
   */
  const stopAnimation = () => {
    if (animationId.value) {
      cancelAnimationFrame(animationId.value);
      animationId.value = null;
    }
  };

  /**
   * 更新分析器设置
   */
  const updateAnalyserSettings = () => {
    if (!analyser.value) return;
    
    analyser.value.fftSize = fftSize.value;
    analyser.value.smoothingTimeConstant = smoothingTimeConstant.value;
  };

  // 监听设置变化
  watch(() => [fftSize.value, smoothingTimeConstant.value], () => {
    updateAnalyserSettings();
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
    stopAnimation();
  });

  return {
    canvas,
    ctx,
    analyser,
    initVisualizer,
    resizeCanvas,
    startAnimation,
    stopAnimation,
    clearCanvas,
    drawStaticEffect
  };
}
