const ALL_KEY = 'auth';

export const AUTH_KEYS = {
  all: [ALL_KEY],
  login: [ALL_KEY, 'login'],
  logout: [ALL_KEY, 'logout'],
  refresh: [ALL_KEY, 'refresh'],
} as const;
