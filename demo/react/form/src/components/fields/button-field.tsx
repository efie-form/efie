import type { ButtonFieldProps } from '@efie-form/react';
import { Button, Link } from '@mui/material';

export default function ButtonField({ label, onClick, isHyperlink, href, target }: ButtonFieldProps) {
  if (isHyperlink) {
    return (
      <Link
        sx={{
          marginTop: '1rem',
          display: 'block',
        }}
        href={href || '#'}
        target={target || '_self'}
      >
        {label}
      </Link>
    );
  }

  return (
    <Button
      sx={{
        marginTop: '1rem',
        display: 'block',
      }}
      variant="contained"
      type="submit"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
