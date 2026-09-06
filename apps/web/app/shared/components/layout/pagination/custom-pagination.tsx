import { Link, useLocation, useSearchParams } from 'react-router';
import { Pagination } from 'react-bootstrap';

import type { PageResponseDto } from '~/shared/schemas';

interface Props<T> {
  data: PageResponseDto<T>;
}

export default function CustomPagination<T>({ data }: Props<T>) {
  const { currentPage, endPage, hasNext, hasPrevious, startPage, totalPages } =
    data;

  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      {totalPages > 1 && (
        <Pagination>
          {currentPage > 1 && (
            <Pagination.Item as={Link} to={createPageUrl(1)}>
              «
            </Pagination.Item>
          )}

          {hasPrevious && (
            <Pagination.Item as={Link} to={createPageUrl(startPage - 1)}>
              ‹
            </Pagination.Item>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
            const page = startPage + i;
            return (
              <Pagination.Item
                key={page}
                active={currentPage === page}
                as={Link}
                to={createPageUrl(page)}
              >
                {page}
              </Pagination.Item>
            );
          })}

          {hasNext && (
            <Pagination.Item as={Link} to={createPageUrl(endPage + 1)}>
              ›
            </Pagination.Item>
          )}

          {currentPage < totalPages && (
            <Pagination.Item as={Link} to={createPageUrl(totalPages)}>
              »
            </Pagination.Item>
          )}
        </Pagination>
      )}
    </>
  );
}
