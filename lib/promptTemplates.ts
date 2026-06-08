import { PromptBuilderFormData } from "@/types";

function formatSizes(sizes: string[], customSizes: string): string {
  const all = [...sizes];
  if (customSizes.trim()) {
    all.push(...customSizes.split(",").map((s) => s.trim()).filter(Boolean));
  }
  if (all.length === 0) return "sizes TBD";
  return all.join(", ");
}

function formatList(items: string[]): string {
  if (items.length === 0) return "N/A";
  return items.map((item) => `  - ${item}`).join("\n");
}

export function generatePrompt(data: PromptBuilderFormData): string {
  const {
    productCategory,
    productionStage,
    sizes,
    measurements,
    constructionDetails,
    defectChecks,
    photoRequirements,
    packagingRequirements,
    brandName,
    styleNumber,
  } = data;

  const brand = brandName.trim() || "[Brand Name]";
  const style = styleNumber.trim() || "[Style #]";
  const sizeStr = formatSizes(sizes, data.customSizes);

  switch (productionStage) {
    case "Manufacturer outreach":
      return `Subject: Manufacturing Inquiry — ${productCategory} — ${brand}

Hello,

My name is [Your Name] and I represent ${brand}. We are a clothing brand seeking a reliable manufacturing partner for our upcoming ${productCategory} production.

Product Details:
- Category: ${productCategory}
- Style Number: ${style}
- Size Range: ${sizeStr}
- Estimated Units: [Enter quantity]

Construction Requirements:
${constructionDetails.trim() || "Please see attached tech pack for full specifications."}

We are looking for a factory that can meet our quality standards and timeline requirements. Could you please provide:
  - Minimum order quantity (MOQ)
  - Price per unit (based on materials and quantity)
  - Lead time for samples and bulk production
  - Your quality control process
  - Certifications (OEKO-TEX, GOTS, etc.) if applicable
  - Payment terms

Please confirm whether you can produce this garment and send your factory profile and certifications if available.

We look forward to hearing from you.

Best regards,
[Your Name]
${brand}
[Your contact information]`;

    case "Sample request":
      return `Subject: Sample Request — ${productCategory} — ${brand} — ${style}

Hello,

Following our initial discussion, we would like to place a sample request for the following:

Brand: ${brand}
Style Number: ${style}
Product: ${productCategory}
Sample Size(s): ${sizeStr}

Construction Details:
${constructionDetails.trim() || "[Please refer to attached tech pack]"}

Required Measurements:
${formatList(measurements)}

For the sample, please ensure the following quality checks are completed:
${formatList(defectChecks)}

We require the following photos with the sample delivery:
${formatList(photoRequirements)}

Packaging for Sample:
${packagingRequirements.trim() || "Standard packaging is acceptable for the sample."}

Please confirm:
  1. Sample lead time
  2. Sample cost
  3. Return policy for revisions

Please send the sample to: [Your shipping address]

Best regards,
[Your Name]
${brand}`;

    case "Sample revision":
      return `Subject: Sample Revision Request — ${productCategory} — ${brand} — ${style}

Hello,

Thank you for sending the sample for ${style} (${productCategory}). After thorough review, we have the following revision requests:

Brand: ${brand}
Style Number: ${style}
Sample Round: [Round #]

Required Revisions:
[Please list specific revisions below]
  1.
  2.
  3.

Measurement Corrections Needed:
${formatList(measurements.map((m) => `${m}: Current: [X] | Required: [Y]`))}

Quality Issues to Address:
${formatList(defectChecks)}

Additional Construction Notes:
${constructionDetails.trim() || "[See attached revision sheet]"}

Photo Documentation Required with Revised Sample:
${formatList(photoRequirements)}

Please confirm the revision lead time and revised sample cost if applicable. We would like to receive the corrected sample by [target date].

Best regards,
[Your Name]
${brand}`;

    case "Pre-production confirmation":
      return `Subject: Pre-Production Approval — ${productCategory} — ${brand} — ${style}

Hello,

We are pleased to confirm our pre-production approval for the following order:

Brand: ${brand}
Style Number: ${style}
Product: ${productCategory}
Approved Size Range: ${sizeStr}
Total Units: [Enter total units per size]

Approved Construction Specifications:
${constructionDetails.trim() || "[Per approved sample and attached tech pack]"}

Required Measurement Tolerances (±0.5cm unless stated):
${formatList(measurements)}

Pre-Production Checklist for Your Team:
${formatList(defectChecks)}

Before bulk production begins, please confirm:
  1. Fabric/materials have been sourced and approved
  2. All trims and labels are in stock
  3. Production schedule and delivery date
  4. Any deviations from the approved sample must be reported immediately

Quality Control Photos Required at Start of Bulk:
${formatList(photoRequirements)}

Packaging Specifications:
${packagingRequirements.trim() || "[Per standard packaging requirements — see attached]"}

Please reply with written confirmation of the above before proceeding.

Best regards,
[Your Name]
${brand}`;

    case "Bulk quality control":
      return `Subject: Bulk QC Inspection Request — ${productCategory} — ${brand} — ${style}

Hello,

We require a full quality control inspection before shipment approval for:

Brand: ${brand}
Style Number: ${style}
Product: ${productCategory}
Size Range: ${sizeStr}
Total Bulk Units: [Enter total quantity]

Please provide the following QC documentation:

1. Size Measurement Report
   - Random measurement of [X] garments per size
   - Measurements required: ${formatList(measurements)}
   - Acceptable tolerance: ±0.5cm (unless otherwise specified)

2. Defect Inspection Report
   The following checks must be completed per garment:
${formatList(defectChecks)}

3. Required QC Photos:
${formatList(photoRequirements)}

4. Construction Requirements Confirmation:
${constructionDetails.trim() || "[Per approved pre-production spec sheet]"}

5. Bulk Order Summary:
   - Total units per size
   - Reject/rework quantity
   - Pass/fail status

Packaging Confirmation:
${packagingRequirements.trim() || "[Confirm all units are packed per spec]"}

DO NOT ship until written QC approval has been issued by ${brand}.

Best regards,
[Your Name]
${brand}`;

    case "Packing confirmation":
      return `Subject: Packing Confirmation Request — ${productCategory} — ${brand} — ${style}

Hello,

Before we issue shipping approval, please confirm the following packing details for:

Brand: ${brand}
Style Number: ${style}
Product: ${productCategory}
Size Range: ${sizeStr}
Total Units: [Enter total units]

Packing Requirements:
${packagingRequirements.trim() || "[Per agreed packing spec]"}

Please provide confirmation and photos of the following:
${formatList(photoRequirements)}

Packing Checklist:
  - All garments folded and packed per spec
  - Correct size breakdown per carton
  - Carton weight and dimensions
  - Barcode/SKU labels applied correctly
  - Country of origin label included
  - Packing list accurate and enclosed

Additional Quality Checks at Packing Stage:
${formatList(defectChecks)}

Shipping Details Required:
  - Total number of cartons
  - Total gross weight (kg)
  - Total CBM
  - Ready-to-ship date

Please provide packing photos and a final packing list before booking shipment.

Best regards,
[Your Name]
${brand}`;

    case "Defect complaint":
      return `Subject: Defect Complaint — ${productCategory} — ${brand} — ${style}

Hello,

We are writing to formally report quality defects identified in our received bulk order:

Brand: ${brand}
Style Number: ${style}
Product: ${productCategory}
Order Reference: [PO Number]
Date Received: [Date]

Defects Identified:
${formatList(defectChecks.map((d) => `${d}: [Quantity affected] units — [Description of defect]`))}

Affected Sizes: ${sizeStr}
Total Defective Units: [Enter number]
Defect Rate: [X]%

Measurement Discrepancies:
${formatList(measurements.map((m) => `${m}: Approved: [X] | Received: [Y] | Difference: [Z]`))}

Supporting Documentation Attached:
${formatList(photoRequirements)}

Requested Resolution:
  [ ] Full replacement of defective units
  [ ] Credit/refund for defective units
  [ ] Rework and return
  [ ] Price reduction

We require your response and proposed resolution within 5 business days.

Construction Issues Noted:
${constructionDetails.trim() || "[See attached defect report and photos]"}

Best regards,
[Your Name]
${brand}`;

    default:
      return `Prompt could not be generated. Please select a production stage and fill in the required fields.`;
  }
}
