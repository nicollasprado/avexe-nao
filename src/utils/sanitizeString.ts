export const sanitizeString = (raw: string) => {
  return raw.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
