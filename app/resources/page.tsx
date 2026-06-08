import Link from "next/link";

export const metadata = {
  title: "Resources — Factory OS",
  description:
    "Guides, glossaries, and references for clothing brand production, factory communication, and quality control.",
};

const GLOSSARY = [
  {
    term: "MOQ",
    definition:
      "Minimum Order Quantity. The smallest number of units a factory will produce in a single order run.",
  },
  {
    term: "Tech Pack",
    definition:
      "A document sent to a factory containing all technical specifications for a garment: measurements, materials, construction details, labels, and packaging.",
  },
  {
    term: "AQL",
    definition:
      "Acceptable Quality Level. A statistical sampling method used in QC to decide whether to accept or reject a production batch based on defect rate.",
  },
  {
    term: "TOL",
    definition:
      "Tolerance. The acceptable range of deviation from a measurement spec — typically ±0.5cm for most garment measurements.",
  },
  {
    term: "PP Sample",
    definition:
      "Pre-Production sample. The final approved sample that sets the standard for all bulk production.",
  },
  {
    term: "Sealed Sample",
    definition:
      "A signed and dated approved PP sample kept by the brand as the benchmark for QC comparison during bulk production.",
  },
  {
    term: "Grading",
    definition:
      "The process of scaling a base size pattern up or down to create all sizes in a size run (XS–XXL or numerical sizing).",
  },
  {
    term: "GSM",
    definition:
      "Grams per Square Metre. A measure of fabric weight and density — higher GSM means heavier, denser fabric.",
  },
  {
    term: "Colorway",
    definition:
      "A specific color version of a style. A garment can have multiple colorways produced from the same pattern.",
  },
  {
    term: "BOM",
    definition:
      "Bill of Materials. A list of all materials, trims, labels, and components required to produce a garment.",
  },
  {
    term: "FOB",
    definition:
      "Free on Board. A shipping term meaning the factory covers costs until the goods are loaded onto the ship. The buyer covers freight from that point.",
  },
  {
    term: "Lead Time",
    definition:
      "The total time from placing an order to receiving finished goods. Includes production, QC, and shipping time.",
  },
];

const GUIDES = [
  {
    title: "How to Write a Tech Pack",
    sections: [
      "Start with a cover page including brand name, style number, season, and factory contact.",
      "Include a technical flat sketch of the garment (front and back view minimum).",
      "Add a measurement spec sheet with all critical points graded by size.",
      "Specify all fabrics and trims with composition, weight, color code, and supplier if known.",
      "Include construction callouts for all seam types, stitching, and finishing methods.",
      "Add label and packaging requirements at the end.",
    ],
  },
  {
    title: "How to Conduct a Bulk QC Inspection",
    sections: [
      "Use the AQL 2.5 standard: inspect a statistically significant sample from the bulk order.",
      "Measure random garments per size against the approved spec sheet tolerances.",
      "Inspect for stitching defects, seam puckering, color inconsistencies, and fabric flaws.",
      "Compare inspected garments to the sealed pre-production sample.",
      "Document all defects with counts and photographs.",
      "Calculate defect rate — if above AQL threshold, reject and request rework or replacement.",
    ],
  },
  {
    title: "How to Request a Sample",
    sections: [
      "Always provide a complete tech pack before requesting a sample — never rely on verbal description.",
      "Specify the sample size (recommend L or M for initial fit checks).",
      "Agree on sample cost and whether it's deducted from bulk production payment.",
      "Request measurement photos and construction photos with the sample delivery.",
      "Inspect the sample within 3–5 days and provide written, itemized feedback.",
      "Limit revisions to 2 rounds before escalating or switching factories.",
    ],
  },
  {
    title: "Red Flags When Vetting a Factory",
    sections: [
      "No verifiable certifications or factory audit reports.",
      "Reluctance to provide MOQ, pricing, or lead time in writing.",
      "Cannot provide client references or portfolio samples.",
      "Agrees to everything without asking technical questions.",
      "Requests full payment upfront with no milestone payment structure.",
      "Communication is slow, vague, or switches contacts frequently.",
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Factory OS
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Resources
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Guides, terminology, and practical references for navigating clothing
          production — from your first manufacturer outreach to bulk QC.
        </p>
      </div>

      {/* Quick links */}
      <div className="flex flex-wrap gap-3 mb-12 pb-10 border-b border-gray-100">
        <Link
          href="/prompt-builder"
          className="px-4 py-2 border border-black text-sm hover:bg-black hover:text-white transition-colors"
        >
          Prompt Builder
        </Link>
        <Link
          href="/templates"
          className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors"
        >
          Tech Pack Templates
        </Link>
        <Link
          href="/checklist"
          className="px-4 py-2 border border-gray-300 text-sm hover:border-black transition-colors"
        >
          Production Checklist
        </Link>
      </div>

      {/* Production Guides */}
      <section className="mb-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Production Guides
        </p>
        <div className="space-y-10">
          {GUIDES.map((guide) => (
            <div key={guide.title}>
              <h2 className="text-xl font-semibold tracking-tight mb-5">
                {guide.title}
              </h2>
              <ol className="space-y-3">
                {guide.sections.map((section, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="text-xs font-semibold text-gray-300 w-6 shrink-0 mt-0.5 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{section}</p>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      {/* Glossary */}
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          Glossary
        </p>
        <div className="divide-y divide-gray-100">
          {GLOSSARY.map((item) => (
            <div key={item.term} className="py-4 grid grid-cols-[120px_1fr] gap-6">
              <span className="font-semibold text-sm pt-0.5">{item.term}</span>
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.definition}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
