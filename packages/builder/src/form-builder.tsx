import { ResizeHandle } from './components/resize-handle';
import LeftBar from './layouts/left-bar/left-bar';
import MainSection from './layouts/main-section/main-section';
import RightBar from './layouts/right-bar/right-bar';
import { useSettingsStore } from './lib/state/settings.state';
import { cn } from './lib/utils';
import './styles/output.css';

const FormBuilder = () => {
  const { height, leftBarWidth, rightBarWidth, setLeftBarWidth, setRightBarWidth } =
    useSettingsStore();

  const handleLeftBarResize = (delta: number) => {
    const newWidth = leftBarWidth + delta;
    // Apply constraints: min 200px, max 500px
    const constrainedWidth = Math.max(200, Math.min(500, newWidth));
    if (constrainedWidth !== leftBarWidth) {
      setLeftBarWidth(constrainedWidth);
    }
  };

  const handleRightBarResize = (delta: number) => {
    const newWidth = rightBarWidth - delta; // Subtract because we're resizing from the left edge
    // Apply constraints: min 200px, max 500px
    const constrainedWidth = Math.max(200, Math.min(500, newWidth));
    if (constrainedWidth !== rightBarWidth) {
      setRightBarWidth(constrainedWidth);
    }
  };

  return (
    <div
      className={cn('flex w-full', {
        'h-screen': !height,
      })}
      style={{
        height: height ? `${height}px` : undefined,
      }}
    >
      <aside className="overflow-y-auto bg-neutral-50" style={{ width: `${leftBarWidth}px` }}>
        <LeftBar />
      </aside>

      <ResizeHandle orientation="vertical" onResize={handleLeftBarResize} />

      <main className="flex flex-1 flex-col bg-primary-50 min-w-0">
        <MainSection />
      </main>

      <ResizeHandle orientation="vertical" onResize={handleRightBarResize} />

      <aside className="overflow-y-auto bg-neutral-50" style={{ width: `${rightBarWidth}px` }}>
        <RightBar />
      </aside>
    </div>
  );
};

export default FormBuilder;
