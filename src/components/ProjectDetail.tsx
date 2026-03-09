import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, FileText, Share2, ArrowLeft, Eye, Trash2 } from 'lucide-react';
import { User, Whiteboard } from '../types';

export default function ProjectDetail({ user }: { user: User }) {
  const { id } = useParams();
  const [whiteboards, setWhiteboards] = useState<Whiteboard[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [whiteboardName, setWhiteboardName] = useState("");
  const [shareUsername, setShareUsername] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [whiteboardToDelete, setWhiteboardToDelete] = useState<number | null>(null);

  const fetchWb = async () => {
    const res = await fetch(`/api/projects/${id}/whiteboards`);
    setWhiteboards(await res.json());
  };
  useEffect(() => { fetchWb(); }, [id]);

  const handleCreate = async (e: any) => {
    e.preventDefault();

    if (!whiteboardName) return;

    await fetch(`/api/projects/${id}/whiteboards`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: whiteboardName })
    });

    setWhiteboardName("");
    setShowCreateModal(false);
    fetchWb();
  };

  const handleShare = async (e: any) => {
    e.preventDefault();

    if (!shareUsername) return;

    await fetch(`/api/projects/${id}/share`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: shareUsername })
    });

    setShareUsername("");
    setShowShareModal(false);
  };

  const handleDelete = (whiteboardId: number) => {
    setWhiteboardToDelete(whiteboardId);
    setShowDeleteModal(true);
  };

  const confirmDeleteWhiteboard = async () => {

    if (!whiteboardToDelete) return;

    await fetch(`/api/whiteboards/${whiteboardToDelete}`, {
      method: "DELETE"
    });

    setShowDeleteModal(false);
    setWhiteboardToDelete(null);
    fetchWb();
  };

  return (
    <div className="p-8 bg-white border border-gray-200 rounded-2xl">
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">

          <Link to="/projects" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft size={20} />
          </Link>

          <div className="p-3 bg-indigo-50 rounded-xl">
            <FileText className="w-6 h-6 text-indigo-600" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Project Whiteboards
            </h3>
            <p className="text-sm text-slate-500">
              Manage and collaborate on your project whiteboards
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={() => setShowShareModal(true)}
            className="px-4 py-2 border border-slate-200 rounded text-sm hover:bg-gray-50"
          >
            Share
          </button>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 text-white font-semibold text-sm rounded bg-[#3245FF] hover:bg-[#1B2DFB]"
          >
            + Create Whiteboard
          </button>

        </div>

      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm">

        <table className="w-full text-sm border-collapse">

          <thead className="bg-gray-50">
            <tr>

              <th className="px-6 py-3 text-left font-semibold text-gray-600">S.NO</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">NAME</th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">DATE</th>

              <th className="px-6 py-3 text-right font-semibold text-gray-600">ACTION</th>

            </tr>
          </thead>

          <tbody>

            {whiteboards.length === 0 ? (

              <tr>
                <td colSpan={4} className="text-center py-10 text-gray-500">
                  No whiteboards found
                </td>
              </tr>

            ) : (

              whiteboards.map((wb, index) => {

                const date = new Date(wb.created_at);
                const formattedDate = date.toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                });

                return (

                  <tr key={wb.id} className="hover:bg-gray-50 transition">

                    <td className="px-6 py-4">{index + 1}</td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {wb.name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {formattedDate}
                    </td>



                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">

                        {/* Open Whiteboard */}
                        <Link
                          to={`/whiteboards/${wb.id}`}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                        >
                          <Eye size={18} />
                        </Link>

                        {/* Delete Whiteboard */}
                        <button
                          onClick={() => handleDelete(wb.id)}
                          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>
                    </td>
                  </tr>

                );

              })

            )}

          </tbody>

        </table>

      </div>
      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Whiteboard</h2>
              <button onClick={() => setShowCreateModal(false)}>✕</button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Whiteboard Name
                </label>

                <input
                  type="text"
                  value={whiteboardName}
                  onChange={(e) => setWhiteboardName(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                  placeholder="Enter whiteboard name"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>

                <button type="submit" className="px-4 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded">
                  Create
                </button>
              </div>

            </form>

          </div>

        </div>
      )}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Share Project</h2>
              <button onClick={() => setShowShareModal(false)}>✕</button>
            </div>

            <form onSubmit={handleShare} className="space-y-4 ">

              <div>
                <label className="block text-sm font-medium mb-1 ">
                  Username
                </label>

                <input
                  type="text"
                  value={shareUsername}
                  onChange={(e) => setShareUsername(e.target.value)}
                  className="w-full border rounded px-3 py-2 focus:outline-none"
                  placeholder="Enter username"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setShowShareModal(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>

                <button type="submit" className="px-4 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded">
                  Share
                </button>
              </div>

            </form>

          </div>

        </div>
      )}


      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white w-[360px] rounded shadow-xl p-6 text-center">

            <div className="flex justify-center mb-4">
              <Trash2 size={36} className="text-red-400" />
            </div>

            <h2 className="text-lg font-semibold mb-2">
              Delete Whiteboard
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete this whiteboard?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteWhiteboard}
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