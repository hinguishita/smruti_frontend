import { Heart, Bookmark, Download } from "lucide-react";
import { motion } from "motion/react";

interface Decoration {
  id: number;
  title: string;
  theme: string;
  haar_style: string;
  image_url: string;
  category: string;
}

interface DecorationCardProps {
  key?: number | string;
  decoration: Decoration;
  onSave?: (id: number) => void;
  isSaved?: boolean;
}

export default function DecorationCard({ decoration, onSave, isSaved }: DecorationCardProps) {
  const handleDownload = async () => {
    try {
      const response = await fetch(decoration.image_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${decoration.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to download image:", err);
      // Fallback for cross-origin images
      window.open(decoration.image_url, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-stone-100"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={decoration.image_url}
          alt={decoration.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
            className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/40 transition-colors"
            title="Download Image"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 mb-1 block">
              {decoration.category}
            </span>
            <h3 className="font-serif text-lg font-bold text-stone-800 leading-tight">
              {decoration.title}
            </h3>
          </div>
          {onSave && (
            <button
              onClick={() => onSave(decoration.id)}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? "bg-amber-500 text-white" : "bg-stone-100 text-stone-400 hover:bg-amber-100 hover:text-amber-600"
              }`}
            >
              <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
            </button>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-xs text-stone-500 flex items-center gap-1">
            <span className="font-semibold text-stone-700">Theme:</span> {decoration.theme}
          </p>
          <p className="text-xs text-stone-500 flex items-center gap-1">
            <span className="font-semibold text-stone-700">Haar:</span> {decoration.haar_style}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
