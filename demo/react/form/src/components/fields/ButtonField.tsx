import { ButtonFieldProps } from '@efie-form/react';
import { Button } from '@mui/material';

export default function ButtonField({ label }: ButtonFieldProps) {
  return <Button variant="contained">{label}</Button>;
}
