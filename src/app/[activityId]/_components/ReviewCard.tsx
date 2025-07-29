import { Review } from '@/api/types/activities';
import Icon from '@/components/Icon';

type Props = {
  review: Review;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
}

export default function ReviewCard({ review }: Props) {
  return (
    <div className='w-full rounded-[24px] bg-white p-20 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'>
      <div className='txt-16_B leading-19'>
        {review.user.nickname}
        <span className='txt-14_M ml-6 leading-17 text-gray-400'>
          {formatDate(review.createdAt)}
        </span>
        <div className='mt-2 mb-10 flex gap-1'>
          <span className='sr-only'>{review.rating}점 (5점 만점)</span>
          {[1, 2, 3, 4, 5].map((i) => (
            <Icon
              key={i}
              aria-hidden='true'
              className={
                i <= review.rating
                  ? 'h-16 w-16 fill-yellow-400'
                  : 'h-16 w-16 fill-gray-300'
              }
              icon='Star'
            />
          ))}
        </div>
      </div>
      <div className='sm:txt-16_M text-14_M text-gray-950'>
        {review.content}
      </div>
    </div>
  );
}
