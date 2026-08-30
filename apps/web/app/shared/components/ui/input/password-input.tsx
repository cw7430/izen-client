import { useState, type ComponentPropsWithoutRef } from 'react';
import { Form } from 'react-bootstrap';
import { Eye, EyeOff } from 'lucide-react';

import styles from './password-input.module.css';

type OriginalProps = ComponentPropsWithoutRef<typeof Form.Control>;

interface Props extends Omit<OriginalProps, 'type'> {
  errorMessage?: string;
  successMessage?: string;
}

export default function PasswordInput({
  errorMessage,
  successMessage,
  ...props
}: Props) {
  const [type, setType] = useState<'password' | 'text'>('password');

  const onClick = () => {
    setType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Form.Control type={type} {...props} />
        <button
          type="button"
          className={styles['password-btn']}
          onClick={onClick}
          aria-label={type === 'password' ? 'Hide Password' : 'Show Password'}
        >
          {type === 'text' ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {successMessage && (
        <Form.Control.Feedback type="valid" className="d-block">
          {successMessage}
        </Form.Control.Feedback>
      )}
      {errorMessage && (
        <Form.Control.Feedback type="invalid" className="d-block">
          {errorMessage}
        </Form.Control.Feedback>
      )}
    </>
  );
}
