/* eslint-disable @typescript-eslint/no-explicit-any */

export const getStyle = (
  style: undefined | Record<string, any> | Record<string, any>[]
) => {
  if (!Array.isArray(style)) {
    return style;
  }

  const computed = {};

  style.forEach(item => {
    if (typeof item === 'object') {
      Object.assign(computed, item);
    }
  });

  return computed;
};
