// Activities 타입

// 체험 리스트 조회
export interface Activity {
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

export interface ActivityResponse {
  activities: Activity[];
}

// 체험 상세 조회
export interface ActivitiesDetail extends Activity {
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
