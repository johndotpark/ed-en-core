"use client";

interface CheckboxGroupProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  columns?: 2 | 3 | 4;
}

export default function CheckboxGroup({
  options,
  selected,
  onChange,
  columns = 2,
}: CheckboxGroupProps) {
  const colClass =
    columns === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : columns === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div className={`grid ${colClass} gap-2`}>
      {options.map((option) => {
        const checked = selected.includes(option);
        return (
          <label
            key={option}
            onClick={() =>
              checked
                ? onChange(selected.filter((s) => s !== option))
                : onChange([...selected, option])
            }
            className={`flex items-center gap-3 px-3 py-2.5 border cursor-pointer text-sm transition-colors ${
              checked
                ? "border-black bg-black text-white"
                : "border-gray-200 bg-white text-black hover:border-gray-400"
            }`}
          >
            <span
              className={`w-4 h-4 border flex-shrink-0 flex items-center justify-center ${
                checked ? "border-white bg-white" : "border-gray-400"
              }`}
            >
              {checked && (
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                >
                  <path
                    d="M1 4L3.5 6.5L9 1"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            {option}
          </label>
        );
      })}
    </div>
  );
}
