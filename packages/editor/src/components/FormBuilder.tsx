import { DndProvider } from './dnd-kit';
import LeftBar from './leftBar/LeftBar';
import MainSection from './main-section/MainSection';
import RightBar from './rightBar/RightBar';

const FormBuilder = () => {
  return (
    <DndProvider>
      <div className="flex h-screen w-screen">
        <aside className="w-64 bg-neutral-50 overflow-y-auto">
          <LeftBar />
        </aside>
        <main className="w-[40rem] flex-1 bg-primary-50 flex flex-col">
          <MainSection />
        </main>
        <aside className="w-[24rem] bg-neutral-50 overflow-y-auto">
          <RightBar />
        </aside>
      </div>
    </DndProvider>
  );
};

export default FormBuilder;
