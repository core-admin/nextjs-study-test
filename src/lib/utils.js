export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function CSSstring(string) {
  try {
    const functionPlaceholders = [];
    const stringWithoutFunctions = string.replace(/\b\w+\([^)]*(?:\([^)]*\)[^)]*)*\)/g, match => {
      functionPlaceholders.push(match);
      return `__FN_${functionPlaceholders.length - 1}__`;
    });

    // 更严格的字符串处理
    const parts = stringWithoutFunctions
      .trim()
      .replace(/;[ ]*$/g, '') // 移除末尾分号
      .split(/;[ ]*/); // 按分号分割

    // 手动构建JSON对象
    const obj = {};
    parts.forEach(part => {
      const [key, value] = part.split(/:[ ]*/);
      if (key && value) {
        obj[key.trim()] = value.trim();
      }
    });

    const keyValues = Object.keys(obj).map(key => {
      const finalKey = key.startsWith('--') ? key : key.replace(/-[a-z]/g, g => g[1].toUpperCase());

      // 还原函数
      let value = obj[key];
      functionPlaceholders.forEach((fn, index) => {
        value = value.replace(`__FN_${index}__`, fn);
      });

      return { [finalKey]: value };
    });

    return Object.assign({}, ...keyValues);
  } catch (e) {
    console.error('Parse error:', e.message);
    console.error('Problem JSON:', css_json);
    return {};
  }
}
