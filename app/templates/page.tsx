export const metadata = {
  title: "Tech Pack Template — ED:EN Production",
  description:
    "Download the ED:EN Production general tech pack template in Adobe Illustrator format.",
};

export default function TemplatesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Tech Pack Template
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          A general-purpose tech pack template for communicating your garment
          specifications to any manufacturer.
        </p>
      </div>

      {/* Main download card */}
      <div className="border border-gray-200 p-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">General Tech Pack</h2>
            <p className="text-sm text-gray-500 max-w-md leading-relaxed mb-4">
              Covers flat sketches, measurement spec sheet, fabric and trim
              callouts, construction notes, and grading. Works for any garment
              category.
            </p>
            <ul className="text-xs text-gray-400 space-y-1">
              <li>— Technical flat sketch (front + back)</li>
              <li>— Measurement spec sheet with size grading</li>
              <li>— Fabric and trim specifications</li>
              <li>— Construction notes</li>
              <li>— Colorway callouts</li>
              <li>— Label and packaging details</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 sm:min-w-[200px]">
            {/*
              Replace the href below with your Google Drive / Dropbox share link
              once you upload the AI file. Example:
              href="https://drive.google.com/uc?export=download&id=YOUR_FILE_ID"
            */}
            <a
              href="https://drive.google.com/uc?export=download&id=1toP9HBST5YX9rnSEs9xCaJTYAtNodDOk"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-4 py-3 bg-black text-white text-sm hover:bg-gray-800 transition-colors"
            >
              <span>Download .ai file</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1v8M4 6.5l3 3 3-3M2 11h10"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <p className="text-xs text-gray-400 text-center">Adobe Illustrator (.ai) — 70 MB</p>
          </div>
        </div>

      </div>

      {/* Preview image */}
      <div className="mb-12 border border-gray-200">
        <img
          src="/tech-pack-preview.jpg"
          alt="Tech pack template preview"
          className="w-full"
        />
        <p className="text-xs text-gray-400 text-center py-3 border-t border-gray-100">
          Template preview — all pages included in the download
        </p>
      </div>

      {/* What's in a tech pack */}
      <section className="border-t border-gray-100 pt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          What&apos;s in a tech pack?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {[
            {
              title: "Technical flat sketch",
              body: "A to-scale illustration of your garment showing construction details, seam lines, and hardware placement.",
            },
            {
              title: "Measurement spec sheet",
              body: "A graded size chart with all critical measurement points, tolerances, and instructions for the factory.",
            },
            {
              title: "Fabric & trim specifications",
              body: "Fabric composition, weight, treatment, and all trim specs including thread, zipper, and label details.",
            },
            {
              title: "Construction details",
              body: "Stitch type, seam allowance, hem treatment, and any specific construction notes required for quality output.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
