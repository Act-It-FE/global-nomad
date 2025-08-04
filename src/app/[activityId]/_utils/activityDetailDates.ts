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

// 오늘 날짜와 비교하는 함수
export const isPastDate = (date: Date) => {
  const now = new Date();
  const kstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
  const kstDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);

  return (
    kstDate.getFullYear() < kstNow.getFullYear() ||
    (kstDate.getFullYear() === kstNow.getFullYear() &&
      kstDate.getMonth() < kstNow.getMonth()) ||
    (kstDate.getFullYear() === kstNow.getFullYear() &&
      kstDate.getMonth() === kstNow.getMonth() &&
      kstDate.getDate() < kstNow.getDate())
  );
};
