import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { User } from "../types";

export default function Layout({
  user,
  onLogout
}: {
  user: User;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Sidebar */}
      <Sidebar user={user} onLogout={onLogout} />

      {/* Main Section */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">

          <div className="max-w-7xl mx-auto">

            <Outlet />

          </div>

        </div>

      </main>

    </div>
  );
}