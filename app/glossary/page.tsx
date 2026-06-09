export const metadata = {
  title: "Glossary — ED:EN Production",
  description:
    "Production and sourcing terminology for clothing brands, from BOM and CMT to tech packs, incoterms, and QC.",
};

const TERMS = [
  {
    term: "AQL",
    definition:
      "Acceptable Quality Level. A statistical sampling standard used during QC inspection to decide whether to accept or reject a production batch. AQL 2.5 is the most common level for apparel, meaning no more than 2.5% of a batch can have major defects.",
  },
  {
    term: "BOM",
    definition:
      "Bill of Materials. A complete list of every fabric, thread, trim, label, and packaging component required to produce one unit of a style, including quantities, colors, and supplier codes. The BOM is usually included in or attached to the tech pack.",
  },
  {
    term: "CMT",
    definition:
      "Cut, Make, Trim. A manufacturing arrangement where the factory provides only labor. You supply all materials including fabrics, threads, and trims. CMT gives you greater control over material quality but requires more sourcing logistics on your end.",
  },
  {
    term: "Colorway",
    definition:
      "A specific color version of a style. The same pattern can be produced in multiple colorways, e.g., a hoodie offered in black, slate, and bone would be three colorways. Each colorway may have its own MOQ requirement.",
  },
  {
    term: "DDP",
    definition:
      "Delivered Duty Paid. A shipping incoterm where the seller (factory or freight forwarder) is responsible for all costs including production, freight, insurance, and import duties until the goods arrive at the buyer's named destination, fully customs-cleared.",
  },
  {
    term: "Duty",
    definition:
      "Import duty (also called customs duty or tariff). A tax levied by the destination country's customs authority on imported goods. The rate depends on the product's HTS code (Harmonized Tariff Schedule) and the country of origin. Duties are typically calculated as a percentage of the FOB value.",
  },
  {
    term: "ETA",
    definition:
      "Estimated Time of Arrival. The date your goods are expected to arrive at the destination port or warehouse. ETAs shift based on vessel delays, port congestion, and customs clearance time, so always plan buffer into your receiving schedule.",
  },
  {
    term: "ETD",
    definition:
      "Estimated Time of Departure. The date goods are scheduled to leave the origin port. ETD is set when the booking is confirmed with the freight forwarder and typically locks your vessel slot.",
  },
  {
    term: "Factory Audit",
    definition:
      "An inspection of a factory's facility, processes, certifications, and working conditions conducted before placing an order. Audits assess production capacity, quality systems, compliance with labor standards, and fire/safety conditions. Third-party audit firms (e.g., Bureau Veritas, SGS) conduct standardized audits.",
  },
  {
    term: "Flat Sketch",
    definition:
      "A technical drawing of a garment as if it were laid flat — no body inside. Front and back views are standard; detail views are added for complex areas like pockets or collar construction. Flat sketches are the primary visual reference inside a tech pack.",
  },
  {
    term: "FOB",
    definition:
      "Free on Board. A shipping incoterm meaning the factory or exporter covers all costs until the goods are loaded onto the vessel at the named origin port. From that point, the buyer assumes risk and pays for freight, insurance, and import duties.",
  },
  {
    term: "Grading",
    definition:
      "The process of scaling a base size pattern up or down to create a full size run (e.g., XS through XXL). Each size step is called a grade, and the incremental measurement differences between sizes are called grade rules. Grading is done by a pattern maker or grader and must be reflected in the spec sheet for each size.",
  },
  {
    term: "GRS",
    definition:
      "Global Recycled Standard. A certification verifying that recycled materials in a product meet specific environmental, social, and chemical requirements. GRS is relevant if you're sourcing recycled polyester, cotton, or other reclaimed fibers.",
  },
  {
    term: "Incoterms",
    definition:
      "International Commercial Terms. A set of 11 standardized trade terms published by the International Chamber of Commerce (ICC) that define the responsibilities of buyer and seller for delivery, risk transfer, and cost in international transactions. Common apparel incoterms include EXW, FOB, CIF, and DDP.",
  },
  {
    term: "Landed Cost",
    definition:
      "The total cost of a product once it arrives at your warehouse, including the production cost, freight, insurance, import duties, customs brokerage fees, and any port handling charges. Landed cost is the true cost of goods and should be used when calculating margins.",
  },
  {
    term: "Lead Time",
    definition:
      "The total elapsed time from placing a production order to receiving finished goods at your warehouse. Lead time includes production, QC, packing, freight, and customs clearance. Standard offshore apparel lead times run 90–120 days from order to delivery.",
  },
  {
    term: "MOQ",
    definition:
      "Minimum Order Quantity. The minimum number of units a factory will produce in a single order or production run. MOQs are set per style, per colorway, or per fabric. Offshore factories typically have MOQs of 200–500 units; domestic factories may start at 50–150.",
  },
  {
    term: "OTB",
    definition:
      "Open to Buy. A buying budget metric representing how much money is available to commit to new inventory within a given period. OTB is calculated as planned purchases minus purchase commitments already made. Used in retail and wholesale planning to prevent over-ordering.",
  },
  {
    term: "PO",
    definition:
      "Purchase Order. A legally binding document issued by the buyer to the factory confirming the details of an order — style number, quantity per size and color, agreed price, delivery terms, and payment terms. A signed PO is the standard trigger for starting bulk production.",
  },
  {
    term: "PP Sample",
    definition:
      "Pre-Production Sample. The final sample made from the exact production fabrics, threads, trims, and labels before bulk production begins. The approved PP sample becomes the sealed sample, the reference standard all bulk units must match. Never approve bulk production without reviewing the PP sample.",
  },
  {
    term: "QC",
    definition:
      "Quality Control. The process of inspecting and verifying that finished goods meet the agreed specifications before shipment. QC checks include measurements against the spec sheet, visual inspection for defects, comparison to the sealed PP sample, and packing verification. Third-party QC firms can conduct inspections on your behalf at the factory.",
  },
  {
    term: "SKU",
    definition:
      "Stock Keeping Unit. A unique identifier assigned to each distinct product variant — typically a combination of style, color, and size. A single style in 3 colors and 6 sizes would have 18 SKUs. SKUs are used for inventory tracking, purchasing, and fulfillment.",
  },
  {
    term: "Spec Sheet",
    definition:
      "Specification Sheet. A document detailing every critical measurement for a garment at each size, including the measurement method and acceptable tolerance. The spec sheet is used during QC to verify that bulk units meet the approved fit.",
  },
  {
    term: "Tech Pack",
    definition:
      "Technical Package. The complete set of documents sent to a factory before sampling or production. Typically includes: a flat sketch, spec sheet with graded measurements, fabric and trim details (BOM), construction callouts, colorway information, label and packaging specs, and any brand guidelines. A complete tech pack is non-negotiable before requesting a sample.",
  },
  {
    term: "Tolerance",
    definition:
      "The acceptable range of deviation from a measurement specification. For most apparel measurements, a tolerance of ±0.5 cm is standard; larger measurements like chest width may allow ±1 cm. If a bulk unit falls outside tolerance on a critical measurement, it should be flagged as a defect.",
  },
  {
    term: "Trim",
    definition:
      "Any component of a garment other than the main fabric — including buttons, zippers, labels, patches, rivets, elastic, drawcords, eyelets, snaps, and embroidery. They are listed in the BOM and must be approved (often as physical samples) before bulk production.",
  },
];

const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));

export default function GlossaryPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Glossary
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Production and sourcing terms explained, from BOM and CMT to tech packs, incoterms, and QC.
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {sorted.map((item) => (
          <div key={item.term} className="py-5 grid grid-cols-[140px_1fr] gap-6 items-start">
            <span className="font-semibold text-sm pt-0.5 shrink-0">{item.term}</span>
            <p className="text-sm text-gray-600 leading-relaxed">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
