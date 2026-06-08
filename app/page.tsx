import Link from "next/link";

const FEATURES = [
  {
    href: "/prompt-builder",
    title: "Prompt Builder",
    label: "01",
    description:
      "Generate clear, professional manufacturer messages for every stage of production — outreach, samples, QC, and more.",
    cta: "Build a Prompt",
  },
  {
    href: "/templates",
    title: "Tech Pack Templates",
    label: "02",
    description:
      "Download ready-made tech pack templates for T-shirts, hoodies, denim, sweatpants, and jackets in PDF, Illustrator, and spreadsheet formats.",
    cta: "Browse Templates",
  },
  {
    href: "/checklist",
    title: "Production Checklist",
    label: "03",
    description:
      "Follow an 8-step production workflow from manufacturer research through packing. Track your progress and get linked prompts for each stage.",
    cta: "View Checklist",
  },
  {
    href: "/resources",
    title: "Resources",
    label: "04",
    description:
      "Guides, glossaries, and references for navigating factory communication, quality control, and the tech pack process.",
    cta: "Read Resources",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <section className="py-20 border-b border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Factory OS
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight max-w-3xl mb-8">
          Production tools for clothing brand owners.
        </h1>
        <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-10">
          Generate manufacturer communication prompts, complete production
          checklists, and download tech-pack templates — all in one place.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/prompt-builder"
            className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Start with Prompt Builder
          </Link>
          <Link
            href="/checklist"
            className="px-6 py-3 border border-gray-300 text-sm font-medium hover:border-black transition-colors"
          >
            View Production Checklist
          </Link>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-gray-200 bg-gray-200">
          {FEATURES.map((feature) => (
            <div key={feature.href} className="bg-white p-8 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-6">
                <span className="text-xs font-semibold uppercase tracking-widest text-gray-300">
                  {feature.label}
                </span>
              </div>
              <h2 className="text-xl font-semibold tracking-tight mb-3">
                {feature.title}
              </h2>
              <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">
                {feature.description}
              </p>
              <Link
                href={feature.href}
                className="text-sm font-medium border-b border-black pb-0.5 self-start hover:text-gray-600 hover:border-gray-600 transition-colors"
              >
                {feature.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 border-t border-gray-100">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-8">
          How it works
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {[
            {
              step: "01",
              title: "Fill in your product details",
              body: "Select your product category, production stage, sizes, and requirements in the Prompt Builder form.",
            },
            {
              step: "02",
              title: "Generate your message",
              body: "Factory OS generates a professional manufacturer message you can edit, copy, or download as a PDF.",
            },
            {
              step: "03",
              title: "Track your production",
              body: "Use the Production Checklist to follow every stage from manufacturer research to shipment — progress is saved locally.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-2xl font-semibold text-gray-100 mb-4">
                {item.step}
              </p>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
