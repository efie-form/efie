export const toBgColorStyle = (color: string) => {
  if (!isColorString(color)) return;
  return color;
};

export const toColorStyle = (color: string) => {
  if (!isColorString(color)) return;
  return color;
};

const isColorString = (color: string) => {
  const regex = [
    /#[0-9a-fA-F]{8}/,
    /#[0-9a-fA-F]{6}/,
    /#[0-9a-fA-F]{3}/,
    /rgb\(\d{1,3},\d{1,3},\d{1,3}\)/,
  ];
  return regex.some(r => r.test(color));
};
