import type {
  RefreshRequestDto,
  LoginAndRefreshResponseDtoForServer,
} from '~/features/auth/schemas';
import { ServerRequest } from '~/shared/api/server';
import { loginAndRefresh } from './shared.server';

const { apiPost } = ServerRequest;

export const refreshAction = async (req: RefreshRequestDto) => {
  const res = await apiPost<LoginAndRefreshResponseDtoForServer>(
    '/auth/refresh',
    { authType: 'refresh' },
    req,
  );

  return loginAndRefresh(res);
};
