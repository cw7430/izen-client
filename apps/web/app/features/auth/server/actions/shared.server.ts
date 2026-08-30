import { createCookie } from 'react-router';
import { ApiError } from '@repo/shared-api/error';
import { ResponseCode } from '@repo/shared-constants/api';

import {
  loginAndRefreshResponseSchemaForServer,
  type LoginAndRefreshResponseDtoForServer,
} from '~/features/auth/schemas';

export const createTokenCookies = (
  options:
    | { type: 'access' }
    | { type: 'refresh'; isAuto: false }
    | { type: 'refresh'; isAuto: boolean; refreshTokenExpiresAtMs: number },
) => {
  if (options.type === 'access') {
    return createCookie('accessToken', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
    });
  }

  const refreshMaxAge = options.isAuto
    ? Math.max(
        0,
        Math.floor((options.refreshTokenExpiresAtMs - Date.now()) / 1000),
      )
    : undefined;

  return createCookie('refreshToken', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    ...(refreshMaxAge !== undefined && { maxAge: refreshMaxAge }),
  });
};

export const loginAndRefresh = async (
  res: LoginAndRefreshResponseDtoForServer,
) => {
  const validation = loginAndRefreshResponseSchemaForServer.safeParse(res);

  if (!validation.success) {
    console.error('Parse Error: ', validation.error.message);
    throw new ApiError(
      ResponseCode.INTERNAL_SERVER_ERROR.code,
      ResponseCode.INTERNAL_SERVER_ERROR.message,
    );
  }

  const result = validation.data;

  const accessTokenCookie = createTokenCookies({ type: 'access' });

  const refreshTokenCookie = createTokenCookies({
    type: 'refresh',
    isAuto: result.isAuto,
    refreshTokenExpiresAtMs: result.refreshTokenExpiresAtMs,
  });

  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    await accessTokenCookie.serialize(result.accessToken),
  );
  headers.append(
    'Set-Cookie',
    await refreshTokenCookie.serialize(result.refreshToken),
  );

  const {
    refreshToken: _refreshToken,
    refreshTokenExpiresAtMs: _refreshTokenExpiresAtMs,
    isAuto: _isAuto,
    accessToken: _accessToken,
    ...clientData
  } = result;

  return clientData;
};
