import type { FormBuilderRef } from '@efie-form/react';
import { FormBuilder } from '@efie-form/react';
import { useRef, useState } from 'react';

import { AdminLayout, AdminLayoutMain, MainContent, Sidebar, TopBar } from './components';
import { FORM_INPUTS, MENU_ITEMS } from './constants/menu-items';
import { useFormBuilder } from './hooks/use-form-builder';

function App() {
  const formBuilderRef = useRef<FormBuilderRef>(null);
  const [activeMenuItem, setActiveMenuItem] = useState('form-builder');

  const { schema, height, handleSchemaChange, handleGetSchema, handleSetSchema, handleSaveSchema } =
    useFormBuilder();

  return (
    <AdminLayout>
      <TopBar onSave={() => handleSaveSchema(formBuilderRef)} />

      <AdminLayoutMain>
        <Sidebar
          menuItems={MENU_ITEMS}
          activeMenuItem={activeMenuItem}
          onMenuItemChange={setActiveMenuItem}
          onGetSchema={() => handleGetSchema(formBuilderRef)}
          onSetSchema={() => handleSetSchema(formBuilderRef)}
          hasSchema={!!schema}
        />

        <MainContent activeMenuItem={activeMenuItem} menuItems={MENU_ITEMS}>
          <FormBuilder
            ref={formBuilderRef}
            height={height}
            inputNonReusable={false}
            formKeyNonEditable={false}
            maxHistories={25}
            onSchemaChange={handleSchemaChange}
            iframeSrc="http://localhost:3074"
            formInputs={FORM_INPUTS}
          />
        </MainContent>
      </AdminLayoutMain>
    </AdminLayout>
  );
}

export default App;
