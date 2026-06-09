"use client";

import { useState, useEffect } from "react";
import WorkflowStep from "@/components/ui/WorkflowStep";
import ProgressBar from "@/components/ui/ProgressBar";
import { CHECKLIST_STEPS } from "@/lib/checklistData";
import { ChecklistStep } from "@/types";

const LS_KEY = "factory-os-checklist";

export default function ChecklistPage() {
  const [steps, setSteps] = useState<ChecklistStep[]>(CHECKLIST_STEPS);
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(
    new Set(["step-1"])
  );

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        const parsed: Record<string, boolean> = JSON.parse(saved);
        setSteps((prev) =>
          prev.map((step) => ({
            ...step,
            items: step.items.map((item) => ({
              ...item,
              checked: parsed[item.id] ?? item.checked,
            })),
          }))
        );
      }
    } catch {}
  }, []);

  // Save to localStorage whenever steps change
  useEffect(() => {
    try {
      const state: Record<string, boolean> = {};
      steps.forEach((step) => {
        step.items.forEach((item) => {
          state[item.id] = item.checked;
        });
      });
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch {}
  }, [steps]);

  function toggleItem(stepId: string, itemId: string) {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === stepId
          ? {
              ...step,
              items: step.items.map((item) =>
                item.id === itemId
                  ? { ...item, checked: !item.checked }
                  : item
              ),
            }
          : step
      )
    );
  }

  function toggleExpand(stepId: string) {
    setExpandedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) {
        next.delete(stepId);
      } else {
        next.add(stepId);
      }
      return next;
    });
  }

  function handleReset() {
    if (!confirm("Reset all checklist progress? This cannot be undone.")) return;
    setSteps(CHECKLIST_STEPS);
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  }

  const totalItems = steps.reduce((acc, s) => acc + s.items.length, 0);
  const completedItems = steps.reduce(
    (acc, s) => acc + s.items.filter((i) => i.checked).length,
    0
  );

  const currentStep = steps.find((s) =>
    s.items.some((i) => !i.checked)
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Production Checklist
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Follow all 8 stages of clothing production — from manufacturer
          research through packing and shipment. Progress is saved automatically.
        </p>
      </div>

      {/* Overall progress */}
      <div className="border border-gray-200 px-6 py-5 mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
              Overall Progress
            </p>
            {currentStep && completedItems < totalItems && (
              <p className="text-sm text-gray-600">
                Current stage:{" "}
                <span className="font-medium text-black">{currentStep.title}</span>
              </p>
            )}
            {completedItems === totalItems && totalItems > 0 && (
              <p className="text-sm font-medium text-black">
                All steps complete. Ready to ship!
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs px-3 py-1.5 border border-gray-300 text-gray-500 hover:border-black hover:text-black transition-colors shrink-0"
          >
            Reset Progress
          </button>
        </div>
        <ProgressBar completed={completedItems} total={totalItems} />
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step) => (
          <WorkflowStep
            key={step.id}
            step={step}
            onToggleItem={toggleItem}
            isExpanded={expandedSteps.has(step.id)}
            onToggleExpand={() => toggleExpand(step.id)}
          />
        ))}
      </div>

      <div className="mt-10 border-t border-gray-100 pt-8 flex items-center justify-between gap-4 text-sm text-gray-500">
        <span>{completedItems} of {totalItems} items completed</span>
        <button
          type="button"
          onClick={handleReset}
          className="text-xs px-3 py-1.5 border border-gray-300 text-gray-500 hover:border-black hover:text-black transition-colors"
        >
          Reset All Progress
        </button>
      </div>
    </div>
  );
}
