import { ErpTeb } from '~/shared/components/ui/teb';

export default function MovementsList() {
  return (
    <>
      <h1 className="text-center">입출고</h1>
      <ErpTeb domain="inventory" />
    </>
  );
}
