import { ServerRequest } from '~/shared/api/server';
import type {
  CreateProfileRequestDto,
  UpdateProfileRequestDto,
} from '~/features/hr/profiles/schemas';

const { apiPost, apiPatch } = ServerRequest;

const BASE_URL = '/hr/profiles';

export const createProfile = async (
  body: CreateProfileRequestDto,
  request: Request,
) => {
  await apiPost<CreateProfileRequestDto>(
    BASE_URL,
    { request, authType: 'access' },
    body,
  );
};

export const updateProfile = async (
  body: UpdateProfileRequestDto,
  request: Request,
  id: string,
) => {
  await apiPatch<UpdateProfileRequestDto>(
    `${BASE_URL}/${id}`,
    { request, authType: 'access' },
    body,
  );
};
