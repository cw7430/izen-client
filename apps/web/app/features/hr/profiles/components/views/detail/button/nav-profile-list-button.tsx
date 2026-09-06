import { useNavigate, useSearchParams } from 'react-router';
import { Button } from 'react-bootstrap';

export default function NavProfileListButton() {
  const defaultRedirectTo = `/hr/profiles`;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get('redirect');

  const redirectTo =
    redirect && redirect.startsWith('/') ? redirect : defaultRedirectTo;

  const onClick = () => {
    navigate(redirectTo);
  };

  return (
    <Button variant="secondary" onClick={onClick}>
      목록으로
    </Button>
  );
}
