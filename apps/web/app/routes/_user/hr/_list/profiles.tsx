import { inspect } from 'util';
import { ApiError } from '@repo/shared-api/error';

import type { Route } from './+types/profiles';
import { getProfileList } from '~/features/hr/profiles/server/loaders';
import { ErpTeb } from '~/shared/components/ui/teb';
import {
  InternalServerError,
  KeyError,
  InvalidUrl,
  Unauthorized,
} from '~/shared/components/layout/errors';
import { ResponseCode } from '@repo/shared-constants/api';

type SortPath = 'EMPLOYEE' | 'POSITION' | 'DEPARTMENT';
type SortOrder = 'ASC' | 'DESC';

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { searchParams } = new URL(request.url);
  const rawPage = searchParams.get('page');
  const rawSortPath = searchParams.get('sortPath');
  const rawSortOrder = searchParams.get('sortOrder');

  const page = Number(rawPage ?? '1');

  const params = {
    page: Number.isInteger(page) && page > 0 ? page : 1,
    sortPath: (['POSITION', 'DEPARTMENT'].includes(rawSortPath ?? '')
      ? rawSortPath
      : 'EMPLOYEE') as SortPath,
    sortOrder: (rawSortOrder === 'DESC' ? 'DESC' : 'ASC') as SortOrder,
    size: 5,
    blockSize: 5,
  };

  const profiles = await getProfileList(request, params);

  return {
    profiles,
    params,
  };
};

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const REDIRECT_TO = `/hr/profiles`;

  if (error instanceof ApiError) {
    if (
      error.code === ResponseCode.UNAUTHORIZED.code ||
      error.code === ResponseCode.EXPIRED_TOKEN.code ||
      error.code === ResponseCode.INVALID_TOKEN.code
    ) {
      return <Unauthorized />;
    }

    if (error.code === ResponseCode.KEY_ERROR.code) {
      return <KeyError />;
    }

    if (
      error.code === ResponseCode.VALIDATION_ERROR.code ||
      error.code === ResponseCode.RESOURCE_NOT_FOUND.code
    ) {
      return <InvalidUrl redirectTo={REDIRECT_TO} />;
    }
  }

  return <InternalServerError />;
}

export default function Profiles({ loaderData }: Route.ComponentProps) {
  return (
    <>
      <h1 className="text-center">직원</h1>
      <ErpTeb domain="hr" />
      <div>
        <pre>{inspect(loaderData.profiles, { depth: null })}</pre>
      </div>
    </>
  );
}
