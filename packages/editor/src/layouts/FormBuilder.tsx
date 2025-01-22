import { DndProvider } from '../components/dnd-kit';
import { cn } from '../lib/utils';
import LeftBar from './left-bar/LeftBar';
import MainSection from './main-section/MainSection';
import RightBar from './right-bar/RightBar';

interface FormBuilderProps {
  height?: number;
}

const FormBuilder = ({ height }: FormBuilderProps) => {
  return (
    <DndProvider>
      <div
        className={cn('flex w-full', {
          'h-screen': !height,
        })}
        style={{
          height: height ? `${height}px` : undefined,
        }}
      >
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
