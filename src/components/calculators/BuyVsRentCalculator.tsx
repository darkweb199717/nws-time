'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, Home, TrendingUp } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function BuyVsRentCalculator() {
  const [propertyPrice, setPropertyPrice] = useState('5000000')
  const [downPayment, setDownPayment] = useState('1000000')
  const [loanRate, setLoanRate] = useState('7')
  const [tenure, setTenure] = useState('20')
  const [rent, setRent] = useState('30000')
  const [rentIncrease, setRentIncrease] = useState('5')
  const [copied, setCopied] = useState(false)

  const loanAmount = parseInt(propertyPrice) - parseInt(downPayment)
  const monthlyRate = parseFloat(loanRate) / 12 / 100
  const months = parseInt(tenure) * 12
  const emi =
    loanAmount *
    ((monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1))

  const totalBuyingCost = parseInt(downPayment) + emi * months
  const totalRentingCost =
    parseInt(rent) * months +
    ((parseInt(rent) * parseInt(rentIncrease)) / 100) *
      months *
      months /
      2 /
      12

  const handleCopy = () => {
    const text = `Buy vs Rent Analysis:\nMonthly EMI: $${emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}\nMonthly Rent: $${parseInt(rent).toLocaleString()}\nTotal Buying Cost: $${totalBuyingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}\nTotal Renting Cost: $${totalRentingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}\nBetter Option: ${totalBuyingCost < totalRentingCost ? 'Buying' : 'Renting'}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isBuyingBetter = totalBuyingCost < totalRentingCost
  const savings = Math.abs(totalBuyingCost - totalRentingCost)

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Page Header */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">Buy vs Rent Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Compare the total cost of buying a home versus renting over time to make a smarter financial decision.
        </p>
      </motion.div>

      {/* Top Banner - Desktop */}
      <div className="hidden md:block">
        <Adsterra728 />
      </div>

      {/* Top Banner - Mobile */}
      <div className="block md:hidden">
        <Adsterra320 />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        {/* LEFT: Input Panel */}
        <motion.div
          className="xl:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">

            {/* Buying Details */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <Home className="w-4 h-4 text-primary" />
                Buying Details
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Property Price ($)</Label>
                  <Input
                    type="number"
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Down Payment ($)</Label>
                  <Input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Loan Rate (% p.a.)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={loanRate}
                    onChange={(e) => setLoanRate(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Tenure (Years)</Label>
                  <Input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            <div className="border-t border-border/40 pt-4 space-y-4">
              <h2 className="text-base font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                Renting Details
              </h2>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Monthly Rent ($)</Label>
                  <Input
                    type="number"
                    value={rent}
                    onChange={(e) => setRent(e.target.value)}
                    className="h-10"
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Annual Increase (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={rentIncrease}
                    onChange={(e) => setRentIncrease(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>
            </div>

            {/* 300x250 Ad - Desktop sidebar */}
            <div className="hidden xl:block pt-2">
              <Adsterra300x250 />
            </div>

          </Card>
        </motion.div>

        {/* RIGHT: Results Panel */}
        <div className="xl:col-span-3 space-y-6">

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Monthly Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
                <div className="text-sm text-muted-foreground mb-1">Monthly EMI</div>
                <div className="text-3xl font-bold text-blue-500">
                  ${emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </div>
                <div className="text-xs text-muted-foreground mt-1">If you buy</div>
              </Card>
              <Card className="p-5 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20">
                <div className="text-sm text-muted-foreground mb-1">Monthly Rent</div>
                <div className="text-3xl font-bold text-orange-500">
                  ${parseInt(rent).toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground mt-1">If you rent</div>
              </Card>
            </div>

            {/* Verdict Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card
                className={`p-6 border-2 ${
                  isBuyingBetter
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-violet-500/10 border-violet-500/30'
                }`}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className={`text-lg font-bold ${
                      isBuyingBetter ? 'text-emerald-500' : 'text-violet-500'
                    }`}
                  >
                    {isBuyingBetter ? '🏠 Buying is Better' : '🔑 Renting is Better'}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Buying Cost
                    </div>
                    <div className="text-xl font-bold">
                      ${totalBuyingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Total Renting Cost
                    </div>
                    <div className="text-xl font-bold">
                      ${totalRentingCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-border/30 sm:pl-4 pt-3 sm:pt-0">
                    <div className="text-sm text-muted-foreground mb-1">
                      You save
                    </div>
                    <div className="text-xl font-bold text-primary">
                      ${savings.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      by choosing {isBuyingBetter ? 'buying' : 'renting'}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Summary Table */}
            <Card className="p-5 border-border/50">
              <h3 className="text-base font-semibold mb-4">Detailed Breakdown</h3>
              <div className="space-y-3">
                {[
                  { label: 'Loan Amount', value: `$${loanAmount.toLocaleString()}` },
                  { label: 'Monthly EMI', value: `$${emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                  { label: 'Loan Tenure', value: `${tenure} years (${months} months)` },
                  { label: 'Total EMI Paid', value: `$${(emi * months).toLocaleString('en-IN', { maximumFractionDigits: 0 })}` },
                  { label: 'Down Payment', value: `$${parseInt(downPayment).toLocaleString()}` },
                  { label: 'Monthly Rent (start)', value: `$${parseInt(rent).toLocaleString()}` },
                  { label: 'Rent Annual Increase', value: `${rentIncrease}%` },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Copy Button */}
            <Button
              onClick={handleCopy}
              className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copied to Clipboard!' : 'Copy Results'}
            </Button>

            {/* 300x250 Ad - Mobile only */}
            <div className="block xl:hidden">
              <Adsterra300x250 />
            </div>

          </motion.div>
        </div>
      </div>

      {/* Bottom Banner - Desktop */}
      <div className="hidden md:block">
        <Adsterra728 />
      </div>

      {/* Bottom Banner - Mobile */}
      <div className="block md:hidden">
        <Adsterra320 />
      </div>

      {/* Adsterra Code Banner */}
      <AdsterraCodeBanner />

    </div>
  )
}
