import { Button } from 'react-bootstrap';
import { type ButtonVariant } from 'react-bootstrap/esm/types';

import { useModalState } from '~/shared/stores';
import { useAuthStore } from '~/features/auth/stores';

interface Props {
  variant?: ButtonVariant;
  className?: string;
  allowedProfileTeams?: string[];
  modalKey: string;
  name: string;
}

export default function ShowModalButton({
  variant = 'primary',
  className,
  allowedProfileTeams,
  modalKey,
  name,
}: Props) {
  const showModal = useModalState((s) => s.showModal);
  const team = useAuthStore((s) => s.team);
  const isPermitted =
    !allowedProfileTeams || (team ? allowedProfileTeams.includes(team) : false);

  const onClick = () => {
    showModal(modalKey);
  };

  return (
    isPermitted && (
      <Button variant={variant} onClick={onClick} className={className}>
        {name}
      </Button>
    )
  );
}
