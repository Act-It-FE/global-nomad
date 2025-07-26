import { ActivityBasic } from '@/types/MyActivities';
import { cn } from '@/utils/cn';

export default function MyExperience({}: { data: ActivityBasic }) {
  return (
    <article
      className={cn(
        'flex justify-between gap-22 lg:items-center',
        'rounded-3xl p-24 lg:p-30',
        'card-shadow bg-white',
      )}
    />
  );
}
