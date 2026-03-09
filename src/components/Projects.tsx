import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Folder, Trash2 } from 'lucide-react';
import { User, Project } from '../types';

export default function Projects({ user }: { user: User }) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
    const [projectName, setProjectName] = useState("");

    const fetchProjects = async () => {
        const res = await fetch(`/api/projects?userId=${user.id}`);
        setProjects(await res.json());
    };

    useEffect(() => {
        fetchProjects();
    }, [user.id]);

    const handleDeleteProject = (projectId: number) => {
        setProjectToDelete(projectId);
        setShowDeleteModal(true);
    };

    const confirmDeleteProject = async () => {

        if (!projectToDelete) return;

        await fetch(`/api/projects/${projectToDelete}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: user.id
            })
        });
        // Remove project from UI immediately
        setProjects((prev) => prev.filter(p => p.id !== projectToDelete));

        setShowDeleteModal(false);
        setProjectToDelete(null);
    };



    const handleCreate = async (e: any) => {
        e.preventDefault();

        if (!projectName) return;

        await fetch('/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: projectName, ownerId: user.id })
        });

        setProjectName("");
        setShowModal(false);
        fetchProjects();
    };

    return (
        <div className="p-8 bg-white border border-gray-200 rounded-2xl space-y-6">
            <div className="flex items-center justify-between mb-6">

                <div className="flex items-center gap-4">

                    <div className="p-3 bg-indigo-50 rounded-xl">
                        <Folder className="w-6 h-6 text-indigo-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-slate-800">
                            Projects
                        </h3>

                        <p className="text-sm text-slate-500">
                            Manage and organize your projects
                        </p>
                    </div>

                </div>

                <button
                    onClick={() => setShowModal(true)}
                    className="px-4 py-2 text-white font-semibold text-sm rounded bg-[#3245FF] hover:bg-[#1B2DFB]"
                >
                    + Create Project
                </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {projects.length === 0 ? (
                    <div className="col-span-full text-center py-20 text-gray-500">
                        No projects yet. Create your first project.
                    </div>
                ) : (
                    projects.map((p) => (
                        <div
                            key={p.id}
                            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer"
                        >

                            <Link to={`/projects/${p.id}`}>

                                <div className="flex items-start justify-between">

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {p.name}
                                        </h3>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Owner: {p.owner_id === user.id ? 'You' : p.owner_name}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">

                                        {p.owner_id === user.id && (
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleDeleteProject(p.id);
                                                }}
                                                className="p-2 rounded-lg hover:bg-gray-50 text-gray-500"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}

                                        <Folder className="text-gray-400" size={28} />

                                    </div>

                                </div>

                                <div className="border-t border-gray-300 my-4"></div>

                                <div className="text-center w-full bg-[#3245FF] hover:bg-[#1B2DFB] text-white font-medium py-2 rounded transition">
                                    Open Project
                                </div>

                            </Link>

                        </div>
                    ))
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white w-[420px] rounded shadow-xl p-6">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Add New Project</h2>
                            <button onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <form onSubmit={handleCreate} className="space-y-4">

                            <input
                                type="text"
                                value={projectName}
                                onChange={(e) => setProjectName(e.target.value)}
                                placeholder="Enter project name"
                                className="w-full border rounded px-3 py-2 outline-none"
                                required
                            />

                            <div className="flex justify-end gap-3 pt-4">

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded"
                                >
                                    Add Project
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

                    <div className="bg-white w-[360px] rounded shadow p-6 text-center">

                        <div className="flex justify-center mb-4">
                            <Trash2 size={36} className="text-red-500" />
                        </div>

                        <h2 className="text-lg font-semibold mb-2">
                            Delete Project
                        </h2>

                        <p className="text-sm text-gray-500 mb-6">
                            Are you sure you want to delete this project?
                        </p>

                        <div className="flex justify-center gap-3">

                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={confirmDeleteProject}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                            >
                                Yes, Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
}