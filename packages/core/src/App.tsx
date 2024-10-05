import LeftToolbar from './components/toolbars/LeftToolbar.tsx';
import LayoutSwitcher from './components/toolbars/LayoutSwitcher.tsx';
import Sidebar from './components/sidebar/Sidebar.tsx';

function App() {
  return (
    <div className="flex h-screen w-screen">
      <div className="min-w-[20rem] bg-neutral-50 overflow-hidden">
        <Sidebar />
      </div>
      <div className="min-w-[40rem] flex-1 bg-primary-50 overflow-hidden">
        <div className="h-14 flex justify-between px-4 items-center">
          <LeftToolbar />
          <LayoutSwitcher />
        </div>
        <div className="h-full overflow-scroll">
          <div className="" />
        </div>
      </div>
      <div className="min-w-[20rem] bg-neutral-50 overflow-hidden">
        <div className="h-full overflow-scroll">
          <div className=""></div>
        </div>
      </div>
    </div>
  );
}

export default App;
