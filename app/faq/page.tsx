export const metadata = {
  title: "FAQ — ED:EN Production",
  description:
    "Answers to common questions about clothing production, sampling, MOQs, manufacturer communication, and protecting your designs.",
};

const FAQS = [
  {
    q: "Do I need a tech pack to work with a manufacturer?",
    a: "Yes, always. A tech pack is the single most important document you'll send a factory. Without one, there's no shared reference for what you're asking them to make, which means the sample will almost certainly come back wrong. A tech pack includes a flat sketch, measurement spec sheet, fabric and trim specifications, construction callouts, and label and packaging requirements. Factories that agree to produce without a tech pack are waving a red flag: they're either inexperienced or planning to interpret things their own way. Even a basic tech pack built in Figma or Adobe Illustrator is far better than nothing.",
  },
  {
    q: "What is an MOQ?",
    a: "MOQ stands for Minimum Order Quantity, the smallest number of units a factory will produce in a single run. MOQs vary widely: a small cut-and-sew factory might start at 50 to 100 units per style, while a larger offshore manufacturer may require 300 to 500 units per colorway. MOQs exist because factories need to cover the fixed cost of setup, sampling, and cutting. If you can't meet a factory's MOQ, you can sometimes negotiate by offering to pay a setup fee, consolidating multiple styles into one order, or agreeing to a higher price per unit in exchange for a lower quantity. Always clarify MOQ before going deep in conversation with any factory.",
  },
  {
    q: "How do I find manufacturers?",
    a: "The most reliable methods are trade directories like Alibaba, Maker's Row, Common Objective, and Sewport — though quality varies. Trade shows like MAGIC in Las Vegas and Texworld USA let you meet factories in person. Referrals from other brand founders are the fastest path to vetted contacts. LinkedIn is useful for reaching factory sourcing managers directly. Sourcing agents typically take 5 to 10% of your order cost but save significant time and reduce risk, especially for offshore production. When evaluating any factory, request references from current clients, ask for certifications, and always start with a sample before committing to bulk.",
  },
  {
    q: "What's the difference between a sample and a pre-production sample?",
    a: "A first sample, also called a proto, is the factory's initial interpretation of your tech pack. It's built to check fit, construction, and proportion and often uses substitute fabrics. You'll typically go through one to three rounds of revisions on this. A pre-production sample, or PP sample, is the final approved sample made from the exact production fabrics, threads, labels, and trims that will be used in bulk. Once you approve the PP sample in writing, it becomes the sealed sample, the binding reference the factory must match during production. Never approve bulk production without signing off on a PP sample.",
  },
  {
    q: "What is CMT vs FOB vs DDP?",
    a: "These terms define how much of the supply chain the factory handles. CMT, which stands for Cut, Make, Trim, means the factory provides labor only and you source all materials yourself. FOB, or Free on Board, means the factory sources materials and manufactures the goods, covering costs until the goods are loaded onto the vessel at the origin port. You pay freight, customs, and delivery from that point. This is the most common arrangement. DDP, Delivered Duty Paid, means the factory or freight forwarder handles everything including shipping and import duties, so goods arrive at your door cleared through customs. It's the most hands-off option but typically the most expensive.",
  },
  {
    q: "How many samples should I expect before bulk?",
    a: "Plan for a minimum of two rounds: a first sample and a PP sample. In practice most brands go through two to four rounds total, covering the proto, one or two revision rounds, and a final PP sample. Complex styles with washes or prints can take more. Each sample round typically costs $50 to $300 or more per piece depending on complexity and factory location, and takes two to four weeks. Rushing the sampling process is one of the most common reasons bulk orders come back wrong. It's always cheaper to spend another $200 on an extra sample round than to receive 500 units with a consistent defect.",
  },
  {
    q: "What should I do if my bulk order has defects?",
    a: "Document everything before accepting the shipment if possible. Photograph each defect type, count affected units per size, and record everything in writing. Contact the factory by email, not messaging apps, with a clear defect report covering defect type, count, photos, and your requested resolution. Common resolutions include rework of defective units, replacement production, a credit toward future orders, or a partial refund. Your leverage depends on whether you've paid in full, which is why standard practice is a 30 to 50% deposit before production and the remainder on delivery. Prevention is better: always require a pre-shipment QC report with photos before approving shipment.",
  },
  {
    q: "How do I protect my designs?",
    a: "Design protection in fashion is limited but not zero. In the US, fashion silhouettes are generally not copyrightable, but original prints, graphics, and textile patterns are. Register any original artwork with the US Copyright Office. Trademark your brand name and logo with the USPTO. When working with factories, use an NDA before sharing tech packs, though enforcement against offshore factories is difficult in practice. Practically speaking, the strongest protection is moving fast and getting to market before knockoffs can catch up. Keep your tech packs watermarked with your brand name and a version number, and ensure any sourcing agent contract specifies that your designs remain your IP.",
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
