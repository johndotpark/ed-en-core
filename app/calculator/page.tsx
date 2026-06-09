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

const CURRENCIES = [
  { code: "USD", symbol: "$", rate: 1.0 },
  { code: "EUR", symbol: "€", rate: 0.92 },
  { code: "GBP", symbol: "£", rate: 0.79 },
  { code: "CAD", symbol: "CA$", rate: 1.36 },
  { code: "AUD", symbol: "AU$", rate: 1.53 },
] as const;

type CurrencyCode = (typeof CURRENCIES)[number]["code"];

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) || n < 0 ? 0 : n;
}

function fmt(n: number, symbol: string): string {
  return `${symbol}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function pct(n: number): string {
  return `${n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;
}

export default function CalculatorPage() {
  const [units, setUnits] = useState<Record<SizeKey, string>>(DEFAULT_UNITS);
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [dutyPct, setDutyPct] = useState("");
  const [applyDuty, setApplyDuty] = useState(true);
  const [sampleCost, setSampleCost] = useState("");
  const [packagingPerUnit, setPackagingPerUnit] = useState("");
  const [wireFee, setWireFee] = useState("");
  const [inspectionFee, setInspectionFee] = useState("");
  const [domesticFreight, setDomesticFreight] = useState("");
  const [retailPrice, setRetailPrice] = useState("");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  const curr = CURRENCIES.find((c) => c.code === currency)!;
  const { symbol, rate } = curr;

  function updateUnit(size: SizeKey, val: string) {
    setUnits((prev) => ({ ...prev, [size]: val }));
  }

  const totalUnits = SIZES.reduce((sum, s) => sum + parseNum(units[s]), 0);
  const prodCostUSD = totalUnits * parseNum(pricePerUnit);
  const dutyAmountUSD = applyDuty ? prodCostUSD * (parseNum(dutyPct) / 100) : 0;
  const landedCostUSD = prodCostUSD + parseNum(shippingCost) + dutyAmountUSD;
  const fullyLoadedCostUSD =
    landedCostUSD +
    parseNum(sampleCost) +
    totalUnits * parseNum(packagingPerUnit) +
    parseNum(wireFee) +
    parseNum(inspectionFee) +
    parseNum(domesticFreight);

  const prodCostPerUnitUSD = totalUnits > 0 ? prodCostUSD / totalUnits : 0;
  const landedCostPerUnitUSD = totalUnits > 0 ? landedCostUSD / totalUnits : 0;
  const fullyLoadedPerUnitUSD = totalUnits > 0 ? fullyLoadedCostUSD / totalUnits : 0;

  const retail = parseNum(retailPrice);
  const grossMargin =
    retail > 0 && fullyLoadedPerUnitUSD > 0
      ? ((retail - fullyLoadedPerUnitUSD) / retail) * 100
      : null;
  const markup =
    prodCostPerUnitUSD > 0 && retail > 0
      ? ((retail - prodCostPerUnitUSD) / prodCostPerUnitUSD) * 100
      : null;

  const inputClass =
    "w-full border border-gray-300 px-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white";
  const inputWithPrefixClass =
    "w-full border border-gray-300 pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:border-black bg-white";

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
          Calculate production cost, landed cost, and fully loaded cost across
          your production run.
        </p>
      </div>

      <div className="space-y-10">
        {/* Currency selector */}
        <div className="flex items-center gap-4">
          <label className="text-xs font-semibold uppercase tracking-widest text-gray-500 shrink-0">
            Display Currency
          </label>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
            className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-black bg-white"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} ({c.symbol})
              </option>
            ))}
          </select>
          {currency !== "USD" && (
            <span className="text-xs text-gray-400">
              Inputs in USD — outputs shown in {currency} at approx. rate {rate}
            </span>
          )}
        </div>

        {/* Section 1: Units & Production */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Section 1 — Units &amp; Production
          </p>
          <p className="text-sm text-gray-500 mb-5">
            Enter the quantity for each size and your per-unit production cost.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-5">
            {SIZES.map((size) => (
              <div key={size}>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  {size}
                </label>
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
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Price per Unit (USD)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={pricePerUnit}
                onChange={(e) => setPricePerUnit(e.target.value)}
                placeholder="0.00"
                className={inputWithPrefixClass}
              />
            </div>
          </div>
        </section>

        {/* Section 2: Shipping & Duties */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Section 2 — Shipping &amp; Duties
          </p>
          <p className="text-sm text-gray-500 mb-5">
            Total shipping cost and import duty rate applied to production cost (FOB value).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Shipping Cost (USD, total)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={shippingCost}
                  onChange={(e) => setShippingCost(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
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
                  className={`${inputClass} pr-8`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  %
                </span>
              </div>
            </div>
          </div>
          <label className="flex items-center gap-2.5 mt-4 cursor-pointer">
            <input
              type="checkbox"
              checked={applyDuty}
              onChange={(e) => setApplyDuty(e.target.checked)}
              className="w-4 h-4 accent-black"
            />
            <span className="text-sm text-gray-600">Apply tariff / duty?</span>
          </label>
        </section>

        {/* Section 3: Additional Costs */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Section 3 — Additional Costs
          </p>
          <p className="text-sm text-gray-500 mb-5">
            One-time and per-unit costs beyond production and shipping.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Sample Cost (USD, one-time)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={sampleCost}
                  onChange={(e) => setSampleCost(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Packaging Cost per Unit (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={packagingPerUnit}
                  onChange={(e) => setPackagingPerUnit(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Payment Processing / Wire Fee (USD, flat)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={wireFee}
                  onChange={(e) => setWireFee(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Inspection Fee (USD, flat)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={inspectionFee}
                  onChange={(e) => setInspectionFee(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
                Domestic Freight (USD, flat)
              </label>
              <p className="text-xs text-gray-400 mb-1.5">
                Cost to move goods from port to warehouse.
              </p>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  $
                </span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={domesticFreight}
                  onChange={(e) => setDomesticFreight(e.target.value)}
                  placeholder="0.00"
                  className={inputWithPrefixClass}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Retail & Margin */}
        <section>
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
            Section 4 — Retail &amp; Margin
          </p>
          <p className="text-sm text-gray-500 mb-5">
            Enter your target retail price to calculate gross margin and markup.
          </p>
          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-widest">
              Target Retail Price (USD per unit)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                $
              </span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={retailPrice}
                onChange={(e) => setRetailPrice(e.target.value)}
                placeholder="0.00"
                className={inputWithPrefixClass}
              />
            </div>
          </div>
        </section>

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
              <span className="text-sm font-semibold tabular-nums">
                {totalUnits.toLocaleString()}
              </span>
            </div>

            {/* Production cost */}
            <div className="px-5 py-3 bg-gray-50">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Production Cost
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Production Cost (total)</span>
              <span className="text-sm font-semibold tabular-nums">
                {fmt(prodCostUSD * rate, symbol)}
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Production Cost per Unit</span>
              <span className="text-sm font-semibold tabular-nums">
                {totalUnits > 0 ? fmt(prodCostPerUnitUSD * rate, symbol) : "—"}
              </span>
            </div>

            {/* Landed cost */}
            <div className="px-5 py-3 bg-gray-50">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Landed Cost
              </span>
              <span className="text-xs text-gray-400 ml-2">
                (production + shipping{applyDuty ? " + duty" : ""})
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Duty Amount{!applyDuty && " (excluded)"}
              </span>
              <span className={`text-sm font-semibold tabular-nums ${!applyDuty ? "text-gray-400 line-through" : ""}`}>
                {fmt(prodCostUSD * (parseNum(dutyPct) / 100) * rate, symbol)}
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Landed Cost (total)</span>
              <span className="text-sm font-semibold tabular-nums">
                {fmt(landedCostUSD * rate, symbol)}
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Landed Cost per Unit</span>
              <span className="text-sm font-semibold tabular-nums">
                {totalUnits > 0 ? fmt(landedCostPerUnitUSD * rate, symbol) : "—"}
              </span>
            </div>

            {/* Fully loaded cost */}
            <div className="px-5 py-3 bg-gray-50">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                Fully Loaded Cost
              </span>
              <span className="text-xs text-gray-400 ml-2">
                (landed + sample + packaging + fees + inspection + domestic freight)
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-semibold">Fully Loaded Cost (total)</span>
              <span className="text-sm font-semibold tabular-nums">
                {fmt(fullyLoadedCostUSD * rate, symbol)}
              </span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between bg-gray-50">
              <span className="text-sm font-semibold">Fully Loaded Cost per Unit</span>
              <span className="text-sm font-semibold tabular-nums">
                {totalUnits > 0 ? fmt(fullyLoadedPerUnitUSD * rate, symbol) : "—"}
              </span>
            </div>

            {/* Retail & margin — only shown when retail > 0 */}
            {retail > 0 && (
              <>
                <div className="px-5 py-3 bg-gray-50">
                  <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    Retail &amp; Margin
                  </span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">Target Retail Price</span>
                  <span className="text-sm font-semibold tabular-nums">
                    {fmt(retail * rate, symbol)}
                  </span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Gross Margin %{" "}
                    <span className="text-xs text-gray-400">
                      (retail − fully loaded cost) / retail
                    </span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {grossMargin !== null ? pct(grossMargin) : "—"}
                  </span>
                </div>
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Markup %{" "}
                    <span className="text-xs text-gray-400">
                      (retail − production cost) / production cost
                    </span>
                  </span>
                  <span className="text-sm font-semibold tabular-nums">
                    {markup !== null ? pct(markup) : "—"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-4">
          Duty rates vary by HTS code, country of origin, and destination country. This calculator uses an estimated rate. Verify actual rates with your freight forwarder or customs broker before finalizing costs.
        </p>
        {currency !== "USD" && (
          <p className="text-xs text-gray-400 leading-relaxed -mt-4">
            Exchange rates are illustrative approximations and are not live. Verify current rates before making financial decisions.
          </p>
        )}
      </div>
    </div>
  );
}
