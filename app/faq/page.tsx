export const metadata = {
  title: "FAQ — ED:EN Production",
  description:
    "Answers to common questions about clothing production, sampling, MOQs, manufacturer communication, and protecting your designs.",
};

const FAQS = [
  {
    q: "Do I need a tech pack to work with a manufacturer?",
    a: "Yes — always. A tech pack is the single most important document you'll send a factory. Without one, there's no shared reference for what you're asking them to make, which means the sample will almost certainly come back wrong. A tech pack includes a flat sketch, measurement spec sheet, fabric and trim specifications, construction callouts, and label/packaging requirements. Factories that agree to produce without a tech pack are waving a red flag: they're either inexperienced or planning to interpret things their own way. Even a basic tech pack built in Figma or Adobe Illustrator is far better than no tech pack.",
  },
  {
    q: "What is an MOQ?",
    a: "MOQ stands for Minimum Order Quantity — the smallest number of units a factory will produce in a single production run. MOQs vary widely: a small cut-and-sew factory might start at 50–100 units per style, while a larger offshore manufacturer may require 300–500 units per colorway. MOQs exist because factories need to cover the fixed cost of setup, sampling, and cutting. If you can't meet a factory's MOQ, you can sometimes negotiate by offering to pay a setup fee, consolidating multiple styles into one order, or agreeing to a higher price per unit in exchange for a lower quantity. Always clarify MOQ before going deep in communication with any factory.",
  },
  {
    q: "How do I find manufacturers?",
    a: "The most reliable methods are: (1) Trade directories — Alibaba, Maker's Row (US), Common Objective, and Sewport are starting points, though quality varies widely. (2) Trade shows — MAGIC in Las Vegas, Texworld USA, and regional sourcing shows let you meet factories in person. (3) Referrals — asking other brand founders is the fastest path to vetted contacts. (4) LinkedIn — reaching out to factory sourcing managers directly. (5) Sourcing agents — a good agent takes 5–10% of your order cost but saves significant time and reduces risk, especially for offshore production. When evaluating any factory, request references from current clients, ask for a factory audit or certifications, and start with a sample order before committing to bulk.",
  },
  {
    q: "What's the difference between a sample and a pre-production sample?",
    a: "A first sample (also called a proto or prototype sample) is the factory's initial interpretation of your tech pack. It's built to check fit, construction, and proportion — it often uses substitute fabrics and may not include all trim details. You'll typically go through 1–3 rounds of revisions on this. A pre-production sample (PP sample) is the final approved sample made from the exact production fabrics, threads, labels, and trims that will be used in bulk. Once you approve the PP sample in writing, it becomes the sealed sample — the binding reference the factory must match during production. Never approve bulk production without reviewing and signing off on a PP sample. The PP sample is your legal and practical benchmark for QC.",
  },
  {
    q: "What is CMT vs FOB vs DDP?",
    a: "These are manufacturing and shipping terms that define how much of the supply chain the factory handles. CMT (Cut, Make, Trim) means the factory only provides labor — you source and supply all fabrics, trims, and materials yourself. You control quality at the material level, but it requires more logistics on your end. FOB (Free on Board) means the factory sources materials and manufactures the goods, and covers all costs until the goods are loaded onto the vessel at the origin port. You pay freight, insurance, customs duties, and delivery from that point. This is the most common arrangement for established brands. DDP (Delivered Duty Paid) means the factory or freight forwarder handles everything including shipping, insurance, and import duties — the goods arrive at your door cleared through customs. It's the most hands-off option but typically the most expensive and gives you the least visibility into cost breakdowns.",
  },
  {
    q: "How many samples should I expect before bulk?",
    a: "Plan for a minimum of two rounds: a first sample and a PP sample. In practice, most brands go through 2–4 rounds total — a proto, one or two revision rounds, and a final PP sample. Complex styles with multiple construction details, washes, or prints can take more. Each sample round typically costs $50–$300+ per piece depending on complexity and factory location, and takes 2–4 weeks. Budget both the time and cost into your production calendar. Rushing the sampling process is one of the most common reasons bulk orders come back wrong. It's always cheaper to spend another $200 on an extra sample round than to receive 500 units with a consistent defect.",
  },
  {
    q: "What should I do if my bulk order has defects?",
    a: "First, document everything systematically before accepting the shipment if possible — photograph each defect type, count affected units per size, and record everything in writing. Do not simply reject the goods without documentation, as this weakens your position. Then contact the factory in writing (email, not messaging apps) with a clear defect report: defect type, count, photos, and your requested resolution. Typical resolutions include: full rework of defective units, replacement production, a credit toward future orders, or a partial refund. Your leverage depends on whether you've paid in full. Standard practice is to pay 30–50% deposit before production and the remainder on delivery, which gives you negotiating room. If the factory is unresponsive, a sourcing agent or third-party QC firm can help mediate. Prevention is better: always require a pre-shipment QC inspection report with photos before approving shipment.",
  },
  {
    q: "How do I protect my designs?",
    a: "Design protection in fashion is limited but not zero. In the US, fashion silhouettes are generally not copyrightable, but original prints, graphics, and textile patterns are. Register any original artwork with the US Copyright Office. For brand protection, trademark your brand name and logo with the USPTO — this is non-negotiable. When working with factories, use an NDA (Non-Disclosure Agreement) before sharing tech packs, though enforcement against offshore factories is difficult. Practically speaking, the strongest protection is moving fast — get to market before knockoffs can. Keep your tech packs watermarked with your brand name and a version number. If you're working with a sourcing agent, ensure your contract specifies that your designs, patterns, and specifications remain your IP and cannot be sold or shared with other clients.",
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          FAQ
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Common questions about clothing production, sampling, manufacturers, and protecting your work.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {FAQS.map((item, i) => (
          <div key={i} className="py-8">
            <h2 className="text-base font-semibold mb-3 leading-snug">{item.q}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
