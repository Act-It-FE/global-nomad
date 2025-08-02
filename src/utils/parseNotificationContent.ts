/**
 * 알림 문자열을 파싱하여 활동 이름, 일정, 상태 텍스트로 분리합니다.
 * 예: "어린이 미술 체험 (2024-10-24) 예약이 승인되었어요."
 * @param content - 알림 전체 내용
 * @returns { activityName, schedule, statusText }
 */
export const parseNotificationContent = (content: string) => {
  if (!content || typeof content !== 'string') {
    return {
      activityName: '',
      schedule: '',
      statusText: content || '',
    };
  }

  // 정규식을 사용하여 괄호 안의 내용과 나머지 부분을 추출합니다.
  const match = content.match(/^(.+?)\s*\((.+?)\)\s*(.+)$/);

  if (match) {
    const activityName = match[1].trim();
    const schedule = `(${match[2]})`;
    const statusText = match[3].trim();
    return { activityName, schedule, statusText };
  }

  // 매칭되는 패턴이 없을 경우, 전체 내용을 statusText로 반환합니다.
  return {
    activityName: '',
    schedule: '',
    statusText: content,
  };
};
