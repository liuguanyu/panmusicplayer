export function usePlayerVisualizer(state) {
  // 初始化可视化器
  const initVisualizer = () => {
    if (!state.audioContext.value) {
      console.warn('无法初始化可视化器: 音频上下文不存在');
      return false;
    }
    
    try {
      // 创建分析器
      state.analyser.value = createAnalyser();
      
      if (!state.analyser.value) {
        return false;
      }
      
      // 如果已经有音频源，连接到分析器
      if (state.audioSource.value) {
        connectAnalyser(state.analyser.value);
      }
      
      return true;
    } catch (error) {
      console.error('初始化可视化器失败:', error);
      return false;
    }
  };
  
  // 创建音频分析器
  const createAnalyser = () => {
    if (!state.audioContext.value) {
      console.warn('无法创建音频分析器: 音频上下文不存在');
      return null;
    }
    
    try {
      // 创建分析器节点
      const analyser = state.audioContext.value.createAnalyser();
      
      // 设置默认参数
      analyser.fftSize = 2048; // FFT 大小，必须是 2 的幂
      analyser.smoothingTimeConstant = 0.8; // 平滑系数 (0-1)
      
      return analyser;
    } catch (error) {
      console.error('创建音频分析器失败:', error);
      return null;
    }
  };
  
  // 连接音频源到分析器
  const connectAnalyser = (analyser) => {
    if (!analyser || !state.audioSource.value) {
      return false;
    }
    
    try {
      // 连接音频源到分析器
      state.audioSource.value.connect(analyser);
      
      // 将分析器连接到目标节点（通常是音频上下文的目标节点）
      analyser.connect(state.audioContext.value.destination);
      
      return true;
    } catch (error) {
      console.error('连接音频分析器失败:', error);
      return false;
    }
  };
  
  // 断开分析器连接
  const disconnectAnalyser = (analyser) => {
    if (!analyser) {
      return;
    }
    
    try {
      analyser.disconnect();
    } catch (error) {
      console.error('断开音频分析器连接失败:', error);
    }
  };
  
  // 获取频率数据
  const getFrequencyData = (analyser, dataArray = null) => {
    if (!analyser) {
      return null;
    }
    
    try {
      // 如果没有提供数据数组，创建一个新的
      const frequencyData = dataArray || new Uint8Array(analyser.frequencyBinCount);
      
      // 获取频率数据
      analyser.getByteFrequencyData(frequencyData);
      
      return frequencyData;
    } catch (error) {
      console.error('获取频率数据失败:', error);
      return null;
    }
  };
  
  // 获取波形数据（时域数据）
  const getWaveformData = (analyser, dataArray = null) => {
    if (!analyser) {
      return null;
    }
    
    try {
      // 如果没有提供数据数组，创建一个新的
      const timeDomainData = dataArray || new Uint8Array(analyser.frequencyBinCount);
      
      // 获取时域数据
      analyser.getByteTimeDomainData(timeDomainData);
      
      return timeDomainData;
    } catch (error) {
      console.error('获取时域数据失败:', error);
      return null;
    }
  };
  
  // 设置 FFT 大小
  const setFFTSize = (analyser, size) => {
    if (!analyser) {
      return false;
    }
    
    // FFT 大小必须是 2 的幂，且在 32 到 32768 之间
    const validSizes = [32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384, 32768];
    
    if (!validSizes.includes(size)) {
      console.warn('无效的 FFT 大小:', size);
      return false;
    }
    
    try {
      analyser.fftSize = size;
      return true;
    } catch (error) {
      console.error('设置 FFT 大小失败:', error);
      return false;
    }
  };
  
  // 设置平滑系数
  const setSmoothingTimeConstant = (analyser, value) => {
    if (!analyser) {
      return false;
    }
    
    // 平滑系数必须在 0 到 1 之间
    const smoothingValue = Math.max(0, Math.min(1, value));
    
    try {
      analyser.smoothingTimeConstant = smoothingValue;
      return true;
    } catch (error) {
      console.error('设置平滑系数失败:', error);
      return false;
    }
  };
  
  // 设置最小分贝值
  const setMinDecibels = (analyser, value) => {
    if (!analyser) {
      return false;
    }
    
    try {
      // 最小分贝值必须小于最大分贝值
      if (value >= analyser.maxDecibels) {
        console.warn('最小分贝值必须小于最大分贝值');
        return false;
      }
      
      analyser.minDecibels = value;
      return true;
    } catch (error) {
      console.error('设置最小分贝值失败:', error);
      return false;
    }
  };
  
  // 设置最大分贝值
  const setMaxDecibels = (analyser, value) => {
    if (!analyser) {
      return false;
    }
    
    try {
      // 最大分贝值必须大于最小分贝值
      if (value <= analyser.minDecibels) {
        console.warn('最大分贝值必须大于最小分贝值');
        return false;
      }
      
      analyser.maxDecibels = value;
      return true;
    } catch (error) {
      console.error('设置最大分贝值失败:', error);
      return false;
    }
  };
  
  // 创建并配置可视化器
  const setupVisualizer = (config = {}) => {
    // 默认配置
    const defaultConfig = {
      fftSize: 2048,
      smoothingTimeConstant: 0.8,
      minDecibels: -100,
      maxDecibels: -30
    };
    
    // 合并配置
    const finalConfig = { ...defaultConfig, ...config };
    
    // 创建分析器
    const analyser = createAnalyser();
    
    if (!analyser) {
      return null;
    }
    
    // 配置分析器
    setFFTSize(analyser, finalConfig.fftSize);
    setSmoothingTimeConstant(analyser, finalConfig.smoothingTimeConstant);
    setMinDecibels(analyser, finalConfig.minDecibels);
    setMaxDecibels(analyser, finalConfig.maxDecibels);
    
    // 连接分析器
    connectAnalyser(analyser);
    
    return analyser;
  };
  
  // 计算音频能量值（响度）
  const calculateEnergy = (frequencyData) => {
    if (!frequencyData || frequencyData.length === 0) {
      return 0;
    }
    
    // 计算所有频率值的平均值
    const sum = frequencyData.reduce((acc, val) => acc + val, 0);
    const average = sum / frequencyData.length;
    
    // 归一化到 0-1 范围
    return average / 255;
  };
  
  // 计算低频能量
  const calculateBassEnergy = (frequencyData, analyser) => {
    if (!frequencyData || frequencyData.length === 0 || !analyser) {
      return 0;
    }
    
    // 计算低频范围（通常是 20Hz 到 250Hz）
    const sampleRate = state.audioContext.value.sampleRate;
    const binCount = analyser.frequencyBinCount;
    const binWidth = sampleRate / (analyser.fftSize * 2);
    
    // 计算低频对应的索引范围
    const lowFreqStart = Math.floor(20 / binWidth);
    const lowFreqEnd = Math.min(Math.floor(250 / binWidth), binCount);
    
    // 计算低频范围内的平均能量
    let sum = 0;
    for (let i = lowFreqStart; i < lowFreqEnd; i++) {
      sum += frequencyData[i];
    }
    
    const average = sum / (lowFreqEnd - lowFreqStart);
    
    // 归一化到 0-1 范围
    return average / 255;
  };
  
  // 计算中频能量
  const calculateMidEnergy = (frequencyData, analyser) => {
    if (!frequencyData || frequencyData.length === 0 || !analyser) {
      return 0;
    }
    
    // 计算中频范围（通常是 250Hz 到 4000Hz）
    const sampleRate = state.audioContext.value.sampleRate;
    const binCount = analyser.frequencyBinCount;
    const binWidth = sampleRate / (analyser.fftSize * 2);
    
    // 计算中频对应的索引范围
    const midFreqStart = Math.floor(250 / binWidth);
    const midFreqEnd = Math.min(Math.floor(4000 / binWidth), binCount);
    
    // 计算中频范围内的平均能量
    let sum = 0;
    for (let i = midFreqStart; i < midFreqEnd; i++) {
      sum += frequencyData[i];
    }
    
    const average = sum / (midFreqEnd - midFreqStart);
    
    // 归一化到 0-1 范围
    return average / 255;
  };
  
  // 计算高频能量
  const calculateHighEnergy = (frequencyData, analyser) => {
    if (!frequencyData || frequencyData.length === 0 || !analyser) {
      return 0;
    }
    
    // 计算高频范围（通常是 4000Hz 到 20000Hz）
    const sampleRate = state.audioContext.value.sampleRate;
    const binCount = analyser.frequencyBinCount;
    const binWidth = sampleRate / (analyser.fftSize * 2);
    
    // 计算高频对应的索引范围
    const highFreqStart = Math.floor(4000 / binWidth);
    const highFreqEnd = Math.min(Math.floor(20000 / binWidth), binCount);
    
    // 计算高频范围内的平均能量
    let sum = 0;
    for (let i = highFreqStart; i < highFreqEnd; i++) {
      sum += frequencyData[i];
    }
    
    const average = sum / (highFreqEnd - highFreqStart);
    
    // 归一化到 0-1 范围
    return average / 255;
  };
  
  // 计算频率带
  const calculateFrequencyBands = (frequencyData, analyser, bands = 8) => {
    if (!frequencyData || frequencyData.length === 0 || !analyser) {
      return new Array(bands).fill(0);
    }
    
    const result = new Array(bands).fill(0);
    const binCount = analyser.frequencyBinCount;
    const binsPerBand = Math.floor(binCount / bands);
    
    for (let i = 0; i < bands; i++) {
      const startBin = i * binsPerBand;
      const endBin = (i + 1) * binsPerBand - 1;
      
      let sum = 0;
      for (let j = startBin; j <= endBin; j++) {
        sum += frequencyData[j];
      }
      
      // 计算平均值并归一化到 0-1 范围
      result[i] = (sum / binsPerBand) / 255;
    }
    
    return result;
  };
  
  // 检测节拍
  const detectBeat = (frequencyData, analyser, threshold = 0.15, decayRate = 0.95) => {
    if (!frequencyData || frequencyData.length === 0 || !analyser) {
      return false;
    }
    
    // 使用低频能量来检测节拍
    const bassEnergy = calculateBassEnergy(frequencyData, analyser);
    
    // 更新平均能量（使用指数移动平均）
    if (!state.beatDetection) {
      state.beatDetection = {
        averageEnergy: bassEnergy,
        lastBeatTime: 0
      };
    } else {
      state.beatDetection.averageEnergy = 
        state.beatDetection.averageEnergy * decayRate + 
        bassEnergy * (1 - decayRate);
    }
    
    // 检测节拍（当前能量超过平均能量一定阈值）
    const isBeat = bassEnergy > state.beatDetection.averageEnergy + threshold;
    
    // 防止节拍检测过于频繁（至少间隔 100ms）
    const now = Date.now();
    const minBeatInterval = 100; // 毫秒
    
    if (isBeat && now - state.beatDetection.lastBeatTime > minBeatInterval) {
      state.beatDetection.lastBeatTime = now;
      return true;
    }
    
    return false;
  };
  
  return {
    initVisualizer,
    createAnalyser,
    connectAnalyser,
    disconnectAnalyser,
    getFrequencyData,
    getWaveformData,
    setFftSize: setFFTSize, // 保持别名，确保与 player.js 中导入的函数名一致
    setSmoothingTimeConstant,
    setMinDecibels,
    setMaxDecibels,
    setupVisualizer,
    calculateEnergy,
    calculateBassEnergy,
    calculateMidEnergy,
    calculateHighEnergy,
    calculateFrequencyBands,
    detectBeat
  };
}
