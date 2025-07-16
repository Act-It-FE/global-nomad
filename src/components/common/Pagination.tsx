export default function Pagination(
  currentPage,
  totalCount,
  pageSize,
  onPageChange,
) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const currentGroup = Math.floor((currentPage - 1) / 5);
  const firstPage = currentGroup * 5 + 1;
  const lastPage = Math.min(firstPage + 4, totalPages);

  const pageNumbers = new Array(lastPage - firstPage + 1)
    .fill(0)
    .map((_, i) => firstPage + i);
}
