// refactoring 필요
export type Category =
  | '문화 · 예술'
  | '식음료'
  | '스포츠'
  | '투어'
  | '관광'
  | '웰빙';

// refactoring 필요
// ReservationResponse, ReservationWithActivityResponse 에 사용
export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'declined'
  | 'canceled'
  | 'completed';

// refactoring 필요
export interface CreateScheduleBody {
  date: string;
  startTime: string;
  endTime: string;
}

// refactoring 필요
export interface ActivityBasic {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

// refactoring 필요
// 공통 사용
export interface ErrorResponse {
  message: string;
}
