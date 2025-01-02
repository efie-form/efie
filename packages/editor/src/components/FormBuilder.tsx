import { DndProvider } from './dnd-kit';
import FormContent from './FormContent';
import LeftBar from './leftBar/LeftBar';
import RightBar from './rightBar/RightBar';
import LayoutSwitcher from './toolbars/LayoutSwitcher';
import LeftToolbar from './toolbars/LeftToolbar';
import Preview from './toolbars/Preview';

const FormBuilder = () => {
  return (
    <DndProvider>
      <div className="flex h-screen w-screen">
        <aside className="w-64 bg-neutral-50 overflow-y-auto">
          <LeftBar />
        </aside>
        <main className="w-[40rem] flex-1 bg-primary-50 flex flex-col">
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
        </main>
        <aside className="w-[24rem] bg-neutral-50 overflow-y-auto">
          <RightBar />
        </aside>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
