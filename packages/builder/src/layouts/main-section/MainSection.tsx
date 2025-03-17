import LeftToolbar from './toolbars/LeftToolbar';
import LayoutSwitcher from './toolbars/LayoutSwitcher';
import FormContent from './content-mode/FormContent';
import ModeSwitcher from './toolbars/ModeSwitcher';
import { useSettingsStore } from '../../lib/state/settings.state';
import FormJson from './content-mode/FormJson';
import FormPreview from './content-mode/FormPreview';

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
