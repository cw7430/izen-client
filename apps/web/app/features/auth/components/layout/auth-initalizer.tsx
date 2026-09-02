import { useCallback, useEffect, useRef } from 'react';
import {
  useNavigate,
  useSearchParams,
  useLocation,
  useFetcher,
} from 'react-router';
import { useShallow } from 'zustand/shallow';

import type { action } from '~/routes/_api/refresh';
import { useAppConfigStore, useDialogModalState } from '~/shared/stores';
import { useAuthStore, validateAuthIntegrity } from '~/features/auth/stores';

interface Props {
  hasAccessToken: boolean;
}

export default function AuthInitalizer({ hasAccessToken }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const currentPath = queryString ? `${pathname}?${queryString}` : pathname;
  const fetcher = useFetcher<typeof action>();

  const isAutoLogin = useAppConfigStore((s) => s.isAutoLogin);
  const showModal = useDialogModalState((s) => s.showModal);
  const { isLoggedIn, logout, login, hasHydrated } = useAuthStore(
    useShallow((s) => ({
      isLoggedIn: validateAuthIntegrity(s),
      logout: s.logout,
      login: s.login,
      hasHydrated: s.hasHydrated,
    })),
  );

  const handleRefresh = useCallback(() => {
    fetcher.submit(
      { isAuto: String(isAutoLogin) },
      { method: 'post', action: '/refresh' },
    );
  }, [fetcher, isAutoLogin]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearRefreshTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const handleAuthFailure = useCallback(() => {
    logout();
    clearRefreshTimer();
    showModal({
      modal: 'alert',
      title: '세션만료',
      text: '세션이 만료되었습니다. 로그아웃합니다.',
      handleAfterClose: () => {
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, {
          replace: true,
        });
      },
    });
  }, [logout, clearRefreshTimer, showModal, navigate, currentPath]);

  const handleServerError = useCallback(() => {
    logout();
    clearRefreshTimer();
    showModal({
      modal: 'alert',
      title: '서버에러',
      text: '서버 문제가 발생하였습니다.',
      handleAfterClose: () => {
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, {
          replace: true,
        });
      },
    });
  }, [logout, clearRefreshTimer, showModal, navigate, currentPath]);

  const handleKeyError = useCallback(() => {
    logout();
    clearRefreshTimer();
    showModal({
      modal: 'alert',
      title: 'API KEY 에러',
      text: 'API KEY가 잘못되었습니다. 관리자에게 문의하세요.',
      handleAfterClose: () => {
        navigate(`/login?redirect=${encodeURIComponent(currentPath)}`, {
          replace: true,
        });
      },
    });
  }, [logout, clearRefreshTimer, showModal, navigate, currentPath]);

  const scheduleRefresh = useCallback(
    (expiresAt: number) => {
      clearRefreshTimer();

      const now = Date.now();
      const timeUntilRefresh = Math.max(0, expiresAt - now - 2 * 60 * 1000);

      timerRef.current = setTimeout(() => {
        handleRefresh();
      }, timeUntilRefresh);
    },
    [handleRefresh, clearRefreshTimer],
  );

  const recoverAuth = useCallback(() => {
    const { accessTokenExpiresAtMs } = useAuthStore.getState();

    if (hasAccessToken && accessTokenExpiresAtMs && isLoggedIn) {
      scheduleRefresh(accessTokenExpiresAtMs);
      return;
    }

    handleRefresh();
  }, [scheduleRefresh, isLoggedIn, hasAccessToken, handleRefresh]);

  useEffect(() => {
    const res = fetcher.data;

    if (!res) return;

    if (res.success) {
      login(res.data);
      scheduleRefresh(res.data.accessTokenExpiresAtMs);
    } else {
      switch (res.code) {
        case 'UA':
        case 'IT':
        case 'ET':
          handleAuthFailure();
          break;
        case 'KE':
          handleKeyError();
          break;
        default:
          handleServerError();
      }
    }
  }, [
    fetcher.data,
    login,
    navigate,
    handleAuthFailure,
    handleKeyError,
    handleServerError,
    scheduleRefresh,
  ]);

  useEffect(() => {
    if (!hasHydrated || !isLoggedIn) return;

    recoverAuth();

    return () => clearRefreshTimer();
  }, [hasHydrated, recoverAuth, clearRefreshTimer, isLoggedIn]);

  return null;
}
