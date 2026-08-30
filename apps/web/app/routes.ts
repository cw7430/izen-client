import {
  type RouteConfig,
  index,
  layout,
  route,
} from '@react-router/dev/routes';

export default [
  layout('routes/_guest/layout.tsx', [
    route('login', 'routes/_guest/login.tsx'),
  ]),
  layout('routes/_user/layout.tsx', [
    index('routes/_user/home.tsx'),
    layout('routes/_user/hr/_list/layout.tsx', [
      route('hr/profiles', 'routes/_user/hr/_list/profiles.tsx'),
      route('hr/attendance', 'routes/_user/hr/_list/attendance.tsx'),
      route('hr/payroll', 'routes/_user/hr/_list/payroll.tsx'),
    ]),
    layout('routes/_user/inventory/_list/layout.tsx', [
      route('inventory/stock', 'routes/_user/inventory/_list/stock.tsx'),
      route('inventory/products', 'routes/_user/inventory/_list/products.tsx'),
      route(
        'inventory/movements',
        'routes/_user/inventory/_list/movements.tsx',
      ),
    ]),
    layout('routes/_user/sales/_list/layout.tsx', [
      route('sales/payments', 'routes/_user/sales/_list/payments.tsx'),
      route('sales/records', 'routes/_user/sales/_list/records.tsx'),
    ]),
  ]),
] satisfies RouteConfig;
