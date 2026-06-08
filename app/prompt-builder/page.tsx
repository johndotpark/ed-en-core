"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormSection from "@/components/ui/FormSection";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import GeneratedPromptPreview from "@/components/ui/GeneratedPromptPreview";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { generatePrompt } from "@/lib/promptTemplates";
import {
  ProductCategory,
  ProductionStage,
  Size,
  Measurement,
  DefectCheck,
  PhotoRequirement,
  PromptBuilderFormData,
} from "@/types";

const PRODUCT_CATEGORIES: ProductCategory[] = [
  "T-shirt",
  "Hoodie",
  "Sweatpants",
  "Denim",
  "Jacket",
  "Shorts",
  "Dress",
  "Other",
];

const PRODUCTION_STAGES: ProductionStage[] = [
  "Manufacturer outreach",
  "Sample request",
  "Sample revision",
  "Pre-production confirmation",
  "Bulk quality control",
  "Packing confirmation",
  "Defect complaint",
];

const SIZES: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "Custom"];

const MEASUREMENTS: Measurement[] = [
  "Chest",
  "Waist",
  "Hips",
  "Inseam",
  "Sleeve length",
  "Shoulder width",
  "Body length",
  "Neck",
  "Thigh",
];

const DEFECT_CHECKS: DefectCheck[] = [
  "Stitching",
  "Color accuracy",
  "Sizing accuracy",
  "Fabric defects",
  "Pilling or snags",
  "Print quality",
  "Label placement",
  "Seam alignment",
];

const PHOTO_REQUIREMENTS: PhotoRequirement[] = [
  "Full garment front",
  "Full garment back",
  "Close-up stitching",
  "Label and tags",
  "Measurements flat lay",
  "Defect close-up",
  "Packing photo",
  "Sample vs bulk comparison",
];

const LS_KEY = "factory-os-prompt-builder";

