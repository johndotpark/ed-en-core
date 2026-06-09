import { ChecklistStep } from "@/types";

export const CHECKLIST_STEPS: ChecklistStep[] = [
  {
    id: "step-1",
    step: 1,
    title: "Manufacturer Research",
    description:
      "Find and vet potential manufacturing partners before reaching out.",
    promptLink: undefined,
    templateLink: undefined,
    items: [
      {
        id: "s1-1",
        label: "Define product category and required capabilities",
        checked: false,
      },
      {
        id: "s1-2",
        label: "Research manufacturers on Alibaba, Maker's Row, or trade shows",
        checked: false,
      },
      {
        id: "s1-3",
        label: "Verify any certifications required for your product, materials, market, or brand claims (ISO, OEKO-TEX, GOTS, etc. only apply where relevant)",
        checked: false,
      },
      {
        id: "s1-4",
        label: "Review factory profile, photos, and client history",
        checked: false,
      },
      {
        id: "s1-5",
        label: "Check minimum order quantities (MOQ) match your needs",
        checked: false,
      },
      {
        id: "s1-6",
        label: "Shortlist at least 3 factories for comparison",
        checked: false,
      },
      {
        id: "s1-7",
        label: "Note lead times and geographic location",
        checked: false,
      },
    ],
  },
  {
    id: "step-2",
    step: 2,
    title: "Manufacturer Outreach",
    description:
      "Send initial inquiries to shortlisted manufacturers and evaluate responses.",
    promptLink: "/prompt-builder",
    templateLink: undefined,
    items: [
      {
        id: "s2-1",
        label: "Prepare product brief with category, quantities, and specs",
        checked: false,
      },
      {
        id: "s2-2",
        label: "Send manufacturer outreach message (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s2-3",
        label: "Follow up within 5 business days if no response",
        checked: false,
      },
      {
        id: "s2-4",
        label: "Request factory profile, certifications, and pricing",
        checked: false,
      },
      {
        id: "s2-5",
        label: "Compare at least 3 quotes before deciding",
        checked: false,
      },
      {
        id: "s2-6",
        label: "Confirm MOQ, lead time, payment terms, and sample cost",
        checked: false,
      },
      {
        id: "s2-7",
        label: "Select preferred manufacturer and confirm partnership",
        checked: false,
      },
      {
        id: "s2-8",
        label: "Confirm who owns patterns, molds, artwork, and custom hardware developed during production",
        checked: false,
      },
      {
        id: "s2-9",
        label: "Confirm payment milestones and terms in writing before production begins",
        checked: false,
      },
      {
        id: "s2-10",
        label: "Confirm remake or refund terms in writing before production begins",
        checked: false,
      },
    ],
  },
  {
    id: "step-3",
    step: 3,
    title: "Sample Request",
    description:
      "Request and review the first sample of your garment from the factory.",
    promptLink: "/prompt-builder",
    templateLink: "/templates",
    items: [
      {
        id: "s3-1",
        label: "Prepare complete tech pack before requesting sample",
        checked: false,
        templateLink: "/templates",
      },
      {
        id: "s3-2",
        label: "Send sample request message (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s3-3",
        label: "Confirm sample cost and timeline with factory",
        checked: false,
      },
      {
        id: "s3-4",
        label: "Pay sample deposit if required",
        checked: false,
      },
      {
        id: "s3-5",
        label: "Track sample shipment",
        checked: false,
      },
      {
        id: "s3-6",
        label: "Receive and inspect sample on arrival",
        checked: false,
      },
      {
        id: "s3-7",
        label: "Document all measurements and construction details",
        checked: false,
      },
      {
        id: "s3-8",
        label: "Photograph sample from all required angles",
        checked: false,
      },
    ],
  },
  {
    id: "step-4",
    step: 4,
    title: "Sample Review",
    description:
      "Thoroughly evaluate the sample and communicate revisions clearly.",
    promptLink: "/prompt-builder",
    templateLink: undefined,
    items: [
      {
        id: "s4-1",
        label: "Measure all critical points and compare to spec",
        checked: false,
      },
      {
        id: "s4-2",
        label: "Check stitching, seams, and construction quality",
        checked: false,
      },
      {
        id: "s4-3",
        label: "Evaluate fabric hand-feel and weight",
        checked: false,
      },
      {
        id: "s4-4",
        label: "Check color accuracy against pantone or approved swatch",
        checked: false,
      },
      {
        id: "s4-5",
        label: "Verify label and tag placement",
        checked: false,
      },
      {
        id: "s4-6",
        label: "Document all issues with photos and notes",
        checked: false,
      },
      {
        id: "s4-7",
        label: "Send revision requests clearly (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s4-8",
        label: "Confirm revision lead time and cost",
        checked: false,
      },
    ],
  },
  {
    id: "step-5",
    step: 5,
    title: "Pre-Production Approval",
    description:
      "Formally approve the sample and confirm all production specifications.",
    promptLink: "/prompt-builder",
    templateLink: "/templates",
    items: [
      {
        id: "s5-1",
        label: "Review final approved sample against all specs",
        checked: false,
      },
      {
        id: "s5-2",
        label: "Confirm all revisions have been addressed",
        checked: false,
      },
      {
        id: "s5-3",
        label: "Send pre-production confirmation message (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s5-4",
        label: "Confirm final bulk order quantities per size",
        checked: false,
      },
      {
        id: "s5-5",
        label: "Agree and sign production contract or purchase order",
        checked: false,
      },
      {
        id: "s5-6",
        label: "Pay production deposit per agreed terms",
        checked: false,
      },
      {
        id: "s5-7",
        label: "Confirm production start date and delivery timeline",
        checked: false,
      },
      {
        id: "s5-8",
        label: "Retain sealed/approved sample for QC comparison",
        checked: false,
      },
      {
        id: "s5-9",
        label: "Confirm approved measurement tolerances in writing",
        checked: false,
      },
      {
        id: "s5-10",
        label: "Retain a sealed approved production sample as your QC benchmark",
        checked: false,
      },
    ],
  },
  {
    id: "step-6",
    step: 6,
    title: "Bulk Production",
    description:
      "Monitor production progress and maintain communication with the factory.",
    promptLink: undefined,
    templateLink: undefined,
    items: [
      {
        id: "s6-1",
        label: "Confirm production has started on schedule",
        checked: false,
      },
      {
        id: "s6-2",
        label: "Request mid-production progress update",
        checked: false,
      },
      {
        id: "s6-3",
        label: "Review any material or construction deviations immediately",
        checked: false,
      },
      {
        id: "s6-4",
        label: "Confirm fabric and trims sourced as agreed",
        checked: false,
      },
      {
        id: "s6-5",
        label: "Request in-line inspection photos if production is long",
        checked: false,
      },
      {
        id: "s6-6",
        label: "Track production against agreed delivery date",
        checked: false,
      },
    ],
  },
  {
    id: "step-7",
    step: 7,
    title: "Quality Control",
    description:
      "Inspect the bulk order before approving shipment.",
    promptLink: "/prompt-builder",
    templateLink: undefined,
    items: [
      {
        id: "s7-1",
        label: "Request full QC report from factory (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s7-2",
        label: "Conduct random garment measurements across all sizes",
        checked: false,
      },
      {
        id: "s7-3",
        label: "Inspect random units for construction defects",
        checked: false,
      },
      {
        id: "s7-4",
        label: "Compare random units to approved sealed sample",
        checked: false,
      },
      {
        id: "s7-5",
        label: "Check for stitching, color, sizing, and fabric defects",
        checked: false,
      },
      {
        id: "s7-6",
        label: "Document all defects with photos and counts",
        checked: false,
      },
      {
        id: "s7-7",
        label: "Review defect rate against acceptable quality level (AQL)",
        checked: false,
      },
      {
        id: "s7-8",
        label: "Issue pass or fail — send defect complaint if needed",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s7-9",
        label: "Do not approve shipment solely based on factory-selected photos",
        checked: false,
      },
      {
        id: "s7-10",
        label: "Consider third-party inspection for high-value or high-risk orders",
        checked: false,
      },
    ],
  },
  {
    id: "step-8",
    step: 8,
    title: "Packing and Shipment",
    description:
      "Confirm packing is correct and approve shipment.",
    promptLink: "/prompt-builder",
    templateLink: undefined,
    items: [
      {
        id: "s8-1",
        label: "Send packing confirmation request (use Prompt Builder)",
        checked: false,
        promptLink: "/prompt-builder",
      },
      {
        id: "s8-2",
        label: "Verify packing list matches order quantities",
        checked: false,
      },
      {
        id: "s8-3",
        label: "Confirm correct size labels, hang tags, and barcodes",
        checked: false,
      },
      {
        id: "s8-4",
        label: "Receive packing photos and final packing list",
        checked: false,
      },
      {
        id: "s8-5",
        label: "Pay balance due before shipment",
        checked: false,
      },
      {
        id: "s8-6",
        label: "Book freight forwarder or confirm factory shipping",
        checked: false,
      },
      {
        id: "s8-7",
        label: "Receive tracking number and shipping documents",
        checked: false,
      },
      {
        id: "s8-8",
        label: "Track shipment to destination",
        checked: false,
      },
    ],
  },
];
