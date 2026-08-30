import { ErpTeb } from '~/shared/components/ui/teb';

export default function Stock() {
  return (
    <>
      <h1 className="text-center">재고</h1>
      <ErpTeb domain="inventory" />
    </>
  );
}
