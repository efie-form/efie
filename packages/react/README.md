# @efie-form/react

[![Version](https://img.shields.io/npm/v/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)
[![License](https://img.shields.io/npm/l/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)

This package is part of [efie-form](https://npmjs.com/package/efie-form), a form library for building forms with Drag &
Drop.

## Installation

```bash
$ npm install @efie-form/react
```

## Usage

```jsx
import { FormBuilder } from '@efie-form/react';

const App = () => {
  const [value, setValue] = useState({});

  return (
    <FormBuilder
      value={value}
      onChange={setValue}
    />
  );
};
```
