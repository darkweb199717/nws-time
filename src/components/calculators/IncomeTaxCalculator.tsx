'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateIncomeTax } from '@/lib/calculations'
import { Copy, Check, DollarSign, Receipt } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function IncomeTaxCalculator() {
  const [income, setIncome] = useState('1000000')
  const [deductions, setDeductions] = useState('150000')
  const [copied, setCopied] = useState(false)

  const result = income ? calculateIncomeTax(parseInt(income), parseInt(deductions) || 0) : null

  const handleCopy = () => {
    if (result) {
      const text = `Income Tax Report:\nAnnual Income: $${result.annualIncome.toLocaleString()}\nDeductions: $${result.deductions.toLocaleString()}\nTaxable Income: $${result.taxableIncome.toLocaleString()}\nIncome Tax: $${result.tax.toLocaleString()}\nCess: $${result.cess.toLocaleString()}\nTotal Tax: $${result.totalTax.toLocaleString()}\nAfter Tax Income: $${result.afterTaxIncome.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Income Tax Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">Calculate your income tax liability based on your annual income and eligible deductions.</p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">Income Details</h2>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-primary" />Annual Income ($)</Label>
              <Input type="number" value={income} onChange={(e) => setIncome(e.target.value)} className="h-10" />
              <input type="range" min="100000" max="10000000" step="100000" value={income} onChange={(e) => setIncome(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$1L</span><span className="font-medium text-foreground">${parseInt(income||'0').toLocaleString()}</span><span>$1Cr</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><Receipt className="w-3.5 h-3.5 text-primary" />Deductions (80C etc.)</Label>
              <Input type="number" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="h-10" />
              <input type="range" min="0" max="500000" step="10000" value={deductions} onChange={(e) => setDeductions(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$0</span><span className="font-medium text-foreground">${parseInt(deductions||'0').toLocaleString()}</span><span>$5L</span></div>
            </div>
            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Total Tax Liability', value: `$${result.totalTax.toLocaleString()}`, bg: 'from-red-500/10 to-orange-500/10', border: 'border-red-500/20', text: 'text-red-500' },
                  { label: 'After Tax Income', value: `$${result.afterTaxIncome.toLocaleString()}`, bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>{item.value}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Tax Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Annual Income', value: `$${result.annualIncome.toLocaleString()}` },
                    { label: 'Deductions (80C etc.)', value: `-$${result.deductions.toLocaleString()}` },
                    { label: 'Taxable Income', value: `$${result.taxableIncome.toLocaleString()}` },
                    { label: 'Income Tax (Slab)', value: `$${result.tax.toLocaleString()}` },
                    { label: 'Health & Education Cess (4%)', value: `$${result.cess.toLocaleString()}` },
                    { label: 'Total Tax Liability', value: `$${result.totalTax.toLocaleString()}` },
                    { label: 'After Tax Income', value: `$${result.afterTaxIncome.toLocaleString()}` },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between text-sm py-1.5 border-b border-border/30 last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
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
