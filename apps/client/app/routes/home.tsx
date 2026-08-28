import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Izen' },
    { name: 'description', content: 'Izen 사내 관리 시스템' },
  ];
}

export default function Home() {
  return (
    <div>
      <div>환영합니다.</div>
    </div>
  );
}
