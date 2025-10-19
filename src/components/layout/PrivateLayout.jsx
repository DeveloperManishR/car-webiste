import { SideBar } from "../common/SideBar";
import { TopBar } from "../common/TopBar";

export default function PrivateLayout({ children }) {
  return (
    <div>
      <SideBar />
      <TopBar />
      {children}
    </div>
  );
}
