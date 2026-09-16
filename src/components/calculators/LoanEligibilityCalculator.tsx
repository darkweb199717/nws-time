'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateLoanEligibility } from '@/lib/calculations'
import { Copy, Check, DollarSign, CreditCard } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function LoanEligibilityCalculator() {
  const [income, setIncome] = useState('50000')
  const [liabilities, setLiabilities] = useState('100000')
  const [copied, setCopied] = useState(false)

  const result = income ? calculateLoanEligibility(parseInt(income), parseInt(liabilities) || 0) : null

  const handleCopy = () => {
    if (result) {
      const text = `Loan Eligibility Report:\nMonthly Income: $${result.monthlyIncome.toLocaleString()}\nMax Eligible: $${result.maxEligible.toLocaleString()}\nExisting Liabilities: $${result.existingLiabilities.toLocaleString()}\nEligible Amount: $${result.eligibleAmount.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Loan Eligibility Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Find out how much loan you are eligible for based on your monthly income and existing liabilities.
        </p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">Income Details</h2>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />Monthly Income ($)
              </Label>
              <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} placeholder="50000" className="h-10" />
              <input type="range" min="10000" max="5000000" step="10000" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10K</span>
                <span className="font-medium text-foreground">${parseInt(income || '0').toLocaleString()}</span>
                <span>$50L</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <CreditCard className="w-3.5 h-3.5 text-primary" />Existing Liabilities ($)
              </Label>
              <Input type="number" value={liabilities} onChange={(e) => setLiabilities(e.target.value)} placeholder="0" className="h-10" />
              <input type="range" min="0" max="10000000" step="50000" value={liabilities} onChange={(e) => setLiabilities(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$0</span>
                <span className="font-medium text-foreground">${parseInt(liabilities || '0').toLocaleString()}</span>
                <span>$1Cr</span>
              </div>
            </div>

            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Max Eligible Amount', value: `$${result.maxEligible.toLocaleString()}`, sub: '50x monthly income', bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
                  { label: 'Final Eligible Amount', value: `$${result.eligibleAmount.toLocaleString()}`, sub: 'After existing liabilities', bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>{item.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{item.sub}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Eligibility bar */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Eligibility Score</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Used by liabilities</span>
                    <span className="font-medium">
                      {result.maxEligible > 0 ? Math.min(100, Math.round((result.existingLiabilities / result.maxEligible) * 100)) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${result.maxEligible > 0 ? Math.min(100, 100 - Math.round((result.existingLiabilities / result.maxEligible) * 100)) : 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Liabilities: ${result.existingLiabilities.toLocaleString()}</span>
                    <span>Available: ${result.eligibleAmount.toLocaleString()}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Eligibility Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Monthly Income', value: `$${result.monthlyIncome.toLocaleString()}` },
                    { label: 'Max Eligibility (50x income)', value: `$${result.maxEligible.toLocaleString()}` },
                    { label: 'Existing Liabilities', value: `-$${result.existingLiabilities.toLocaleString()}`, red: true },
                    { label: 'Final Loan Eligible', value: `$${result.eligibleAmount.toLocaleString()}` },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className={`font-medium ${item.red ? 'text-red-500' : ''}`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Button onClick={handleCopy} className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied to Clipboard!' : 'Copy Results'}
              </Button>

              <div className="block xl:hidden"><Adsterra300x250 /></div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>
      <AdsterraCodeBanner />

    </div>
  )
}
