// components/Breadcrumb.jsx
import { ArrowRight } from "lucide-react";

export default function Breadcrumb({ path = [], onNavigate = () => {} }) {
  if (path.length === 0) return null;

  return (
    <div className="flex items-center text-sm text-gray-400 mb-4 gap-1 flex-wrap">
      {path.map((p, i) => (
        <span key={p.id || i} className="flex items-center gap-1">
          <button
            onClick={() => onNavigate(i)}
            className="hover:underline hover:text-white"
          >
            {p.name || 'Unnamed'}
          </button>
          {i < path.length - 1 && <ArrowRight size={14} />}
        </span>
      ))}
    </div>
  );
}
