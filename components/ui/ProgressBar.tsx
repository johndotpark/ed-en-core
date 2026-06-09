interface ProgressBarProps {
  completed: number;
  total: number;
  showLabel?: boolean;
}

export default function ProgressBar({
  completed,
  total,
  showLabel = true,
}: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-2 bg-gray-100">
        <div
          className="h-2 bg-black transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-sm font-medium tabular-nums shrink-0 w-28 text-right">
          {completed}/{total} complete
        </span>
      )}
    </div>
  );
}
