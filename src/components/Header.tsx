import { Bell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Header() {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path === "/projects") return "Projects";
    if (path.includes("/projects/")) return "Project Details";
    if (path.includes("/whiteboards")) return "Whiteboard Editor";

    return "Dashboard";
  };

  return (
    <header className="h-16 sm:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-8 shadow-sm">

      <h2 className="text-2xl font-bold text-slate-800">
        {getPageTitle()}
      </h2>

      <div className="flex items-center gap-6">

        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-50 text-slate-500 hover:text-indigo-600 transition">
          <Bell className="w-5 h-5" />

          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

      </div>

    </header>
  );
}