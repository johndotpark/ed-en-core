import { TemplateCard } from "@/types";

interface DownloadCardProps {
  template: TemplateCard;
}

export default function DownloadCard({ template }: DownloadCardProps) {
  return (
    <div className="border border-gray-200 bg-white flex flex-col">
      <div className="border-b border-gray-200 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
          Tech Pack
        </p>
        <h3 className="text-xl font-semibold tracking-tight">
          {template.category}
        </h3>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          {template.description}
        </p>
      </div>
      <div className="px-6 py-4 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Included Pages
        </p>
        <ul className="space-y-1.5">
          {template.pages.map((page, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-gray-300 shrink-0 mt-0.5">—</span>
              {page}
            </li>
          ))}
        </ul>
      </div>
      <div className="px-6 py-5 flex flex-col gap-2 mt-auto">
        <a
          href={template.pdfFile}
          download
          className="flex items-center justify-between px-4 py-3 border border-black bg-black text-white text-sm hover:bg-gray-800 transition-colors"
        >
          <span>Download PDF</span>
          <DownloadIcon />
        </a>
        <a
          href={template.illustratorFile}
          download
          className="flex items-center justify-between px-4 py-3 border border-gray-300 text-sm hover:border-black transition-colors"
        >
          <span>Download Illustrator File</span>
          <DownloadIcon />
        </a>
        <a
          href={template.spreadsheetFile}
          download
          className="flex items-center justify-between px-4 py-3 border border-gray-300 text-sm hover:border-black transition-colors"
        >
          <span>Download Spreadsheet</span>
          <DownloadIcon />
        </a>
      </div>
    </div>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M7 1v8M4 6.5l3 3 3-3M2 11h10"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
