export interface MyNotify {
  cursorId: number | null;
  totalCount: number;
  notifications: MyNotification[];
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
