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
      onPageChange(firstPage - 1);
    }
  };

  const handleNextGroup = () => {
    if (lastPage < totalPages) {
      onPageChange(lastPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePrevGroup}>
        <Icon icon='ChevronLeft' />
      </button>

      {pageNumbers.map((page) => (
        <button key={page} onClick={() => onPageChange(page)}>
          {page}
        </button>
      ))}

      <button onClick={handleNextGroup}>
        <Icon icon='ChevronRight' />
      </button>
    </div>
  );
}
