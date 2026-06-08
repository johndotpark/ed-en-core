"use client";

import Link from "next/link";
import { ChecklistStep } from "@/types";

interface WorkflowStepProps {
  step: ChecklistStep;
  onToggleItem: (stepId: string, itemId: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function WorkflowStep({
  step,
  onToggleItem,
  isExpanded,
  onToggleExpand,
}: WorkflowStepProps) {
  const completedCount = step.items.filter((item) => item.checked).length;
  const total = step.items.length;
  const allComplete = completedCount === total;
  const progress = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <div className={`border ${allComplete ? "border-black" : "border-gray-200"}`}>
      <button
        type="button"
        onClick={onToggleExpand}
        className="w-full px-6 py-5 flex items-start gap-4 text-left hover:bg-gray-50 transition-colors"
      >
        <span
          className={`w-8 h-8 flex items-center justify-center text-sm font-semibold shrink-0 mt-0.5 ${
            allComplete ? "bg-black text-white" : "border border-gray-300 text-gray-500"
          }`}
        >
          {allComplete ? (
            <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
              <path
                d="M1 5.5L5 9.5L13 1.5"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            step.step
          )}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-semibold text-base">{step.title}</h3>
            <span className="text-xs text-gray-400 shrink-0">
              {completedCount}/{total}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5 leading-snug">
            {step.description}
          </p>
          <div className="mt-3 h-1 bg-gray-100 w-full">
            <div
              className="h-1 bg-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <span className="text-gray-400 shrink-0 mt-1">
          {isExpanded ? (
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 6.5l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
      </button>

      {isExpanded && (
        <div className="border-t border-gray-100 px-6 py-5">
          <div className="space-y-2 mb-5">
            {step.items.map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 cursor-pointer group"
              >
                <div className="mt-0.5 shrink-0">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => onToggleItem(step.id, item.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      item.checked
                        ? "bg-black border-black"
                        : "border-gray-400 group-hover:border-gray-600"
                    }`}
                  >
                    {item.checked && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path
                          d="M1 3.5L3 5.5L8 1"
                          stroke="white"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className={`text-sm leading-snug ${
                    item.checked ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {item.label}
                </span>
              </label>
            ))}
          </div>
          <div className="flex items-center gap-3 flex-wrap border-t border-gray-100 pt-4">
            {step.promptLink && (
              <Link
                href={step.promptLink}
                className="text-xs px-3 py-1.5 border border-black text-black hover:bg-black hover:text-white transition-colors"
              >
                Open Prompt Builder
              </Link>
            )}
            {step.templateLink && (
              <Link
                href={step.templateLink}
                className="text-xs px-3 py-1.5 border border-gray-300 text-gray-600 hover:border-black hover:text-black transition-colors"
              >
                View Templates
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
