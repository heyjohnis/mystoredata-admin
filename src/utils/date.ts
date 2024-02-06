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

export function dateChange(
  date: Date,
  num: number,
  unit: String = "day"
): Date {
  const newDate = new Date(date);
  if (unit === "day") {
    newDate.setDate(newDate.getDate() + num);
    return newDate;
  } else if (unit === "month") {
    newDate.setMonth(newDate.getMonth() + num);
    return newDate;
  } else if (unit === "year") {
    newDate.setFullYear(newDate.getFullYear() + num);
    return newDate;
  }
  return newDate;
}

export function dateToString(date: string): string {
  //2024-02-04T19:36:00.000Z
  if (date?.indexOf("T") > -1) {
    date.split("T")[0];
    return `${date.split("T")[0]} ${date.split("T")[1].substring(0, 5)}`;
  }
  return date;
}

export function lastDayOfMonth(date: Date): string {
  const lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  return lastDate.toISOString().substring(0, 10);
}
