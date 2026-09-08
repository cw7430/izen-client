import type {
  LoginRequestDto,
  LoginAndRefreshResponseDtoForServer,
} from '~/features/auth/schemas';
import { ServerRequest } from '~/shared/api/server';
import { loginAndRefresh } from './shared.server';

const { apiPost } = ServerRequest;

export const login = async (body: LoginRequestDto) => {
  const res = await apiPost<LoginAndRefreshResponseDtoForServer>(
    '/auth/login',
    {},
    body,
  );

  return loginAndRefresh(res);
};
