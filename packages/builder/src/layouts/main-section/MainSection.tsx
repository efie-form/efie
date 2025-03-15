import LeftToolbar from './toolbars/LeftToolbar';
import LayoutSwitcher from './toolbars/LayoutSwitcher';
import FormContent from './FormContent';
import ModeSwitcher from './toolbars/ModeSwitcher';

export default function MainSection() {
  return (
    <>
      <header className="h-14 flex justify-between px-4 items-center relative z-50 bg-white">
        <LeftToolbar />
        <div className="flex items-center gap-4">
          <ModeSwitcher />
          <LayoutSwitcher />
        </div>
      </header>
      <div id="form-zone" className="flex-1 overflow-y-auto">
        <FormContent />
      </div>
    </>
  );
}
