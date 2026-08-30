import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useDialogModalState } from '~/shared/stores';

interface Props {
  redirectTo: string;
}

export default function InvalidUrl({ redirectTo }: Props) {
  const navigate = useNavigate();
  const showModal = useDialogModalState((s) => s.showModal);

  useEffect(() => {
    showModal({
      modal: 'alert',
      title: '잘못된 URL',
      text: 'URL 형식이 잘못되었습니다.',
      handleAfterClose: () => {
        navigate(redirectTo, { replace: true });
      },
    });
  }, []);

  return null;
}
