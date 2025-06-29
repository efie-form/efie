import type { ButtonFieldProps } from '@efie-form/react';
import { Button } from '@mui/material';

export default function ButtonField({ content }: ButtonFieldProps) {
  return <Button variant="contained" type="submit">{content}</Button>;
}
