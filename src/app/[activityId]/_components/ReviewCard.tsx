import { Review } from '@/api/types/Activities';

type Props = {
  review: Review;
};

export default function ReviewCard({ review }: Props) {
  return (
    <div>
      <div>{review.user.nickname}</div>
      <div>{review.createdAt}</div>
      <div>{review.content}</div>
    </div>
  );
}
