import LeftBar from './leftBar/LeftBar.tsx';
import LeftToolbar from './toolbars/LeftToolbar.tsx';
import LayoutSwitcher from './toolbars/LayoutSwitcher.tsx';
import FormContent from './FormContent.tsx';
import RightBar from './rightBar/RightBar.tsx';
import Preview from './toolbars/Preview.tsx';
import DndContext from './Dnd/DndContext.tsx';

function FormBuilder() {
  return (
    <DndContext>
      <div className="flex h-screen w-screen">
        <div className="w-80 bg-neutral-50 overflow-hidden">
          <LeftBar />
        </div>
        <div className="min-w-[40rem] flex-1 bg-primary-50 flex flex-col h-full">
          <div className="h-14 flex justify-between px-4 items-center">
            <LeftToolbar />
            <div className="flex gap-4 items-center">
              <Preview />
              <LayoutSwitcher />
            </div>
          </div>
          <div className="h-full overflow-y-scroll">
            <FormContent />
          </div>
        </div>
        <div className="w-96 bg-neutral-50 overflow-hidden">
          <RightBar />
        </div>
      </div>
    </DndContext>
  );
}

export default FormBuilder;
