import type { LogoutRequestDto } from '~/features/auth/schemas';
import { ServerRequest } from '~/shared/api/server';
import { getCookies } from '~/shared/lib/server';
import { createTokenCookies } from './shared.server';

const { apiPost } = ServerRequest;

export const logoutAction = async (request: Request) => {
  const cookies = getCookies(request);
  const refreshToken = cookies?.['refreshToken'];

  if (refreshToken) {
    try {
      const req: LogoutRequestDto = { refreshToken };
      await apiPost<void>('/auth/logout', {}, req);
    } catch (e) {
      console.error('Logout API Error (Ignored):', e);
    }
  }

  const accessTokenCookie = createTokenCookies({ type: 'access' });
  const refreshTokenCookie = createTokenCookies({
    type: 'refresh',
    isAuto: false,
  });

  const headers = new Headers();
  headers.append(
    'Set-Cookie',
    await accessTokenCookie.serialize('', {
      maxAge: 0,
      expires: new Date(0),
    }),
  );
  headers.append(
    'Set-Cookie',
    await refreshTokenCookie.serialize('', {
      maxAge: 0,
      expires: new Date(0),
    }),
  );

  return { headers };
};
