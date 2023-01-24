
export function onlyNumbers(value: string) {
  if (!value) return value;
  
  const cpf = value.replace(/[^\d]/g, '');

  return `${cpf.slice(0, 11)}`;
}