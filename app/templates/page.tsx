import DownloadCard from "@/components/ui/DownloadCard";
import { TEMPLATE_CARDS } from "@/lib/templateData";

export const metadata = {
  title: "Tech Pack Templates — Factory OS",
  description:
    "Download tech pack templates for T-shirts, hoodies, sweatpants, denim, and jackets in PDF, Illustrator, and spreadsheet formats.",
};

export default function TemplatesPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Factory OS
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Tech Pack Templates
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Download ready-made tech pack templates for each garment category.
          Available in PDF for reference, Illustrator for design work, and
          spreadsheet for measurement spec sheets.
        </p>
      </div>

      <div className="mb-8 border border-gray-100 bg-gray-50 px-5 py-4">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
          How to use these templates
        </p>
        <ul className="text-sm text-gray-600 space-y-1 leading-relaxed">
          <li>
            <span className="font-medium">PDF</span> — Print or share with your
            manufacturer as a reference doc.
          </li>
          <li>
            <span className="font-medium">Illustrator (.ai)</span> — Edit flat
            sketches, add colorways, and customize the layout.
          </li>
          <li>
            <span className="font-medium">Spreadsheet (.xlsx)</span> — Fill in
            measurements, grading, and spec data for each size run.
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATE_CARDS.map((template) => (
          <DownloadCard key={template.id} template={template} />
        ))}
      </div>

      <section className="mt-16 border-t border-gray-100 pt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          What&apos;s in a tech pack?
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl">
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
              body: "Fabric composition, weight, treatment, and all trim specifications including thread, zipper, and label details.",
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
