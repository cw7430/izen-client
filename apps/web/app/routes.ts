import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/_user/layout.tsx', [index('routes/_user/home.tsx')]),
  layout('routes/_guest/layout.tsx', [
    route('login', 'routes/_guest/login.tsx'),
  ]),
] satisfies RouteConfig;
