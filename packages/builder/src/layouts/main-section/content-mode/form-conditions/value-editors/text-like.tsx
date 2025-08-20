import type { Operator } from '@efie-form/core';
import { Input } from '../../../../../components/form';

interface Props {
  value: unknown;
  onChange: (v: unknown) => void;
  operator?: Operator;
}

const TextLikeValueEditor = ({ value, onChange, operator }: Props) => {
  const isListOp =
    (operator as string) === 'email_domain_in' ||
    (operator as string) === 'email_domain_not_in' ||
    (operator as string) === 'phone_country_in' ||
    (operator as string) === 'phone_country_not_in';

  return (
    <Input
      value={typeof value === 'string' ? value : ''}
      onChange={onChange}
      placeholder={isListOp ? 'Comma-separated list (e.g. example.com, test.org)' : 'Compare value'}
    />
  );
};

export default TextLikeValueEditor;
