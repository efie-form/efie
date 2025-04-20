import type { ButtonFieldProps } from '@efie-form/react';
import { Button } from '@mui/material';

export default function ButtonField({ buttonLabel }: ButtonFieldProps) {
  return <Button variant="contained">{buttonLabel}</Button>;
}
