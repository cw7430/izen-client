import { ApiError } from '@repo/shared-api/error';
import { ResponseCode } from '@repo/shared-constants/api';

import { ServerRequest } from '~/shared/api/server';
import {
  profileDetailResponseSchema,
  profileListResponseSchema,
  type ProfileListRequestDto,
  type ProfileDetailResponseDto,
  type ProfileListResponseDto,
} from '~/features/hr/profiles/schemas';

const { apiGet } = ServerRequest;

export const getProfileList = async (
  request: Request,
  param: ProfileListRequestDto,
) => {
  const res = await apiGet<ProfileListResponseDto>(
    '/hr/profiles',
    { request, authType: 'access' },
    param,
  );

  const validation = profileListResponseSchema.safeParse(res);

  if (!validation.success) {
    console.error('Parse Error: ', validation.error.message);
    console.error('Parse Data: ', JSON.stringify(res, null, 2));
    throw new ApiError(
      ResponseCode.INTERNAL_SERVER_ERROR.code,
      ResponseCode.INTERNAL_SERVER_ERROR.message,
    );
  }

  return validation.data;
};

export const getProfile = async (request: Request, id: string) => {
  const res = await apiGet<ProfileDetailResponseDto>(`/hr/profiles/${id}`, {
    request,
    authType: 'access',
  });

  const validation = profileDetailResponseSchema.safeParse(res);

  if (!validation.success) {
    console.error('Parse Error: ', validation.error.message);
    throw new ApiError(
      ResponseCode.INTERNAL_SERVER_ERROR.code,
      ResponseCode.INTERNAL_SERVER_ERROR.message,
    );
  }

  return validation.data;
};
