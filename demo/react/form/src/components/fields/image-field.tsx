import type { ImageFieldProps } from '@efie-form/react';
import { Box } from '@mui/material';

function ImageField({
  src,
  alt,
}: ImageFieldProps) {
  return (
    <Box
      sx={{
        marginTop: '1rem',
      }}
    >

      <img
        src={src}
        alt={alt}
        width="100%"
        height="auto"
        style={{
          display: 'block',
        }}
      />
    </Box>
  );
}

export default ImageField;
