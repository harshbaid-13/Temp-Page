import { Outlet } from "react-router";
import { BottomNav } from "./BottomNav";

export function Layout() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans antialiased text-gray-900 selection:bg-black selection:text-white overflow-hidden">
      <div className="max-w-md mx-auto min-h-screen relative bg-white shadow-2xl overflow-hidden sm:rounded-[3rem] sm:my-8 sm:border-8 sm:border-gray-900">
        <div className="h-full overflow-y-auto custom-scrollbar pb-28">
          <Outlet />
        </div>
        <BottomNav />
      </div>
    </div>
  );
}
