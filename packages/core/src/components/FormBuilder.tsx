import LeftBar from './leftBar/LeftBar.tsx';
import LeftToolbar from './toolbars/LeftToolbar.tsx';
import LayoutSwitcher from './toolbars/LayoutSwitcher.tsx';
import FormContent from './FormContent.tsx';
import RightBar from './rightBar/RightBar.tsx';

function FormBuilder() {
  return (
    <div className="flex h-screen w-screen">
      <div className="min-w-[20rem] bg-neutral-50 overflow-hidden">
        <LeftBar />
      </div>
      <div className="min-w-[40rem] flex-1 bg-primary-50 overflow-hidden">
        <div className="h-14 flex justify-between px-4 items-center">
          <LeftToolbar />
          <LayoutSwitcher />
        </div>
        <div className="h-full overflow-scroll">
          <FormContent />
        </div>
      </div>
      <div className="w-[20rem] bg-neutral-50 overflow-hidden">
        <div className="h-full overflow-scroll">
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default FormBuilder;
