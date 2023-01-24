

export function toCpf(value: string) {
  if (!value) return value;

  const cpf = value.replace(/[^\d]/g, '');
  
  const cpfLength = cpf.length;

  if (cpfLength < 3) return cpf;

  if (cpfLength < 6) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}`;
  }

  if (cpfLength < 9) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6,9)}`;
  }

  if (cpfLength == 12) {
    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6,9)}`
  }

  return `${cpf.slice(0, 3)}.${cpf.slice(3,6)}.${cpf.slice(6, 9)}-${cpf.slice(9, 11)}`;
}