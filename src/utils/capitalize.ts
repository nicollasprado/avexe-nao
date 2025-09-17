export const capitalize = (raw: string): string => {
  if (raw.length === 0) return raw;
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
};
