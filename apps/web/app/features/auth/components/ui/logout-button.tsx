import { useEffect } from 'react';
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useFetcher,
} from 'react-router';
import { Button } from 'react-bootstrap';

import type { action } from '~/routes/_api/logout';
import { useAuthStore } from '~/features/auth/stores';

export default function LogoutButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
  const fetcher = useFetcher<typeof action>();

  const logout = useAuthStore((s) => s.logout);

  const onClick = () => {
    fetcher.submit({}, { method: 'post', action: '/logout' });
  };

  useEffect(() => {
    const res = fetcher.data;

    if (!res) return;

    logout();
    navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, {
      replace: true,
    });
  }, [fetcher.data, logout, navigate, currentPath]);

  const isPending = fetcher.state !== 'idle';

  return (
    <Button
      variant="outline-light"
      type="button"
      onClick={onClick}
      disabled={isPending}
    >
      로그아웃
    </Button>
  );
}
