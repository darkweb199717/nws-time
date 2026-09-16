'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateDebtPayoff } from '@/lib/calculations'
import { Copy, Check, DollarSign, CreditCard, Percent } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function DebtPayoffCalculator() {
  const [debt, setDebt] = useState('100000')
  const [payment, setPayment] = useState('2000')
  const [rate, setRate] = useState('12')
  const [copied, setCopied] = useState(false)

  const result = debt && payment && rate ? calculateDebtPayoff(parseInt(debt), parseInt(payment), parseFloat(rate)) : null

  const handleCopy = () => {
    if (result) {
      const text = `Debt Payoff Plan:\nTotal Debt: $${result.totalDebt.toLocaleString()}\nMonthly Payment: $${result.monthlyPayment.toLocaleString()}\nPayoff Time: ${result.years} years\nTotal Interest: $${result.totalInterest.toLocaleString()}\nTotal Paid: $${result.totalPaid.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">
      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Debt Payoff Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">Find out exactly when you'll be debt-free and how much interest you'll pay along the way.</p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-6 sticky top-24">
            <h2 className="text-lg font-semibold">Debt Details</h2>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-primary" />Total Debt</Label>
              <Input type="number" value={debt} onChange={(e) => setDebt(e.target.value)} className="h-10" />
              <input type="range" min="10000" max="5000000" step="10000" value={debt} onChange={(e) => setDebt(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$10K</span><span className="font-medium text-foreground">${parseInt(debt||'0').toLocaleString()}</span><span>$50L</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-primary" />Monthly Payment</Label>
              <Input type="number" value={payment} onChange={(e) => setPayment(e.target.value)} className="h-10" />
              <input type="range" min="500" max="100000" step="500" value={payment} onChange={(e) => setPayment(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>$500</span><span className="font-medium text-foreground">${parseInt(payment||'0').toLocaleString()}</span><span>$1L</span></div>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1"><Percent className="w-3.5 h-3.5 text-primary" />Interest Rate (p.a.)</Label>
              <Input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="h-10" />
              <input type="range" min="1" max="36" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground"><span>1%</span><span className="font-medium text-foreground">{rate}%</span><span>36%</span></div>
            </div>
            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Payoff Time', value: `${result.years} years`, sub: `${result.months} months`, bg: 'from-emerald-500/10 to-green-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
                  { label: 'Total Interest', value: `$${result.totalInterest.toLocaleString()}`, sub: 'Interest paid', bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20', text: 'text-orange-500' },
                  { label: 'Total Paid', value: `$${result.totalPaid.toLocaleString()}`, sub: 'Principal + Interest', bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
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

              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Payoff Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Total Debt', value: `$${result.totalDebt.toLocaleString()}` },
                    { label: 'Monthly Payment', value: `$${result.monthlyPayment.toLocaleString()}` },
                    { label: 'Interest Rate', value: `${rate}% p.a.` },
                    { label: 'Total Months', value: `${result.months} months` },
                    { label: 'Total Interest Paid', value: `$${result.totalInterest.toLocaleString()}` },
                    { label: 'Total Amount Paid', value: `$${result.totalPaid.toLocaleString()}` },
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
