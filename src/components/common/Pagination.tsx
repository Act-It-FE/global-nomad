import { cn } from '@/utils/cn';
import Icon from './Icon';

export default function Pagination({
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentGroup = Math.floor((currentPage - 1) / 5);
  const firstPage = currentGroup * 5 + 1;
  const lastPage = Math.min(firstPage + 4, totalPages);
  const pageCount = Math.max(0, lastPage - firstPage + 1);

  const pageNumbers = new Array(pageCount).fill(0).map((_, i) => firstPage + i);

  const handlePrevGroup = () => {
    if (firstPage > 1) {
      onPageChange(firstPage - 5);
    }
  };

  const handleNextGroup = () => {
    if (lastPage < totalPages) {
      onPageChange(lastPage + 1);
    }
  };

  return (
    <div className='flex gap-4'>
      <button
        className='flex size-40 items-center justify-center p-8 text-gray-950 disabled:text-gray-300'
        disabled={currentGroup === 0}
        onClick={handlePrevGroup}
      >
        <Icon icon='ChevronLeft' className='size-20' />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={cn(
            'txt-14_M size-40 p-8 leading-24 transition-colors duration-150',
            page === currentPage
              ? 'border-primary-500 border-b-2 text-gray-950'
              : 'text-gray-300 hover:text-gray-500',
          )}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className='flex size-40 items-center justify-center p-8 text-gray-950 disabled:text-gray-300'
        disabled={lastPage === totalPages}
        onClick={handleNextGroup}
      >
        <Icon icon='ChevronRight' className='size-20' />
      </button>
    </div>
  );
}
