"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FormSection from "@/components/ui/FormSection";
import GeneratedPromptPreview from "@/components/ui/GeneratedPromptPreview";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { generatePrompt } from "@/lib/promptTemplates";
import { ProductCategory, ProductionStage, PromptBuilderFormData } from "@/types";

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

const PRODUCTION_STAGES: { value: ProductionStage; description: string }[] = [
  { value: "Manufacturer outreach", description: "First contact with a new factory" },
  { value: "Sample request", description: "Request a prototype garment" },
  { value: "Sample revision", description: "Send correction notes on a sample" },
  { value: "Pre-production confirmation", description: "Approve bulk production start" },
  { value: "Bulk quality control", description: "Request QC inspection before shipment" },
  { value: "Packing confirmation", description: "Confirm packing before shipping" },
  { value: "Defect complaint", description: "Report defects in received goods" },
];

const LS_KEY = "factory-os-prompt-builder";
const SAVED_PROMPTS_KEY = "eden-saved-prompts";

const schema = z.object({
  brandName: z.string().min(1, "Enter your brand name"),
  productCategory: z.string().min(1, "Select a product category"),
  productionStage: z.string().min(1, "Select a production stage"),
});

type FormValues = z.infer<typeof schema>;

const DEFAULT_VALUES: FormValues = {
  brandName: "",
  productCategory: "",
  productionStage: "",
};

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
  createdAt: string;
}

