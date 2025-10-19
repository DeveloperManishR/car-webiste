import { SideBar } from "./SideBar";
import { TopBar } from "./TopBar";

export default function PrivateLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <SideBar />
      <div className="h-full w-full p-8 space-y-4">
        <TopBar />
        {children}
      </div>
    </div>
  );
}
