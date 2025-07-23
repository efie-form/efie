import LeftBar from './layouts/left-bar/left-bar';
import MainSection from './layouts/main-section/main-section';
import RightBar from './layouts/right-bar/right-bar';
import { useSettingsStore } from './lib/state/settings.state';
import { cn } from './lib/utils';
import './styles/output.css';

const FormBuilder = () => {
  const { height } = useSettingsStore();

  return (
    <div
      className={cn('flex w-full', {
        'h-screen': !height,
      })}
      style={{
        height: height ? `${height}px` : undefined,
      }}
    >
      <aside className="w-64 overflow-y-auto bg-neutral-50">
        <LeftBar />
      </aside>
      <main className="flex w-[40rem] flex-1 flex-col bg-primary-50">
        <MainSection />
      </main>
      <aside className="w-[24rem] overflow-y-auto bg-neutral-50">
        <RightBar />
      </aside>
    </div>
  );
};

export default FormBuilder;
