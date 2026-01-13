'use client';

import React, { useState, useMemo } from 'react';
import { Calculator, TrendingDown, MapPin, DollarSign, CheckCircle } from 'lucide-react';

interface PricingTier {
  name: string;
  minLocations: number;
  maxLocations: number | null;
  basePrice: number;
  pricePerLocation: number;
  discount: number;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    minLocations: 1,
    maxLocations: 1,
    basePrice: 299,
    pricePerLocation: 299,
    discount: 0,
    color: 'from-gray-500 to-gray-700',
  },
  {
    name: 'Professional',
    minLocations: 2,
    maxLocations: 5,
    basePrice: 699,
    pricePerLocation: 140, // $699 / 5 locations ≈ $140 per location
    discount: 10,
    color: 'from-cyan-500 to-blue-500',
  },
  {
    name: 'Growth',
    minLocations: 6,
    maxLocations: 15,
    basePrice: 1299,
    pricePerLocation: 87, // $1,299 / 15 locations ≈ $87 per location
    discount: 15,
    color: 'from-blue-500 to-purple-500',
  },
  {
    name: 'Enterprise',
    minLocations: 16,
    maxLocations: null,
    basePrice: 2499,
    pricePerLocation: 78, // $2,499 / 32 locations ≈ $78 per location (assuming 32 as example)
    discount: 20,
    color: 'from-purple-500 to-pink-500',
  },
];

