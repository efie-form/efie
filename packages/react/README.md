# @efie-form/react

[![Version](https://img.shields.io/npm/v/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)
[![License](https://img.shields.io/npm/l/@efie-form/react.svg?style=flat-square)](https://npmjs.com/package/@efie-form/react)

This package is part of [efie-form](https://npmjs.com/package/efie-form), a form library for building forms with Drag &
Drop.

## Installation

```bash
# With npm
$ npm install @efie-form/react

# With yarn
$ yarn add @efie-form/react

# With pnpm
$ pnpm add @efie-form/react
```

## Usage

To render the form builder to your page:

```tsx
import { useState } from 'react';
import { FormSchema, FormBuilder, FormBuilderOptions$$ } from '@efie-form/core';

const App = () => {
  const ref = useRef<FormBuilderRef>(null);
  const options: FormBuilderOptions = {
    // customize options here
  };
  // load value from your database

  const handleSave = () => {
    const editor = ref.current?.getEditor();

    const schema = editor?.getSchema();
    console.log(schema);
    // save schema to your database
  };

  const onReady = () => {
    // form builder is loaded and ready to use
    // you can load the schema from your database here

    const schema = {
      // your schema
    };
    ref.current?.loadSchema(schema);
  };

  return (
    <>
      <button onClick={handleSave}>Save</button>

      <FormBuilder ref={ref} onReady={onReady} options={options} />
    </>
  );
};
```

## Properties

| Name      | Description                                                                                                     | Type                        | Default |
| --------- | --------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- |
| `ref`     | (Required) The ref to the form builder                                                                          | `RefObject<FormBuilderRef>` | -       |
| `onReady` | (Optional) Function called when the form builder is loaded and ready to use                                     | `(editor: Editor) => void`  | -       |
| `height`  | (Optional) The height of the form builder in pixels, the form builder will fit to parent height if not provided | `number`                    | -       |
| `options` | (Optional) Customize available options for the form builder                                                     | `string[]`                  | -       |

## API

`loadSchema(schema: FormSchema)`

Load the schema to the form builder.

`getSchema()`

Get the schema from the form builder.

## Options

`options`

Customize available options for the form builder.

`options.inputFields`

Customize available input fields with custom label & field name.

`options.hiddenFields`

Hide available fields from the form builder.
