import LeftToolbar from './toolbars/LeftToolbar';
import Preview from './toolbars/Preview';
import LayoutSwitcher from './toolbars/LayoutSwitcher';
import FormContent from './FormContent';

export default function MainSection() {
  return (
    <>
      <header className="h-14 flex justify-between px-4 items-center">
        <LeftToolbar />
        <div className="flex items-center gap-4">
          <Preview />
          <LayoutSwitcher />
        </div>
      </header>
      <div className="flex-1 overflow-y-auto">
        <FormContent />
      </div>
    </>
  );
}
