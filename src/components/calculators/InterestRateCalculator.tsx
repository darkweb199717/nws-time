'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateSimpleInterest } from '@/lib/calculations'
import { Copy, Check, DollarSign, Percent, Calendar } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function InterestRateCalculator() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('5')
  const [copied, setCopied] = useState(false)

  const result = principal && rate && years ? calculateSimpleInterest(parseInt(principal), parseFloat(rate), parseFloat(years)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Interest Calculation:\nPrincipal: $${result.principal.toLocaleString()}\nRate: ${result.rate}%\nYears: ${result.years}\nSimple Interest: $${result.interest.toLocaleString()}\nTotal Amount: $${result.amount.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Simple Interest Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">Calculate simple interest on any principal amount using the standard SI = (P × R × T) / 100 formula.</p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">Loan Details</h2>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-primary" />Principal Amount ($)</Label>
              <Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="h-10" />
              <input type="range" min="1000" max="10000000" step="1000" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$1K</span><span className="font-medium text-foreground">${parseInt(principal||'0').toLocaleString()}</span><span>$1Cr</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-primary" />Interest Rate (p.a.)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
              <input type="range" min="1" max="30" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>1%</span><span className="font-medium text-foreground">{rate}%</span><span>30%</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-primary" />Time Period (Years)</Label>
              <Input type="number" step="0.1" value={years} onChange={(e) => setYears(e.target.value)} className="h-10" />
              <input type="range" min="0.5" max="30" step="0.5" value={years} onChange={(e) => setYears(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>0.5yr</span><span className="font-medium text-foreground">{years} yrs</span><span>30yrs</span></div>
            </div>
            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Simple Interest', value: `$${result.interest.toLocaleString()}`, bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
                  { label: 'Total Amount', value: `$${result.amount.toLocaleString()}`, bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
                  { label: 'Interest %', value: `${((result.interest / result.principal) * 100).toFixed(1)}%`, bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
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
                <h3 className="text-base font-semibold mb-4">Calculation Details</h3>
                <div className="mb-3 p-3 bg-muted/50 rounded-lg text-sm text-center font-mono">
                  SI = (P × R × T) / 100
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'Principal (P)', value: `$${result.principal.toLocaleString()}` },
                    { label: 'Rate (R)', value: `${result.rate}% p.a.` },
                    { label: 'Time (T)', value: `${result.years} years` },
                    { label: 'Simple Interest', value: `$${result.interest.toLocaleString()}` },
                    { label: 'Total Amount (P + SI)', value: `$${result.amount.toLocaleString()}` },
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
