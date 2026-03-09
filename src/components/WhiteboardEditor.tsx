import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';
import { ArrowLeft, Save } from 'lucide-react';
import { User, Whiteboard } from '../types';

export default function WhiteboardEditor({ user }: { user: User }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showConfirmSave, setShowConfirmSave] = useState(false);
  const [showSavedSuccess, setShowSavedSuccess] = useState(false);
  const [whiteboard, setWhiteboard] = useState<Whiteboard | null>(null);
  const [editor, setEditor] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/whiteboards/${id}`).then(res => res.json()).then(setWhiteboard);
  }, [id]);

  const handleSave = async () => {
    if (!editor) return;

    await fetch(`/api/whiteboards/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: editor.getSnapshot() })
    });

    setShowConfirmSave(false);
    setShowSavedSuccess(true);
  };
  if (!whiteboard) return null;

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[200]">
      <header className="bg-white border-b border-black/5 px-6 py-3 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-black/5 rounded-full"><ArrowLeft size={20} /></button>
        <h1 className="font-bold">{whiteboard.name}</h1>
        <button onClick={() => setShowConfirmSave(true)} className="bg-[#3245FF] hover:bg-[#1B2DFB] text-white px-6 py-2 rounded flex items-center gap-2"><Save size={18} /> Save</button>
      </header>
      <div className="flex-1 relative">
        <Tldraw onMount={(e) => { setEditor(e); if (whiteboard.state) e.loadSnapshot(JSON.parse(whiteboard.state)); }} />
      </div>

      {showConfirmSave && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[300]">

          <div className="bg-white w-[360px] rounded-2xl shadow-xl p-6 text-center">

            <h2 className="text-lg font-semibold mb-2">
              Save Whiteboard
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to save this whiteboard?
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={() => setShowConfirmSave(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded-lg"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}

      {showSavedSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[300]">

          <div className="bg-white w-[340px] rounded-2xl shadow-xl p-6 text-center">

            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-full">
                ✓
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">
              Whiteboard Saved
            </h2>

            <p className="text-sm text-gray-500 mb-6">
              Your whiteboard has been saved successfully.
            </p>

            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-[#3245FF] hover:bg-[#1B2DFB] text-white rounded-lg"
            >
              OK
            </button>

          </div>

        </div>
      )}
    </div>
  );
}