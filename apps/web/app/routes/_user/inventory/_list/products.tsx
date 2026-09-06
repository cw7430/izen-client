import { ErpTeb } from '~/shared/components/ui/teb';

export default function ProductList() {
  return (
    <>
      <h1 className="text-center">생산</h1>
      <ErpTeb domain="inventory" />
    </>
  );
}
