import { ApiError } from '@repo/shared-api/error';
import {
  resolveContentType,
  resolveQuery,
  resolveBody,
  fetchResponse,
  type ContentType,
} from '@repo/shared-api/fetch';
import { ResponseCode } from '@repo/shared-constants/api';

export type AuthType = 'access' | 'refresh' | 'none';

interface FetchOptions extends RequestInit {
  request?: Request;
  baseUrl?: string;
  authType?: AuthType;
  contentType?: ContentType;
}

const API_URL = process.env.API_URL!;
const API_KEY = process.env.API_KEY!;

const resolveAuthOptions = async (
  request: Request | undefined,
  authType: AuthType,
) => {
  if (authType === 'none') return null;

  if (!request) {
    console.error('Request is required when authType is not "none".');
    throw new ApiError(
      ResponseCode.UNAUTHORIZED.code,
      ResponseCode.UNAUTHORIZED.message,
    );
  }

  const cookieHeader = request.headers.get('Cookie');

  if (!cookieHeader) {
    console.error('The token is not found');
    throw new ApiError(
      ResponseCode.UNAUTHORIZED.code,
      ResponseCode.UNAUTHORIZED.message,
    );
  }

  const cookieKey = authType === 'access' ? 'accessToken' : 'refreshToken';

  const cookies = Object.fromEntries(
    cookieHeader.split(';').map((cookie) => {
      const [key, ...value] = cookie.trim().split('=');
      return [key, value.join('=')];
    }),
  );

  const bearerToken = cookies[cookieKey];

  if (!bearerToken) {
    throw new ApiError(
      ResponseCode.UNAUTHORIZED.code,
      ResponseCode.UNAUTHORIZED.message,
    );
  }

  return bearerToken;
};

const resolveUrl = (input: string, baseUrl: string) => {
  const separator = baseUrl.endsWith('/') || input.startsWith('/') ? '' : '/';

  return `${baseUrl}${separator}${input}`;
};

const serverFetch = async <T>(
  input: string,
  options: FetchOptions = {},
): Promise<T> => {
  const {
    request,
    authType = 'none',
    contentType = 'JSON',
    baseUrl = API_URL,
    ...init
  } = options;

  const bearerToken = resolveAuthOptions(request, authType);
  const contentOptions = resolveContentType(contentType);
  const url = resolveUrl(input, baseUrl);

  const res = await fetch(url, {
    ...init,
    headers: {
      ...(contentOptions && { 'Content-Type': contentOptions }),
      ...(bearerToken && {
        Authorization: `Bearer ${bearerToken}`,
      }),
      'X-API-Key': API_KEY,
      ...init.headers,
    },
  });

  return fetchResponse(res);
};

export const ServerRequest = {
  apiGet: async <T>(
    input: string,
    options?: Omit<FetchOptions, 'contentType'>,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T> => {
    const query = resolveQuery(params);

    return serverFetch<T>(`${input}${query}`, {
      method: 'GET',
      ...options,
    });
  },

  apiPost: async <T, B = unknown>(
    input: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(input, {
      method: 'POST',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPut: async <T, B = unknown>(
    input: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(input, {
      method: 'PUT',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiPatch: async <T, B = unknown>(
    input: string,
    options?: FetchOptions,
    body?: B | FormData,
  ): Promise<T> => {
    return serverFetch<T>(input, {
      method: 'PATCH',
      ...options,
      ...(body !== undefined && {
        body: resolveBody(body, options?.contentType),
      }),
    });
  },

  apiDelete: async <T = void>(
    input: string,
    options?: Omit<FetchOptions, 'contentType'>,
  ): Promise<T> => {
    return serverFetch<T>(input, {
      method: 'DELETE',
      ...options,
    });
  },
};
