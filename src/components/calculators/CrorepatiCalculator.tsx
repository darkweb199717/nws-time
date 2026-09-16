'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateCrorepatiGoal } from '@/lib/calculations'
import { Copy, Check, DollarSign, TrendingUp, Percent } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function CrorepatiCalculator() {
  const [current, setCurrent] = useState('100000')
  const [monthly, setMonthly] = useState('10000')
  const [rate, setRate] = useState('12')
  const [copied, setCopied] = useState(false)

  const result = current && monthly && rate ? calculateCrorepatiGoal(parseInt(current), parseInt(monthly), parseFloat(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Crorepati Goal Plan:\nCurrent Savings: $${result.currentSavings.toLocaleString()}\nMonthly Investment: $${result.monthlyInvestment.toLocaleString()}\nTime to 1 Crore: ${result.yearsNeeded} years\nMonths Needed: ${result.monthsNeeded}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Crorepati Goal Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">Find out how long it will take to reach your ₹1 Crore goal with your current savings and monthly investments.</p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">Goal Details</h2>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-primary" />Current Savings</Label>
              <Input type="number" value={current} onChange={(e) => setCurrent(e.target.value)} className="h-10" />
              <input type="range" min="0" max="5000000" step="10000" value={current} onChange={(e) => setCurrent(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$0</span><span className="font-medium text-foreground">${parseInt(current||'0').toLocaleString()}</span><span>$50L</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5 text-primary" />Monthly Investment</Label>
              <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="h-10" />
              <input type="range" min="1000" max="500000" step="1000" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$1K</span><span className="font-medium text-foreground">${parseInt(monthly||'0').toLocaleString()}</span><span>$5L</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-primary" />Expected Return (%)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
              <input type="range" min="1" max="30" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>1%</span><span className="font-medium text-foreground">{rate}%</span><span>30%</span></div>
            </div>
            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Years Needed', value: `${result.yearsNeeded} yrs`, bg: 'from-indigo-500/10 to-purple-500/10', border: 'border-indigo-500/20', text: 'text-indigo-500' },
                  { label: 'Months Needed', value: `${result.monthsNeeded} mo`, bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
                  { label: 'Status', value: result.isAchievable ? '✅ Achievable' : '⚠️ Adjust', bg: result.isAchievable ? 'from-emerald-500/10 to-green-500/10' : 'from-red-500/10 to-orange-500/10', border: result.isAchievable ? 'border-emerald-500/20' : 'border-red-500/20', text: result.isAchievable ? 'text-emerald-500' : 'text-red-500' },
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>{item.value}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className={`p-6 border-2 ${result.isAchievable ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <h3 className="text-lg font-semibold mb-4">Target: $1 Crore</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div><div className="text-sm text-muted-foreground mb-1">Current Savings</div><div className="text-xl font-bold">${result.currentSavings.toLocaleString()}</div></div>
                  <div><div className="text-sm text-muted-foreground mb-1">Monthly Investment</div><div className="text-xl font-bold">${result.monthlyInvestment.toLocaleString()}</div></div>
                  <div><div className="text-sm text-muted-foreground mb-1">Target Amount</div><div className="text-xl font-bold text-primary">${result.targetAmount.toLocaleString()}</div></div>
                </div>
              </Card>

              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Plan Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Current Savings', value: `$${result.currentSavings.toLocaleString()}` },
                    { label: 'Monthly Investment', value: `$${result.monthlyInvestment.toLocaleString()}` },
                    { label: 'Expected Return Rate', value: `${rate}% p.a.` },
                    { label: 'Target Amount', value: `$${result.targetAmount.toLocaleString()}` },
                    { label: 'Time to Target', value: `${result.yearsNeeded} years (${result.monthsNeeded} months)` },
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
