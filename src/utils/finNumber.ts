export function finNumber(num: number): string {
  const isNegative = num < 0;
  num = Math.abs(num);
  const finNum = num.toLocaleString("ko-KR");
  return isNegative ? `(${finNum})` : finNum;
}
