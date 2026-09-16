'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRD } from '@/lib/calculations'
import { Copy, Check, DollarSign, Percent, Calendar } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function RDCalculator() {
  const [monthly, setMonthly] = useState('5000')
  const [rate, setRate] = useState('6')
  const [months, setMonths] = useState('60')
  const [copied, setCopied] = useState(false)

  const result = monthly && rate ? calculateRD(parseInt(monthly), parseFloat(rate), parseInt(months)) : null

  const handleCopy = () => {
    if (result) {
      const text = `RD Calculator:\nMonthly: $${result.monthlyAmount.toLocaleString()}\nTotal Invested: $${result.totalInvested.toLocaleString()}\nInterest: $${result.interest.toLocaleString()}\nMaturity Value: $${result.maturityValue.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">RD Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Calculate your Recurring Deposit maturity value, total interest earned, and investment summary.
        </p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">RD Details</h2>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />Monthly Amount ($)
              </Label>
              <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-10" />
              <input type="range" min="500" max="500000" step="500" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$500</span>
                <span className="font-medium text-foreground">${parseInt(monthly || '0').toLocaleString()}</span>
                <span>$5L</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-primary" />Interest Rate (p.a.)
              </Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
              <input type="range" min="1" max="15" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span className="font-medium text-foreground">{rate}%</span>
                <span>15%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />Duration (Months)
              </Label>
              <Input type="number" value={months} onChange={(e) => setMonths(e.target.value)} className="h-10" />
              <input type="range" min="6" max="120" step="6" value={months} onChange={(e) => setMonths(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6mo</span>
                <span className="font-medium text-foreground">{months} mo</span>
                <span>120mo</span>
              </div>
            </div>

            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Total Invested', value: `$${result.totalInvested.toLocaleString()}`, bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
                  { label: 'Interest Earned', value: `$${result.interest.toLocaleString()}`, bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
                  { label: 'Maturity Value', value: `$${result.maturityValue.toLocaleString()}`, bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>{item.value}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Growth Bar */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-3">Investment Growth</h3>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${result.maturityValue > 0 ? Math.round((result.totalInvested / result.maturityValue) * 100) : 0}%` }}
                  />
                  <div className="h-full bg-emerald-500 flex-1 transition-all duration-500" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" />Invested: ${result.totalInvested.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Interest: ${result.interest.toLocaleString()}</span>
                </div>
              </Card>

              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">RD Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Monthly Deposit', value: `$${result.monthlyAmount.toLocaleString()}` },
                    { label: 'Interest Rate', value: `${rate}% p.a.` },
                    { label: 'Duration', value: `${months} months (${Math.round(parseInt(months) / 12 * 10) / 10} years)` },
                    { label: 'Total Invested', value: `$${result.totalInvested.toLocaleString()}` },
                    { label: 'Interest Earned', value: `$${result.interest.toLocaleString()}` },
                    { label: 'Maturity Value', value: `$${result.maturityValue.toLocaleString()}` },
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
