"use client";

import { useState } from "react";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"] as const;

type SizeKey = (typeof SIZES)[number];

const DEFAULT_UNITS: Record<SizeKey, string> = {
  XS: "",
  S: "",
  M: "",
  L: "",
  XL: "",
  XXL: "",
};

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) || n < 0 ? 0 : n;
}

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CalculatorPage() {
  const [units, setUnits] = useState<Record<SizeKey, string>>(DEFAULT_UNITS);
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [dutyPct, setDutyPct] = useState("");
  const [otherCosts, setOtherCosts] = useState("");

  const totalUnits = SIZES.reduce((sum, s) => sum + parseNum(units[s]), 0);
  const productionCost = totalUnits * parseNum(pricePerUnit);
  const dutyAmount = productionCost * (parseNum(dutyPct) / 100);
  const totalLandedCost = productionCost + dutyAmount + parseNum(shippingCost) + parseNum(otherCosts);
  const costPerUnit = totalUnits > 0 ? totalLandedCost / totalUnits : 0;

  function updateUnit(size: SizeKey, val: string) {
    setUnits((prev) => ({ ...prev, [size]: val }));
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
          ED:EN Production
        </p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
          Cost Calculator
        </h1>
        <p className="text-base text-gray-500 max-w-xl leading-relaxed">
          Calculate your total landed cost and per-unit cost across a production run.
        </p>
      </div>

      <div className="space-y-8">
        {/* Units per size */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Units per Size
          </p>
          <p className="text-sm text-gray-500 mb-4">Enter the quantity for each size in your order.</p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {SIZES.map((size) => (
              <div key={size}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">{size}</label>
                <input
                  type="number"
                  min="0"
                  value={units[size]}
                  onChange={(e) => updateUnit(size, e.target.value)}
                  placeholder="0"
                  className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:border-black bg-white text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Cost inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Price per Unit (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Shipping Cost (USD, total)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Import Duty %
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={dutyPct}
                onChange={(e) => setDutyPct(e.target.value)}
                placeholder="0"
                className="w-full border border-gray-300 px-4 pr-8 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">%</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Other Costs (USD, optional)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={otherCosts}
                onChange={(e) => setOtherCosts(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="border border-gray-200">
          <div className="border-b border-gray-200 px-5 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">
              Results
            </span>
          </div>
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Units</span>
              <span className="text-sm font-semibold tabular-nums">{totalUnits.toLocaleString()}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Production Cost</span>
              <span className="text-sm font-semibold tabular-nums">${fmt(productionCost)}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Duty Amount</span>
              <span className="text-sm font-semibold tabular-nums">${fmt(dutyAmount)}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-semibold">Total Landed Cost</span>
              <span className="text-sm font-semibold tabular-nums">${fmt(totalLandedCost)}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-semibold">Cost per Unit (landed)</span>
              <span className="text-sm font-semibold tabular-nums">
                {totalUnits > 0 ? `$${fmt(costPerUnit)}` : "—"}
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed">
          Landed cost includes production, duty, shipping, and other costs. Duty is calculated on production cost (FOB value). Consult a customs broker for accurate duty rates for your specific HTS code and country of origin.
        </p>
      </div>
    </div>
  );
}
