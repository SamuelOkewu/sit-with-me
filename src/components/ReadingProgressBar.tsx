import { useReadingProgress } from "../hooks/useReadingProgress";

export default function ReadingProgressBar() {
  const progress = useReadingProgress();
  return (
    <div
      className="fixed top-0 left-0 h-[3px] bg-ink dark:bg-paper z-[100] transition-all duration-100"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
