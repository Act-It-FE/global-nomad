// 달 이름 영어로 변경
export const getMonthNameEnglish = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(
    date,
  );

// 달 일치여부 확인
export const isSameMonth = (base: Date, target: Date) =>
  base.getFullYear() === target.getFullYear() &&
  base.getMonth() === target.getMonth();

export const getKSTDateString = (date: Date) => {
  const offset = 9 * 60 * 60 * 1000;
  const kstDate = new Date(date.getTime() + offset);
  return kstDate.toISOString().split('T')[0];
};
