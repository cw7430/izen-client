import { ErpTeb } from '~/shared/components/ui/teb';

export default function Products() {
  return (
    <>
      <h1 className="text-center">생산</h1>
      <ErpTeb domain="inventory" />
    </>
  );
}
