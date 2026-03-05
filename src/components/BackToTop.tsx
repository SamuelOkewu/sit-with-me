import { useScrollTop } from "../hooks/useScrollTop";
import { ArrowUp } from "lucide-react";
import { cn } from "../lib/utils";

export default function BackToTop() {
  const visible = useScrollTop(300);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={cn(
        "fixed bottom-8 right-6 md:right-10 z-50 p-3 rounded-full",
        "bg-ink text-paper dark:bg-paper dark:text-ink shadow-lg",
        "hover:scale-110 active:scale-95 transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp size={18} />
    </button>
  );
}
