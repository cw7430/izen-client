import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useDialogModalState } from '~/shared/stores';

export default function KeyError() {
  const navigate = useNavigate();
  const showModal = useDialogModalState((s) => s.showModal);

  useEffect(() => {
    showModal({
      modal: 'alert',
      title: 'API KEY 에러',
      text: 'API KEY가 잘못되었습니다. 관리자에게 문의하세요.',
      handleAfterClose: () => {
        navigate('/', { replace: true });
      },
    });
  }, []);

  return null;
}