const schema = z.object({
  productCategory: z.string().min(1, "Select a product category"),
  productionStage: z.string().min(1, "Select a production stage"),
  sizes: z.array(z.string()),
  measurements: z.array(z.string()),
  constructionDetails: z.string(),
  defectChecks: z.array(z.string()),
  photoRequirements: z.array(z.string()),
  packagingRequirements: z.string(),
  brandName: z.string(),
  styleNumber: z.string(),
  customSizes: z.string(),
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_VALUES: FormValues = {
  productCategory: "",
  productionStage: "",
  sizes: [],
  measurements: [],
  constructionDetails: "",
  defectChecks: [],
  photoRequirements: [],
  packagingRequirements: "",
  brandName: "",
  styleNumber: "",
  customSizes: "",
};

export default function PromptBuilderPage() {
  const [, setGeneratedPrompt] = useState("");
  const [editedPrompt, setEditedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_VALUES,
  });

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        reset(parsed);
      }
    } catch {}
  }, [reset]);

  // Save to localStorage on change
  const formValues = watch();
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(formValues));
    } catch {}
  }, [formValues]);

  function onSubmit(data: FormValues) {
    const prompt = generatePrompt(data as PromptBuilderFormData);
    setGeneratedPrompt(prompt);
    setEditedPrompt(prompt);
    setHasGenerated(true);
    setTimeout(() => {
      document.getElementById("prompt-output")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }

  function handleCopy() {
    navigator.clipboard.writeText(editedPrompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleReset() {
    reset(DEFAULT_VALUES);
    setGeneratedPrompt("");
    setEditedPrompt("");
    setHasGenerated(false);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  }

  function handleDownloadPdf() {
    // Client-side text download as fallback (PDF renderer loaded dynamically)
    const blob = new Blob([editedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manufacturer-message.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          Factory OS
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Prompt Builder
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Fill in your product and production details to generate a professional
          manufacturer message. You can edit the output before copying or
          downloading.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormSection
            title="Brand Details"
            description="Optional — used to personalize your message."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1.5">
                  Brand Name
                </label>
                <input
                  {...register("brandName")}
                  placeholder="e.g. Studio Noir"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1.5">
                  Style Number
                </label>
                <input
                  {...register("styleNumber")}
                  placeholder="e.g. SN-001"
                  className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Product Category" description="Select the garment type.">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <Controller
                name="productCategory"
                control={control}
                render={({ field }) =>
                  PRODUCT_CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => field.onChange(cat)}
                      className={`px-3 py-2.5 border text-sm transition-colors text-left ${
                        field.value === cat
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {cat}
                    </button>
                  )) as unknown as React.ReactElement
                }
              />
            </div>
            {errors.productCategory && (
              <ErrorMessage message={errors.productCategory.message!} />
            )}
          </FormSection>

          <FormSection
            title="Production Stage"
            description="What stage of production are you communicating about?"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Controller
                name="productionStage"
                control={control}
                render={({ field }) =>
                  PRODUCTION_STAGES.map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => field.onChange(stage)}
                      className={`px-3 py-2.5 border text-sm transition-colors text-left ${
                        field.value === stage
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      {stage}
                    </button>
                  )) as unknown as React.ReactElement
                }
              />
            </div>
            {errors.productionStage && (
              <ErrorMessage message={errors.productionStage.message!} />
            )}
          </FormSection>

          <FormSection title="Sizes" description="Select all sizes in this order.">
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={SIZES.filter((s) => s !== "Custom")}
                  selected={field.value}
                  onChange={field.onChange}
                  columns={4}
                />
              )}
            />
            <div className="mt-3">
              <label className="text-xs font-medium text-gray-600 uppercase tracking-wider block mb-1.5">
                Custom Sizes
              </label>
              <input
                {...register("customSizes")}
                placeholder="e.g. 28, 30, 32, 34"
                className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </FormSection>

          <FormSection
            title="Measurements Required"
            description="Select all measurement points the manufacturer must check."
          >
            <Controller
              name="measurements"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={MEASUREMENTS}
                  selected={field.value}
                  onChange={field.onChange}
                  columns={3}
                />
              )}
            />
          </FormSection>

          <FormSection
            title="Construction Details"
            description="Describe any specific construction requirements, materials, or techniques."
          >
            <textarea
              {...register("constructionDetails")}
              placeholder="e.g. Double-needle hem, 300gsm French terry, YKK zipper, ribbed cuffs..."
              rows={4}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white resize-y leading-relaxed"
            />
          </FormSection>

          <FormSection
            title="Defect Checks"
            description="Select all defect categories to include in the inspection request."
          >
            <Controller
              name="defectChecks"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={DEFECT_CHECKS}
                  selected={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
          </FormSection>

          <FormSection
            title="Photo Requirements"
            description="Select all photo types to request from the manufacturer."
          >
            <Controller
              name="photoRequirements"
              control={control}
              render={({ field }) => (
                <CheckboxGroup
                  options={PHOTO_REQUIREMENTS}
                  selected={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
          </FormSection>

          <FormSection
            title="Packaging Requirements"
            description="Describe packaging, folding, poly bagging, labeling, or carton specifications."
          >
            <textarea
              {...register("packagingRequirements")}
              placeholder="e.g. Individual poly bags, size sticker on bag, 12 units per carton, hang tags attached..."
              rows={3}
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white resize-y leading-relaxed"
            />
          </FormSection>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Generate Message
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-6 py-3 border border-gray-300 text-sm font-medium hover:border-black transition-colors"
            >
              Reset Form
            </button>
          </div>
        </form>

        {/* Output */}
        <div className="lg:sticky lg:top-24 lg:self-start space-y-4" id="prompt-output">
          {hasGenerated ? (
            <>
              <GeneratedPromptPreview
                prompt={editedPrompt}
                onPromptChange={setEditedPrompt}
                onCopy={handleCopy}
                onReset={handleReset}
                copied={copied}
              />
              <button
                type="button"
                onClick={handleDownloadPdf}
                className="w-full px-4 py-3 border border-gray-300 text-sm hover:border-black transition-colors flex items-center justify-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 1v8M4 6.5l3 3 3-3M2 11h10"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download as Text File
              </button>
            </>
          ) : (
            <div className="border border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Your generated message will appear here
              </p>
              <p className="text-xs text-gray-400">
                Fill in the form and click Generate Message.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Denim Bulk QC Section */}
      <section className="mt-20 border-t border-gray-100 pt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Reference
        </p>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Denim Bulk QC Template Sections
        </h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">
          When requesting a denim bulk QC inspection, your message should cover
          the following sections. The Prompt Builder covers these automatically
          when you select Denim + Bulk quality control.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-gray-200 bg-gray-200">
          {[
            {
              n: "01",
              title: "Size Measurement Report",
              body: "Random garment measurements per size vs. approved spec tolerances.",
            },
            {
              n: "02",
              title: "Random Garment Measurement Photos",
              body: "Flat-lay photos of measured garments showing tape measure placement.",
            },
            {
              n: "03",
              title: "Bulk Order Quantity",
              body: "Total units per size confirmation against purchase order.",
            },
            {
              n: "04",
              title: "Full Garment Photos",
              body: "Front and back full-garment photos across a random unit selection.",
            },
            {
              n: "05",
              title: "Construction Close-Ups",
              body: "Close-up photos of stitching, rivets, buttons, pockets, and seams.",
            },
            {
              n: "06",
              title: "Approved Sample Comparison",
              body: "Side-by-side of bulk garment vs. sealed pre-production sample.",
            },
            {
              n: "07",
              title: "Pocket and Symmetry Check",
              body: "Pocket placement alignment and symmetry measurements.",
            },
            {
              n: "08",
              title: "Defect Inspection",
              body: "Count and document stitching faults, color inconsistencies, and fabric defects.",
            },
            {
              n: "09",
              title: "Packing Confirmation",
              body: "Photos of packed cartons, packing list, and correct labeling.",
            },
          ].map((item) => (
            <div key={item.n} className="bg-white p-6">
              <p className="text-xs font-semibold text-gray-300 mb-3">{item.n}</p>
              <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