export default function MultiLocationPricingCalculator() {
  const [locationCount, setLocationCount] = useState(1);

  const calculatedPricing = useMemo(() => {
    // Find the appropriate tier
    const tier = pricingTiers.find(
      (t) =>
        locationCount >= t.minLocations &&
        (t.maxLocations === null || locationCount <= t.maxLocations)
    ) || pricingTiers[0];

    // Calculate pricing
    const baseLocationPrice = 299; // Starter price per location
    const totalWithoutDiscount = baseLocationPrice * locationCount;
    
    let monthlyTotal: number;
    let effectivePricePerLocation: number;
    
    if (tier.name === 'Starter') {
      monthlyTotal = tier.basePrice;
      effectivePricePerLocation = tier.basePrice;
    } else {
      // For multi-location tiers, calculate based on tier pricing
      monthlyTotal = tier.basePrice;
      effectivePricePerLocation = monthlyTotal / locationCount;
    }

    const monthlySavings = totalWithoutDiscount - monthlyTotal;
    const annualTotal = monthlyTotal * 12;
    const annualSavings = monthlySavings * 12;
    const savingsPercentage = (monthlySavings / totalWithoutDiscount) * 100;

    return {
      tier,
      monthlyTotal,
      effectivePricePerLocation,
      monthlySavings,
      annualTotal,
      annualSavings,
      savingsPercentage,
      totalWithoutDiscount,
    };
  }, [locationCount]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationCount(parseInt(e.target.value));
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-gray-800 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-4">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <span className="text-cyan-400 font-medium">Multi-Location Pricing Calculator</span>
        </div>
        <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Calculate Your Savings
        </h2>
        <p className="text-gray-400 text-lg">
          See how much you save with volume discounts for multiple locations
        </p>
      </div>

      {/* Location Slider */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <label className="text-lg font-medium text-gray-300 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-cyan-400" />
            Number of Locations
          </label>
          <div className="text-3xl font-bold text-cyan-400">{locationCount}</div>
        </div>
        
        <input
          type="range"
          min="1"
          max="50"
          value={locationCount}
          onChange={handleSliderChange}
          className="w-full h-3 bg-gray-800 rounded-lg appearance-none cursor-pointer slider-thumb"
          style={{
            background: `linear-gradient(to right, rgb(6 182 212) 0%, rgb(6 182 212) ${((locationCount - 1) / 49) * 100}%, rgb(31 41 55) ${((locationCount - 1) / 49) * 100}%, rgb(31 41 55) 100%)`,
          }}
        />
        
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>1 location</span>
          <span>50+ locations</span>
        </div>
      </div>

      {/* Recommended Tier */}
      <div className={`mb-8 p-6 rounded-2xl bg-gradient-to-r ${calculatedPricing.tier.color} bg-opacity-10 border-2 border-current`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-6 h-6 text-white" />
              <span className="text-sm font-medium text-gray-300">Recommended Tier</span>
            </div>
            <h3 className="text-3xl font-bold text-white">{calculatedPricing.tier.name}</h3>
            <p className="text-gray-300 mt-1">
              {calculatedPricing.tier.minLocations === calculatedPricing.tier.maxLocations
                ? `${calculatedPricing.tier.minLocations} location`
                : calculatedPricing.tier.maxLocations
                ? `${calculatedPricing.tier.minLocations}-${calculatedPricing.tier.maxLocations} locations`
                : `${calculatedPricing.tier.minLocations}+ locations`}
              {calculatedPricing.tier.discount > 0 && (
                <span className="ml-2 inline-flex items-center gap-1 bg-green-500/20 border border-green-500/30 rounded-full px-2 py-0.5 text-xs text-green-400">
                  <TrendingDown className="w-3 h-3" />
                  {calculatedPricing.tier.discount}% off per location
                </span>
              )}
            </p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold text-white">
              ${calculatedPricing.monthlyTotal.toLocaleString()}
            </div>
            <div className="text-gray-300 mt-1">/month</div>
          </div>
        </div>
      </div>

      {/* Pricing Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Price Per Location */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-cyan-400" />
            <span className="text-sm text-gray-400">Per Location</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ${Math.round(calculatedPricing.effectivePricePerLocation)}
          </div>
          <div className="text-xs text-gray-500 mt-1">/month per location</div>
        </div>

        {/* Monthly Savings */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Monthly Savings</span>
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${calculatedPricing.monthlySavings > 0 ? calculatedPricing.monthlySavings.toLocaleString() : '0'}
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {calculatedPricing.savingsPercentage > 0 
              ? `${calculatedPricing.savingsPercentage.toFixed(0)}% discount`
              : 'No discount'}
          </div>
        </div>

        {/* Annual Total */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-400">Annual Total</span>
          </div>
          <div className="text-3xl font-bold text-white">
            ${calculatedPricing.annualTotal.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">/year</div>
        </div>

        {/* Annual Savings */}
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-400">Annual Savings</span>
          </div>
          <div className="text-3xl font-bold text-green-400">
            ${calculatedPricing.annualSavings > 0 ? calculatedPricing.annualSavings.toLocaleString() : '0'}
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. single-location pricing</div>
        </div>
      </div>

      {/* Comparison Table */}
      {locationCount > 1 && (
        <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <h4 className="text-lg font-bold mb-4 text-white">Pricing Comparison</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Without volume discount:</span>
              <span className="text-gray-300 font-mono">
                ${calculatedPricing.totalWithoutDiscount.toLocaleString()}/month
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">With {calculatedPricing.tier.name} tier:</span>
              <span className="text-cyan-400 font-mono font-bold">
                ${calculatedPricing.monthlyTotal.toLocaleString()}/month
              </span>
            </div>
            <div className="h-px bg-gray-700 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="text-green-400 font-medium">You save:</span>
              <span className="text-green-400 font-mono font-bold text-xl">
                ${calculatedPricing.monthlySavings > 0 ? calculatedPricing.monthlySavings.toLocaleString() : '0'}/month
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="mt-8 text-center">
        <a
          href="/signup"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg"
        >
          <span>Start Free Trial</span>
          <span className="text-sm opacity-80">→</span>
        </a>
        <p className="text-gray-400 text-sm mt-3">
          14-day free trial • No credit card required • Cancel anytime
        </p>
      </div>

      {/* Tier Indicators */}
      <div className="mt-8 grid grid-cols-4 gap-2">
        {pricingTiers.map((tier) => (
          <div
            key={tier.name}
            className={`p-3 rounded-lg text-center transition-all ${
              tier.name === calculatedPricing.tier.name
                ? `bg-gradient-to-r ${tier.color} text-white`
                : 'bg-gray-800/50 text-gray-500'
            }`}
          >
            <div className="text-xs font-medium">{tier.name}</div>
            <div className="text-xs opacity-75 mt-1">
              {tier.minLocations === tier.maxLocations
                ? `${tier.minLocations} loc`
                : tier.maxLocations
                ? `${tier.minLocations}-${tier.maxLocations} locs`
                : `${tier.minLocations}+ locs`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
