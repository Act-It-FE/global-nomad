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

// 체험 상세 조회
export interface ActivitiesDetail extends BaseActivity {
  subImages: SubImage[];
  schedules: Schedule[];
}

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
