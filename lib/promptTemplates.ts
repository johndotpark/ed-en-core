import { PromptBuilderFormData } from "@/types";

// Preset defaults by product category
const PRESET_MEASUREMENTS: Record<string, string[]> = {
  "T-shirt": ["Chest", "Body length", "Shoulder width", "Sleeve length", "Sleeve opening", "Neck width"],
  "Hoodie": ["Chest", "Body length", "Shoulder width", "Sleeve length", "Sleeve width", "Hem width", "Hood opening"],
  "Sweatpants": ["Waist", "Hip", "Inseam", "Outseam", "Thigh", "Knee", "Leg opening"],
  "Denim": ["Waist", "Hip", "Rise", "Thigh", "Knee", "Inseam", "Outseam", "Hem opening"],
  "Jacket": ["Chest", "Body length", "Shoulder width", "Sleeve length", "Waist", "Hem width"],
  "Shorts": ["Waist", "Hip", "Inseam", "Outseam", "Thigh", "Leg opening"],
  "Dress": ["Chest", "Waist", "Hip", "Body length", "Shoulder width", "Sleeve length"],
  "Other": ["Chest", "Waist", "Body length"],
};

const PRESET_DEFECTS: Record<string, string[]> = {
  "T-shirt": ["Stitching", "Color accuracy", "Sizing accuracy", "Print quality", "Label placement"],
  "Hoodie": ["Stitching", "Color accuracy", "Sizing accuracy", "Zipper function", "Drawstring placement", "Pocket alignment"],
  "Sweatpants": ["Stitching", "Sizing accuracy", "Waistband elastic", "Color accuracy", "Seam alignment"],
  "Denim": ["Stitching", "Color accuracy", "Sizing accuracy", "Rivets and hardware", "Fabric defects", "Pocket symmetry"],
  "Jacket": ["Stitching", "Zipper function", "Color accuracy", "Sizing accuracy", "Lining alignment", "Seam alignment"],
  "Shorts": ["Stitching", "Sizing accuracy", "Waistband elastic", "Color accuracy", "Seam alignment"],
  "Dress": ["Stitching", "Color accuracy", "Sizing accuracy", "Seam alignment", "Label placement"],
  "Other": ["Stitching", "Color accuracy", "Sizing accuracy", "Fabric defects"],
};

const PRESET_PHOTOS: Record<string, string[]> = {
  "T-shirt": ["Full garment front", "Full garment back", "Close-up stitching", "Label and tags", "Measurements flat lay"],
  "Hoodie": ["Full garment front", "Full garment back", "Hood detail", "Pocket close-up", "Label and tags", "Measurements flat lay"],
  "Sweatpants": ["Full garment front", "Full garment back", "Waistband detail", "Hem close-up", "Label and tags", "Measurements flat lay"],
  "Denim": ["Full garment front", "Full garment back", "Pocket detail", "Hardware close-up", "Stitching close-up", "Label and tags", "Measurements flat lay"],
  "Jacket": ["Full garment front", "Full garment back", "Collar detail", "Zipper close-up", "Lining detail", "Label and tags", "Measurements flat lay"],
  "Shorts": ["Full garment front", "Full garment back", "Waistband detail", "Hem close-up", "Label and tags", "Measurements flat lay"],
  "Dress": ["Full garment front", "Full garment back", "Close-up stitching", "Label and tags", "Measurements flat lay"],
  "Other": ["Full garment front", "Full garment back", "Close-up stitching", "Label and tags"],
};

function formatList(items: string[]): string {
  return items.map((item) => `  - ${item}`).join("\n");
}

