export interface GetNotificationsParams {
  cursorId?: number;
  size?: number;
}

export interface MyNotification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  createdAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  deletedAt: string | null; // ISO 8601
}

export interface MyNotificationsResponse {
  cursorId: number | null;
  totalCount: number;
  notifications: MyNotification[];
}
