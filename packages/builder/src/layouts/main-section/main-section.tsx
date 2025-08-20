import { autoScrollForElements } from '@atlaskit/pragmatic-drag-and-drop-auto-scroll/element';
import { useEffect, useRef } from 'react';
import invariant from 'tiny-invariant';
import { useSettingsStore } from '../../lib/state/settings.state';
import FormConditions from './content-mode/form-conditions/form-conditions';
import FormContent from './content-mode/form-content';
import FormJson from './content-mode/form-json';
import FormPreview from './content-mode/form-preview';
import LayoutSwitcher from './toolbars/layout-switcher';
import LeftToolbar from './toolbars/left-toolbar';
import ModeSwitcher from './toolbars/mode-switcher';

export default function MainSection() {
  const { mode } = useSettingsStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;

    invariant(element, 'Form content element is not defined');

    return autoScrollForElements({
      element,
    });
  }, []);

  return (
    <>
      <header className="relative z-50 flex h-14 items-center justify-between bg-white px-4">
        <LeftToolbar />
        <div className="flex items-center gap-4">
          <ModeSwitcher />
          <LayoutSwitcher />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto" ref={ref}>
        {mode === 'edit' && <FormContent />}
        {mode === 'json' && <FormJson />}
        {mode === 'preview' && <FormPreview />}
        {mode === 'conditions' && <FormConditions />}
      </div>
    </>
  );
}
