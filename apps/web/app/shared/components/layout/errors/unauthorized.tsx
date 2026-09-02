import { useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router';

import { useAuthStore } from '~/features/auth/stores';
import { useDialogModalState } from '~/shared/stores';

export default function Unauthorized() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;

  const showModal = useDialogModalState((s) => s.showModal);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    showModal({
      modal: 'alert',
      title: '로그인',
      text: '로그인이 필요한 서비스입니다.',
      handleAfterClose: () => {
        logout();
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, {
          replace: true,
        });
      },
    });
  }, [currentPath, logout, showModal, navigate]);

  return null;
}