export function generatePrompt(data: PromptBuilderFormData): string {
  const { productCategory, productionStage, brandName } = data;

  const brand = brandName.trim() || "Your brand";
  const product = productCategory || "[Product]";

  const measurements = PRESET_MEASUREMENTS[product] ?? PRESET_MEASUREMENTS["Other"];
  const defects = PRESET_DEFECTS[product] ?? PRESET_DEFECTS["Other"];
  const photos = PRESET_PHOTOS[product] ?? PRESET_PHOTOS["Other"];

  switch (productionStage) {
    case "Manufacturer outreach":
      return `Subject: Manufacturing Inquiry — ${product} — ${brand}

Hello,

My name is [Your Name] and I represent ${brand}. We are a clothing brand seeking a reliable manufacturing partner for our upcoming ${product} production.

We are looking for a factory that can meet our quality standards and timeline requirements. Could you please provide:

  - Minimum order quantity (MOQ)
  - Price per unit based on materials and quantity
  - Lead time for samples and bulk production
  - Your quality control process
  - Any relevant certifications (OEKO-TEX, GOTS, etc.)
  - Payment terms

Please confirm whether you can produce this garment and send your factory profile and certifications if available.

We look forward to hearing from you.

Best regards,
[Your Name]
${brand}
[Your contact information]`;

    case "Sample request":
      return `Subject: Sample Request — ${product} — ${brand}

Hello,

We would like to place a sample request for the following:

Brand: ${brand}
Product: ${product}
Sample Size: M (one sample required)

Please refer to the attached tech pack for all construction specifications.

Required Measurements to Check:
${formatList(measurements)}
Tolerance: ±0.5cm on all points

Quality Checks Required Before Shipping Sample:
${formatList(defects)}

Photos Required with Sample:
${formatList(photos)}

Please confirm:
  1. Sample lead time
  2. Sample cost
  3. Revision policy

Send the sample to: [Your shipping address]

Best regards,
[Your Name]
${brand}`;

    case "Sample revision":
      return `Subject: Sample Revision Request — ${product} — ${brand}

Hello,

Thank you for sending the sample for ${product}. After review, we have the following revision requests:

Brand: ${brand}
Product: ${product}
Sample Round: [Round #]

Required Revisions:
  1. [Describe revision]
  2. [Describe revision]
  3. [Describe revision]

Measurement Corrections:
${formatList(measurements.map((m) => `${m}: Current [X] → Required [Y]`))}

Please also ensure the following are addressed:
${formatList(defects)}

Photos Required with Revised Sample:
${formatList(photos)}

Please confirm the revision lead time. We would like to receive the corrected sample by [target date].

Best regards,
[Your Name]
${brand}`;

    case "Pre-production confirmation":
      return `Subject: Pre-Production Approval — ${product} — ${brand}

Hello,

We are pleased to confirm pre-production approval for the following order:

Brand: ${brand}
Product: ${product}
Total Units: [Enter total units per size]

All construction must match the approved sample and attached tech pack exactly.

Measurement Tolerances (±0.5cm unless stated):
${formatList(measurements)}

Before bulk production begins, please confirm:
  1. Fabric and materials have been sourced and approved
  2. All trims and labels are in stock
  3. Production schedule and delivery date
  4. Any deviation from the approved sample must be reported immediately

QC Checks Required at Start of Bulk:
${formatList(defects)}

Photos Required at Bulk Start:
${formatList(photos)}

Please reply with written confirmation before proceeding.

Best regards,
[Your Name]
${brand}`;

    case "Bulk quality control":
      return `Subject: Bulk QC Inspection Request — ${product} — ${brand}

Hello,

We require a full quality control inspection before shipment approval for:

Brand: ${brand}
Product: ${product}
Total Bulk Units: [Enter total quantity]

Please provide the following QC documentation:

1. Size Measurement Report
   Random measurement of at least 3 garments per size.
   Measurements required:
${formatList(measurements)}
   Acceptable tolerance: ±0.5cm

2. Defect Inspection
   The following must be checked on every garment:
${formatList(defects)}

3. Required QC Photos:
${formatList(photos)}

4. Bulk Order Summary:
   - Total units per size
   - Reject/rework quantity
   - Pass/fail status

5. Packing Confirmation:
   - All garments folded and packed per spec
   - Correct size breakdown per carton
   - Labels applied correctly

DO NOT ship until written approval has been issued by ${brand}.

Best regards,
[Your Name]
${brand}`;

    case "Packing confirmation":
      return `Subject: Packing Confirmation Request — ${product} — ${brand}

Hello,

Before we issue shipping approval, please confirm the following packing details for:

Brand: ${brand}
Product: ${product}
Total Units: [Enter total units]

Required Packing Confirmation Photos:
${formatList(photos)}

Packing Checklist:
  - All garments folded and packed per spec
  - Correct size breakdown per carton
  - Carton weight and dimensions confirmed
  - Barcode and SKU labels applied correctly
  - Country of origin label included
  - Packing list is accurate and enclosed

Final QC Checks at Packing Stage:
${formatList(defects)}

Shipping Details Required:
  - Total number of cartons
  - Total gross weight (kg)
  - Total CBM
  - Ready-to-ship date

Please send packing photos and a final packing list before booking shipment.

Best regards,
[Your Name]
${brand}`;

    case "Defect complaint":
      return `Subject: Defect Complaint — ${product} — ${brand}

Hello,

We are writing to formally report quality defects identified in our received bulk order:

Brand: ${brand}
Product: ${product}
Order Reference: [PO Number]
Date Received: [Date]

Defects Identified:
${formatList(defects.map((d) => `${d}: [Quantity affected] units — [Description]`))}

Total Defective Units: [Enter number]
Defect Rate: [X]%

Measurement Discrepancies:
${formatList(measurements.map((m) => `${m}: Approved [X] | Received [Y]`))}

Photos documenting the defects are attached.

Requested Resolution:
  [ ] Full replacement of defective units
  [ ] Credit or refund for defective units
  [ ] Rework and return
  [ ] Price reduction

We require your response and proposed resolution within 5 business days.

Best regards,
[Your Name]
${brand}`;

    default:
      return `Please select a product category and production stage to generate your message.`;
  }
}
