import { Folder, Trash2, Users, Settings } from "lucide-react";

const sidebarItems = [
  { icon: Folder, label: "My Folders" },
  { icon: Users, label: "Shared With Me" },
  { icon: Trash2, label: "Trash" },
  { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-gray-100 text-gray-800 p-4 space-y-6 min-h-screen border-r border-gray-300">
      <h2 className="text-2xl font-bold text-center text-gray-700">Trezl</h2>
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <SidebarItem key={item.label} icon={item.icon} label={item.label} />
        ))}
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label }) {
  return (
    <div className="flex items-center space-x-3 px-3 py-2 rounded hover:bg-gray-200 cursor-pointer transition text-sm font-medium">
      <Icon size={20} className="text-gray-600" />
      <span>{label}</span>
    </div>
  );
}
