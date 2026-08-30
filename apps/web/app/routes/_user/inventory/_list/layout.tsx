import { Outlet } from 'react-router';

import { ErpListLayout } from '~/shared/components/layout/erp-list';

export default function InventoryLayout() {
  return (
    <ErpListLayout title="재고관리">
      <Outlet />
    </ErpListLayout>
  );
}