export default function PromptBuilderPage() {
  const [editedPrompt, setEditedPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [savingName, setSavingName] = useState("");
  const [showSaveInput, setShowSaveInput] = useState(false);

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

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) reset(JSON.parse(saved));
    } catch {}
  }, [reset]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(SAVED_PROMPTS_KEY);
      if (saved) setSavedPrompts(JSON.parse(saved));
    } catch {}
  }, []);

  const formValues = watch();
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(formValues));
    } catch {}
  }, [formValues]);

  function onSubmit(data: FormValues) {
    const prompt = generatePrompt(data as unknown as PromptBuilderFormData);
    setEditedPrompt(prompt);
    setHasGenerated(true);
    setTimeout(() => {
      document.getElementById("prompt-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
    setEditedPrompt("");
    setHasGenerated(false);
    setShowSaveInput(false);
    setSavingName("");
    try { localStorage.removeItem(LS_KEY); } catch {}
  }

  function handleDownload() {
    const blob = new Blob([editedPrompt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manufacturer-message.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleSavePrompt() {
    if (!savingName.trim()) return;
    const newEntry: SavedPrompt = {
      id: Date.now().toString(),
      name: savingName.trim(),
      prompt: editedPrompt,
      createdAt: new Date().toISOString(),
    };
    const updated = [newEntry, ...savedPrompts];
    setSavedPrompts(updated);
    try { localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updated)); } catch {}
    setSavingName("");
    setShowSaveInput(false);
  }

  function handleLoadPrompt(p: SavedPrompt) {
    setEditedPrompt(p.prompt);
    setHasGenerated(true);
    setTimeout(() => {
      document.getElementById("prompt-output")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  function handleDeletePrompt(id: string) {
    const updated = savedPrompts.filter((p) => p.id !== id);
    setSavedPrompts(updated);
    try { localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updated)); } catch {}
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Prompt Builder
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Select your product and production stage to generate a ready-to-send manufacturer message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_480px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          <FormSection
            title="Brand Name"
            description="This will be used to personalise your message."
          >
            <input
              {...register("brandName")}
              placeholder="e.g. Studio Noir"
              className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black bg-white"
            />
            {errors.brandName && <ErrorMessage message={errors.brandName.message!} />}
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
            {errors.productCategory && <ErrorMessage message={errors.productCategory.message!} />}
          </FormSection>

          <FormSection
            title="Production Stage"
            description="What are you communicating with your manufacturer about?"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Controller
                name="productionStage"
                control={control}
                render={({ field }) =>
                  PRODUCTION_STAGES.map(({ value, description }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => field.onChange(value)}
                      className={`px-4 py-3 border text-left transition-colors ${
                        field.value === value
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-400"
                      }`}
                    >
                      <span className="block text-sm font-medium">{value}</span>
                      <span className={`block text-xs mt-0.5 ${field.value === value ? "text-gray-300" : "text-gray-400"}`}>
                        {description}
                      </span>
                    </button>
                  )) as unknown as React.ReactElement
                }
              />
            </div>
            {errors.productionStage && <ErrorMessage message={errors.productionStage.message!} />}
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
              Reset
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
                onClick={handleDownload}
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
              {/* Save prompt */}
              {showSaveInput ? (
                <div className="border border-gray-200 p-4 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Save Prompt</p>
                  <input
                    autoFocus
                    type="text"
                    value={savingName}
                    onChange={(e) => setSavingName(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSavePrompt(); if (e.key === "Escape") { setShowSaveInput(false); setSavingName(""); } }}
                    placeholder="Enter a name for this prompt"
                    className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
                  />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleSavePrompt}
                      disabled={!savingName.trim()}
                      className="px-4 py-2 bg-black text-white text-xs font-medium hover:bg-gray-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => { setShowSaveInput(false); setSavingName(""); }}
                      className="px-4 py-2 border border-gray-300 text-xs hover:border-black transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSaveInput(true)}
                  className="w-full px-4 py-3 border border-gray-300 text-sm hover:border-black transition-colors"
                >
                  Save Prompt
                </button>
              )}
            </>
          ) : (
            <div className="border border-dashed border-gray-200 p-8 text-center">
              <p className="text-sm font-medium text-gray-800 mb-2">
                Your message will appear here
              </p>
              <p className="text-xs text-gray-400">
                Fill in the form and click Generate Message.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Saved Prompts */}
      {savedPrompts.length > 0 && (
        <section className="mt-16 border-t border-gray-100 pt-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
            Saved Prompts
          </p>
          <div className="divide-y divide-gray-100">
            {savedPrompts.map((p) => (
              <div key={p.id} className="py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{p.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {new Date(p.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleLoadPrompt(p)}
                    className="text-xs px-3 py-1.5 border border-gray-300 hover:border-black transition-colors"
                  >
                    Load
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeletePrompt(p.id)}
                    className="text-xs px-3 py-1.5 border border-gray-300 hover:border-black transition-colors text-gray-500 hover:text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Denim Bulk QC reference */}
      <section className="mt-20 border-t border-gray-100 pt-12">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
          Reference
        </p>
        <h2 className="text-2xl font-semibold tracking-tight mb-6">
          Bulk QC: What to Request
        </h2>
        <p className="text-sm text-gray-500 mb-8 max-w-xl leading-relaxed">
          When requesting a bulk QC report, your message should cover these nine areas.
          The Prompt Builder includes all of these automatically when you select Bulk quality control.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border border-gray-200 bg-gray-200">
          {[
            { n: "01", title: "Size Measurement Report", body: "Random garment measurements per size vs. approved spec tolerances." },
            { n: "02", title: "Measurement Photos", body: "Flat-lay photos of measured garments showing tape measure placement." },
            { n: "03", title: "Bulk Order Quantity", body: "Total units per size confirmed against purchase order." },
            { n: "04", title: "Full Garment Photos", body: "Front and back full-garment photos across a random unit selection." },
            { n: "05", title: "Construction Close-Ups", body: "Close-up photos of stitching, rivets, buttons, pockets, and seams." },
            { n: "06", title: "Approved Sample Comparison", body: "Side-by-side of bulk garment vs. sealed pre-production sample." },
            { n: "07", title: "Pocket and Symmetry Check", body: "Pocket placement alignment and symmetry measurements." },
            { n: "08", title: "Defect Inspection", body: "Count and document stitching faults, color inconsistencies, and fabric defects." },
            { n: "09", title: "Packing Confirmation", body: "Photos of packed cartons, packing list, and correct labeling." },
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
