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
export interface ScheduleResponse {
  times: {
    endTime: string;
    startTime: string;
    id: number;
  }[];
  date: string;
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

// refactoring 필요
// GET /my-activities, /activities 등
export interface ActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: ActivityBasic[];
}

// GET /my-activities/{activityId}/reservation-dashboard
export type FindReservationsByMonthResponse = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}[];

// GET /my-activities/{activityId}/reserved-schedule
export type ReservedScheduleResponse = {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}[];

// refactoring 필요
export interface ReservationWithUserResponse extends ReservationResponse {
  nickname: string;
}

// GET /my-activities/{activityId}/reservations
export interface ReservationsListResponse {
  cursorId: number | null;
  totalCount: number;
  reservations: ReservationWithUserResponse[];
}

// refactoring 필요
// PATCH /my-activities/{activityId}/reservations/{reservationId}
export interface ReservationResponse {
  id: number;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus; // 확인 필요
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// PATCH /my-activities/{activityId}
export interface ActivityWithSchedulesResponse extends ActivityBasic {
  subImages: {
    imageUrl: string;
    id: number;
  }[];
  schedules: ScheduleResponse[];
}

// PATCH /my-activities/{activityId}/reservations/{reservationId}
export interface UpdateMyActivityReservationBody {
  status: Extract<'declined' | 'confirmed', ReservationStatus>;
}

// PATCH /my-activities/{activityId}
export interface UpdateMyActivityBody {
  title?: string;
  category?: Category;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: CreateScheduleBody[];
}

export interface GetMyActivitiesParams {
  cursorId?: number;
  size?: number;
}
