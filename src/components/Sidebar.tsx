import { NavLink } from "react-router-dom";
import { LayoutDashboard, Folder, LogOut, User as UserIcon } from "lucide-react";
import { User } from "../types";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar({ user, onLogout }: { user: User; onLogout: () => void }) {
    const [openProfile, setOpenProfile] = useState(false);
    return (
        <aside
          className="hidden md:flex w-72 min-h-screen flex-col"
            style={{
                backgroundColor: "#ffffff",
                boxShadow: "4px 0 20px rgba(0,0,0,0.12)"
            }}
        >

            {/* Logo / Title */}
            <div className="px-6 py-6 text-xl font-bold text-center ">
                Whiteboard App
            </div>

            {/* Menu */}
            <div className="px-3 mt-6 space-y-2">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-md transition
    ${isActive
                            ? "bg-[#1B2DFB] text-white"
                            : "text-gray-800 hover:bg-[#3245FF] hover:text-white"}`
                    }
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span className="font-medium text-sm">Dashboard</span>
                </NavLink>

                <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-md transition
    ${isActive
                            ? "bg-[#1B2DFB] text-white"
                            : "text-gray-800 hover:bg-[#3245FF] hover:text-white"}`
                    }
                >
                    <Folder className="w-5 h-5" />
                    <span className="font-medium text-sm">Projects</span>
                </NavLink>

            </div>


            {/* Profile Section */}
            <div className="mt-auto p-4 border-t border-gray-200">
                <div
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition"
                    onClick={() => setOpenProfile(!openProfile)}
                >

                    {/* Left side */}
                    <div className="flex items-center gap-3">

                        {/* Avatar Icon */}
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <UserIcon className="w-5 h-5 text-gray-600" />
                        </div>

                        {/* Name + Email */}
                        <div className="leading-tight">
                            <p className="text-lg font-semibold text-gray-900">
                                {user.username}
                            </p>

                        </div>

                    </div>

                    {/* Logout Icon */}
                    <button
                      
                        className="text-red-500 hover:text-red-600"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>

                </div>

            </div>
            {openProfile && (
                <div className="absolute bottom-20 left-4 w-60 bg-white rounded-xl shadow-lg  animate-fade-in">

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-gray-100"
                    >
                        <LogOut className="w-4 h-4" />
                        Log Out
                    </button>

                </div>
            )}
            <AnimatePresence>
                {openProfile && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="absolute bottom-20 left-4 w-60 bg-white rounded-lg shadow-lg border border-gray-200"
                    >

                        <button
                            onClick={() => {
                                setOpenProfile(false);
                                onLogout();
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-100"
                        >
                            <LogOut className="w-4 h-4 text-red-500" />
                            <span className="text-red-500 font-medium">Log Out</span>
                        </button>

                    </motion.div>
                )}
            </AnimatePresence>
        </aside>
    );
}