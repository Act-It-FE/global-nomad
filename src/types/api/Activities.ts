// Activities 타입

// 체험 리스트 조회
export interface BaseActivity {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity extends BaseActivity {
  rating: number;
  reviewCount: number;
}

export interface ActivityResponse {
  activities: Activity[];
}

export interface OffsetParams {
  method: 'offset';
  offset: number;
  limit?: number;
  category?: string;
  keyword?: string;
}

export interface CursorParams {
  method: 'cursor';
  cursorId: number;
  limit?: number;
  category?: string;
  keyword?: string;
}

export type GetActivitiesParams = OffsetParams | CursorParams;

// 체험 상세 조회
export interface SubImage {
  id: number;
  imageUrl: string;
}

export interface Schedule {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface ActivitiesDetail extends BaseActivity {
  rating: number;
  reviewCount: number;
  subImages: SubImage[];
  schedules: Schedule[];
}

// 체험 예약 가능일 조회
export interface AvailableSchedule {
  date: string;
  times: ScheduleTime[];
}

export interface ScheduleTime {
  id: number;
  startTime: string;
  endTime: string;
}

export interface GetAvailableSchduleParams {
  year: string;
  month: string;
}

//체험 리뷰 조회
export interface ReviewUser {
  id: number;
  profileImageUrl: string;
  nickname: string;
}

export interface Review {
  id: number;
  user: ReviewUser;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityReviewResponse {
  averageRating: number;
  totalCount: number;
  reviews: Review[];
}

export interface ReservationRequest {
  scheduleId: number;
  headCount: number;
}

export interface GetActivityReviewsParams {
  page?: number;
  size?: number;
}

// 체험 예약 신청
export interface ReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending' | 'approved' | 'rejected';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

// 체험 이미지 URL 생성 응답
export interface ActivityImageUploadResponse {
  activityImageUrl: string;
}

// 체험 등록
export interface ActivityRegisterPayload {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  bannerImageUrl: string;
  subImageUrls: string[];
  schedule: ActivityRegisterSchedule[];
}

export interface ActivityRegisterSchedule {
  date: string;
  startTime: string;
  endTime: string;
}
