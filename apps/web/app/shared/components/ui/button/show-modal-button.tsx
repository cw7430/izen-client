import { Button } from 'react-bootstrap';
import { type ButtonVariant } from 'react-bootstrap/esm/types';

import { useModalState } from '~/shared/stores';

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
  modalKey,
  name,
}: Props) {
  const showModal = useModalState((s) => s.showModal);

  const onClick = () => {
    showModal(modalKey);
  };

  return (
    <Button variant={variant} onClick={onClick} className={className}>
      {name}
    </Button>
  );
}
