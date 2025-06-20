import LeftToolbar from './toolbars/left-toolbar';
import LayoutSwitcher from './toolbars/layout-switcher';
import FormContent from './content-mode/form-content';
import ModeSwitcher from './toolbars/mode-switcher';
import { useSettingsStore } from '../../lib/state/settings.state';
import FormJson from './content-mode/form-json';
import FormPreview from './content-mode/form-preview';

export default function MainSection() {
  const { mode } = useSettingsStore();
  return (
    <>
      <header className="h-14 flex justify-between px-4 items-center relative z-50 bg-white">
        <LeftToolbar />
        <div className="flex items-center gap-4">
          <ModeSwitcher />
          <LayoutSwitcher />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        {mode === 'edit' && <FormContent />}
        {mode === 'json' && <FormJson />}
        {mode == 'preview' && <FormPreview />}
      </div>
    </>
  );
}
