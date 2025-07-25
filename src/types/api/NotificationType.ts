export interface MyNotify {
  cursorId: number | null;
  totalCount: number;
  reservations: MyNotification[];
}

export interface MyNotification {
  id: number;
  teamId: string;
  userId: number;
  content: string;
  cratedAt: string; // ISO 8601
  updatedAt: string; // ISO 8601
  deletedAt: string | null; // ISO 8601
}
