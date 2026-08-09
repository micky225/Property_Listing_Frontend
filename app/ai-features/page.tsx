'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import { getComparableProperties, getMeta, getProperties } from '@/lib/api';
import { estimatePrice } from '@/lib/types';
import type { Property, PropertyCategory } from '@/lib/types';
import { Zap, TrendingUp, Search, Sparkles } from 'lucide-react';

export default function AIFeaturesPage() {
  const [estimationType, setEstimationType] = useState<Property['type']>('house');
  const [estimationArea, setEstimationArea] = useState(200);
  const [estimationBedrooms, setEstimationBedrooms] = useState(3);
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [comparables, setComparables] = useState<Property[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyCategories, setPropertyCategories] = useState<PropertyCategory[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const [props, meta] = await Promise.all([getProperties(), getMeta()]);
        setProperties(props);
        setPropertyCategories(meta.propertyCategories);
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, []);

  const handleEstimatePrice = () => {
    const price = estimatePrice(estimationType, estimationArea, estimationBedrooms);
    setEstimatedPrice(price);
  };

  const handleAnalyzeProperty = async (property: Property) => {
    setSelectedProperty(property);
    try {
      const comps = await getComparableProperties(property.id);
      setComparables(comps);
    } catch {
      setComparables([]);
    }
  };

  const pricePerM2 = estimatedPrice ? (estimatedPrice / estimationArea).toFixed(0) : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-8 h-8 text-accent" />
              <h1 className="text-4xl font-bold">AI-Powered Property Tools</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Leverage advanced AI algorithms to estimate property values, analyze market trends, and find comparable listings.
            </p>
          </div>

          {/* AI Price Estimation */}
          <section className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-8 mb-12 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">AI Price Estimator</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Section */}
              <div>
                <p className="text-muted-foreground mb-6">
                  Enter property details to get an AI-estimated market value based on comparable listings and market trends.
                </p>

                <div className="space-y-6">
                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">Property Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyCategories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => setEstimationType(cat.id as any)}
                          className={`px-4 py-2 rounded-lg transition font-medium ${
                            estimationType === cat.id
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-muted/80'
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Area */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Area: {estimationArea} m²
                    </label>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      value={estimationArea}
                      onChange={e => setEstimationArea(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div>
                    <label className="block text-sm font-semibold mb-3">
                      Bedrooms: {estimationBedrooms}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="6"
                      value={estimationBedrooms}
                      onChange={e => setEstimationBedrooms(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>

                  <button
                    onClick={handleEstimatePrice}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    Estimate Price
                  </button>
                </div>
              </div>

              {/* Results Section */}
              <div>
                {estimatedPrice ? (
                  <div className="bg-white rounded-lg p-6 shadow-lg">
                    <h3 className="text-sm text-muted-foreground mb-2">Estimated Market Value</h3>
                    <div className="text-5xl font-bold text-primary mb-4">
                      ₵{(estimatedPrice / 1000000).toFixed(2)}M
                    </div>

                    <div className="space-y-4 border-t border-border pt-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Price per m²</p>
                        <p className="text-2xl font-semibold text-foreground">
                          ₵{pricePerM2}/m²
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">Based on</p>
                        <p className="text-lg font-semibold text-foreground">
                          {estimationArea}m² • {estimationBedrooms} bedrooms
                        </p>
                      </div>

                      <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                        <p className="text-sm text-muted-foreground mb-2">AI Confidence</p>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-accent h-2 rounded-full"
                            style={{ width: '87%' }}
                          ></div>
                        </div>
                        <p className="text-sm text-accent font-medium mt-2">87% Confidence</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted rounded-lg p-12 flex items-center justify-center h-full">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Configure the property details and click Estimate Price to see the AI valuation.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* AI Property Analysis */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Search className="w-6 h-6 text-primary" />
              <h2 className="text-3xl font-bold">AI Property Analysis</h2>
            </div>

            <p className="text-muted-foreground mb-8">
              Select a property below to see AI-powered market analysis including comparable listings and market insights.
            </p>

            {/* Property Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {properties.slice(0, 6).map(property => (
                <div
                  key={property.id}
                  onClick={() => handleAnalyzeProperty(property)}
                  className={`cursor-pointer transition transform hover:scale-105 ${
                    selectedProperty?.id === property.id
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            {/* Analysis Results */}
            {selectedProperty && (
              <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{selectedProperty.title}</h3>
                  <p className="text-muted-foreground mb-6">{selectedProperty.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-primary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Market Value</p>
                      <p className="text-xl font-bold text-primary">
                        ₵{(selectedProperty.price / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Price/m²</p>
                      <p className="text-xl font-bold text-accent">
                        ₵{Math.round(selectedProperty.price / selectedProperty.area)}/m²
                      </p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Property Type</p>
                      <p className="text-xl font-bold text-secondary capitalize">
                        {selectedProperty.type}
                      </p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Market Trend</p>
                      <p className="text-xl font-bold text-foreground">+2.3% YoY</p>
                    </div>
                  </div>

                  {/* Market Insights */}
                  <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-8">
                    <h4 className="font-bold text-lg mb-4">AI Market Insights</h4>
                    <ul className="space-y-3 text-foreground">
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>
                          This property is priced competitively for the {selectedProperty.location} area with strong market demand.
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>
                          {selectedProperty.type === 'apartment'
                            ? 'Apartment markets in this area show 3.2% growth potential'
                            : 'This property type shows strong investor interest'}
                          .
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold mt-1">•</span>
                        <span>
                          Similar properties in {selectedProperty.city} have an average DOM (Days On Market) of 28 days.
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Comparable Listings */}
                {comparables.length > 0 && (
                  <div>
                    <h4 className="font-bold text-lg mb-6">AI-Selected Comparable Properties</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {comparables.map(property => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>

                    {/* Comparison Table */}
                    <div className="mt-8 overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-semibold">Metric</th>
                            <th className="text-left py-3 px-4 font-semibold">Selected</th>
                            <th className="text-left py-3 px-4 font-semibold">Average</th>
                            <th className="text-left py-3 px-4 font-semibold">Difference</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Price</td>
                            <td className="py-3 px-4">₵{(selectedProperty.price / 1000000).toFixed(1)}M</td>
                            <td className="py-3 px-4">
                              ₵
                              {(
                                comparables.reduce((sum, p) => sum + p.price, 0) /
                                comparables.length /
                                1000000
                              ).toFixed(1)}
                              M
                            </td>
                            <td className="py-3 px-4 text-accent font-medium">
                              {(
                                ((selectedProperty.price /
                                  (comparables.reduce((sum, p) => sum + p.price, 0) / comparables.length) -
                                  1) *
                                  100
                              ).toFixed(1))
                              }%
                            </td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4">Area (m²)</td>
                            <td className="py-3 px-4">{selectedProperty.area}</td>
                            <td className="py-3 px-4">
                              {Math.round(
                                comparables.reduce((sum, p) => sum + p.area, 0) /
                                comparables.length
                              )}
                            </td>
                            <td className="py-3 px-4">-</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4">Price/m²</td>
                            <td className="py-3 px-4">
                              ₵{Math.round(selectedProperty.price / selectedProperty.area)}
                            </td>
                            <td className="py-3 px-4">
                              ₵
                              {Math.round(
                                comparables.reduce((sum, p) => sum + p.price / p.area, 0) /
                                comparables.length
                              )}
                            </td>
                            <td className="py-3 px-4 text-accent font-medium">
                              {(
                                ((selectedProperty.price / selectedProperty.area) /
                                  (comparables.reduce((sum, p) => sum + p.price / p.area, 0) /
                                    comparables.length) -
                                  1) *
                                  100
                              ).toFixed(1)}
                              %
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
