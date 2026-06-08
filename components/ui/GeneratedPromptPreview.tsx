"use client";


interface GeneratedPromptPreviewProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onCopy: () => void;
  onReset: () => void;
  copied: boolean;
}

export default function GeneratedPromptPreview({
  prompt,
  onPromptChange,
  onCopy,
  onReset,
  copied,
}: GeneratedPromptPreviewProps) {
  return (
    <div className="border border-gray-200">
      <div className="border-b border-gray-200 px-5 py-3 flex items-center justify-between gap-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
          Generated Message
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCopy}
            className="text-xs px-3 py-1.5 border border-gray-300 hover:border-black transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-xs px-3 py-1.5 border border-gray-300 hover:border-black transition-colors text-gray-500 hover:text-black"
          >
            Reset
          </button>
        </div>
      </div>
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="w-full h-96 p-5 text-sm font-mono text-black bg-gray-50 resize-y focus:outline-none focus:bg-white leading-relaxed"
        spellCheck={false}
      />
    </div>
  );
}
