export function strToDate(dateString: string): Date {
  const strLength = dateString.length;

  const year = parseInt(dateString.substring(0, 4));
  const month = parseInt(dateString.substring(4, 6)) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
  const day = parseInt(dateString.substring(6, 8));
  const hour = strLength > 9 ? parseInt(dateString.substring(8, 10)) : 0;
  const minute = strLength > 11 ? parseInt(dateString.substring(10, 12)) : 0;
  const second = strLength > 13 ? parseInt(dateString.substring(12, 14)) : 0;

  return new Date(year, month, day, hour, minute, second);
}

export function dateChange(date: Date, day: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + day);
  return newDate;
}
