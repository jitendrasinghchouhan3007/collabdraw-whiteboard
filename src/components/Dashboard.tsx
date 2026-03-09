import { User } from "../types";
import { Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function HomeDashboard({ user }: { user: User }) {

  const [projectCount, setProjectCount] = useState(0);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch(`/api/projects?userId=${user.id}`);
      const data = await res.json();
      setProjectCount(data.length);
    };

    fetchProjects();
  }, [user.id]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">

      {/* Left */}
      <div className="flex items-start gap-6">

        <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
          <Sun className="text-blue-500" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome back, {user.username} !
          </h1>

          <p className="text-gray-500 mt-2">{today}</p>

          <p className="text-gray-500 mt-4">
            Here's what's happening today. You have
            <span className="font-semibold text-gray-900"> {projectCount} projects </span>
            in your workspace.
          </p>

        </div>

      </div>

    </div>
  );
}