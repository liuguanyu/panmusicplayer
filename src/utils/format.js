/**
 * 格式化名称，处理可能是对象的情况
 * @param {string|object} name - 名称，可能是字符串或对象
 * @param {string} defaultValue - 默认值，当name为空时返回
 * @returns {string} 格式化后的名称
 */
export function formatName(name, defaultValue = '未知') {
  if (!name) return defaultValue;
  
  // 如果是字符串但可能是JSON字符串
  if (typeof name === 'string' && name.startsWith('{')) {
    try {
      const parsed = JSON.parse(name);
      return parsed.name || defaultValue;
    } catch (e) {
      return name;
    }
  }
  
  // 如果是对象
  if (typeof name === 'object' && name !== null) {
    return name.name || name.title || Object.values(name)[0] || defaultValue;
  }
  
  // 如果是字符串或其他类型
  return String(name);
}
