import { Link, useLocation } from "react-router-dom";
import { Home, Search, User, Calendar, LogOut } from "lucide-react";

interface NavbarProps {
  onLogout: () => void;
}

export default function Navbar({ onLogout }: NavbarProps) {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Search" },
    { path: "/timeline", icon: Calendar, label: "Timeline" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold">H</div>
          <span className="font-serif font-bold text-lg tracking-tight text-stone-800 hidden sm:block">HARI ANAND SMRUTI</span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition-colors ${
                location.pathname === item.path
                  ? "bg-amber-100 text-amber-700"
                  : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              <item.icon size={20} />
              <span className="text-sm font-medium hidden md:block">{item.label}</span>
            </Link>
          ))}
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-full text-stone-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-sm font-medium hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
