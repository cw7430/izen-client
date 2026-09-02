import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useDialogModalState } from '~/shared/stores';

export default function InternalServerError() {
  const navigate = useNavigate();
  const showModal = useDialogModalState((s) => s.showModal);

  useEffect(() => {
    showModal({
      modal: 'alert',
      title: '서버 에러',
      text: '서버 문제가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      handleAfterClose: () => {
        navigate('/', { replace: true });
      },
    });
  }, [navigate, showModal]);

  return null;
}
