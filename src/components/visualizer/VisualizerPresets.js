/**
 * 可视化效果预设
 */

/**
 * 预设类型
 * @typedef {Object} VisualizerPreset
 * @property {string} id 预设ID
 * @property {string} name 预设名称
 * @property {string} type 可视化类型
 * @property {Object} settings 可视化设置
 */

/**
 * 可视化效果预设列表
 * @type {VisualizerPreset[]}
 */
export const visualizerPresets = [
  // 柱状图预设
  {
    id: 'bars-default',
    name: '默认柱状图',
    type: 'bars',
    settings: {
      barCount: 64,
      barSpacing: 1,
      barRounded: true,
      colorMode: 'gradient',
      gradientFrom: '#1890ff',
      gradientTo: '#722ed1',
      sensitivity: 1.2
    }
  },
  {
    id: 'bars-rainbow',
    name: '彩虹柱状图',
    type: 'bars',
    settings: {
      barCount: 128,
      barSpacing: 2,
      barRounded: true,
      colorMode: 'rainbow',
      sensitivity: 1.5
    }
  },
  {
    id: 'bars-minimal',
    name: '简约柱状图',
    type: 'bars',
    settings: {
      barCount: 32,
      barSpacing: 4,
      barRounded: false,
      colorMode: 'solid',
      primaryColor: '#ffffff',
      sensitivity: 1.0
    }
  },
  
  // 波形图预设
  {
    id: 'wave-default',
    name: '默认波形图',
    type: 'wave',
    settings: {
      lineWidth: 2,
      fillWave: true,
      primaryColor: '#1890ff',
      sensitivity: 1.0
    }
  },
  {
    id: 'wave-thick',
    name: '粗线波形图',
    type: 'wave',
    settings: {
      lineWidth: 4,
      fillWave: false,
      primaryColor: '#52c41a',
      sensitivity: 1.2
    }
  },
  
  // 环形频谱预设
  {
    id: 'circle-default',
    name: '默认环形频谱',
    type: 'circle',
    settings: {
      circleRadius: 120,
      rotationSpeed: 0.5,
      circleBarCount: 180,
      circleLineWidth: 2,
      colorMode: 'gradient',
      gradientFrom: '#1890ff',
      gradientTo: '#f5222d',
      sensitivity: 1.2,
      showCenterCircle: true,
      centerCircleColor: '#ffffff'
    }
  },
  {
    id: 'circle-rainbow',
    name: '彩虹环形频谱',
    type: 'circle',
    settings: {
      circleRadius: 100,
      rotationSpeed: 0.8,
      circleBarCount: 120,
      circleLineWidth: 3,
      colorMode: 'rainbow',
      sensitivity: 1.5,
      showCenterCircle: false
    }
  },
  
  // 粒子效果预设
  {
    id: 'particles-default',
    name: '默认粒子效果',
    type: 'particles',
    settings: {
      particleCount: 200,
      particleSize: 3,
      particleSpeed: 2,
      colorMode: 'gradient',
      sensitivity: 1.2
    }
  },
  {
    id: 'particles-rainbow',
    name: '彩虹粒子效果',
    type: 'particles',
    settings: {
      particleCount: 300,
      particleSize: 2,
      particleSpeed: 3,
      colorMode: 'rainbow',
      rainbowSpeed: 0.8,
      sensitivity: 1.5
    }
  },
  {
    id: 'particles-minimal',
    name: '简约粒子效果',
    type: 'particles',
    settings: {
      particleCount: 100,
      particleSize: 4,
      particleSpeed: 1,
      colorMode: 'solid',
      primaryColor: '#ffffff',
      sensitivity: 1.0
    }
  }
];

/**
 * 获取预设
 * @param {string} id 预设ID
 * @returns {VisualizerPreset|undefined} 预设对象
 */
export function getPreset(id) {
  return visualizerPresets.find(preset => preset.id === id);
}

/**
 * 获取指定类型的预设列表
 * @param {string} type 可视化类型
 * @returns {VisualizerPreset[]} 预设列表
 */
export function getPresetsByType(type) {
  return visualizerPresets.filter(preset => preset.type === type);
}

/**
 * 获取默认预设
 * @param {string} type 可视化类型
 * @returns {VisualizerPreset} 默认预设
 */
export function getDefaultPreset(type) {
  const typePresets = getPresetsByType(type);
  return typePresets.length > 0 ? typePresets[0] : null;
}

/**
 * 可视化类型列表
 */
export const visualizerTypes = [
  { id: 'bars', name: '柱状图' },
  { id: 'wave', name: '波形图' },
  { id: 'circle', name: '环形频谱' },
  { id: 'particles', name: '粒子效果' }
];
