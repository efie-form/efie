import LeftToolbar from './toolbars/LeftToolbar';
import Preview from './toolbars/Preview';
import LayoutSwitcher from './toolbars/LayoutSwitcher';
import FormContent from './FormContent';
import ViewSchema from './toolbars/ViewSchema';

export default function MainSection() {
  return (
    <>
      <header className="h-14 flex justify-between px-4 items-center relative z-50 bg-white">
        <LeftToolbar />
        <div className="flex items-center gap-4">
          <ViewSchema />
          <Preview />
          <LayoutSwitcher />
        </div>
      </header>
      <div id="form-zone" className="flex-1 overflow-y-auto">
        <FormContent />
      </div>
    </>
  );
}
