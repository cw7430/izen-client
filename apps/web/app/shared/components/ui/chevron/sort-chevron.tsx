import { useNavigate, useLocation, useSearchParams } from 'react-router';
import { ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';

import styles from './sort-chevron.module.css';

interface Props {
  sortPathParam: string;
  sortPath: string;
  sortOrderParam: 'ASC' | 'DESC';
}

export default function SortChevron({
  sortPathParam,
  sortPath,
  sortOrderParam,
}: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const isAscending = sortPathParam === sortPath && sortOrderParam === 'ASC';
  const isDescending = sortPathParam === sortPath && sortOrderParam === 'DESC';

  const createPageUrl = (searchPath: string, sortOrder: 'ASC' | 'DESC') => {
    const params = new URLSearchParams(searchParams);

    params.set('page', '1');
    params.set('sortPath', searchPath);
    params.set('sortOrder', sortOrder);

    return `${pathname}?${params.toString()}`;
  };

  return (
    <span className="p-1">
      <ChevronUp
        onClick={() => {
          if (!isAscending) {
            navigate(createPageUrl(sortPath, 'ASC'));
          }
        }}
        className={clsx(styles['sort-icon'], isAscending && styles.active)}
      />
      <ChevronDown
        onClick={() => {
          if (!isDescending) {
            navigate(createPageUrl(sortPath, 'DESC'));
          }
        }}
        className={clsx(styles['sort-icon'], isDescending && styles.active)}
      />
    </span>
  );
}
