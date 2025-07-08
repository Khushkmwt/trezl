// components/RenamePopup.jsx
import { X } from "lucide-react";
import { useState } from "react";

export default function RenamePopup({ defaultValue, onCancel, onConfirm }) {
  const [value, setValue] = useState(defaultValue || "");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl p-6 w-80 shadow-xl relative">
        <button
          onClick={onCancel}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>
        <h2 className="text-lg font-semibold mb-4">Rename</h2>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter new name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (value.trim()) onConfirm(value.trim());
            }}
            className="px-3 py-1 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Rename
          </button>
        </div>
      </div>
    </div>
  );
}
