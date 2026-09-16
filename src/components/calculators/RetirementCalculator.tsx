'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateRetirement } from '@/lib/calculations'
import { Copy, Check, User, DollarSign, Percent, Calendar } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('35')
  const [retirementAge, setRetirementAge] = useState('60')
  const [savings, setSavings] = useState('500000')
  const [annualSavings, setAnnualSavings] = useState('300000')
  const [expectedReturn, setExpectedReturn] = useState('9')
  const [expenses, setExpenses] = useState('50000')
  const [copied, setCopied] = useState(false)

  const result = currentAge && retirementAge
    ? calculateRetirement(
        parseInt(currentAge),
        parseInt(retirementAge),
        parseInt(savings),
        parseInt(annualSavings),
        parseFloat(expectedReturn),
        parseInt(expenses)
      )
    : null

  const handleCopy = () => {
    if (result) {
      const text = `Retirement Plan:\nYears to Retirement: ${result.yearsToRetirement}\nProjected Corpus: $${result.projectedCorpus.toLocaleString()}\nNeeded Corpus: $${result.neededCorpus.toLocaleString()}\nSurplus/Deficit: $${result.surplus.toLocaleString()}\nStatus: ${result.isSufficient ? 'Sufficient' : 'Insufficient'}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Retirement Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Plan your retirement by calculating your projected corpus and whether it covers your post-retirement expenses.
        </p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

        <motion.div className="xl:col-span-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-border/50 space-y-5 sticky top-24">
            <h2 className="text-lg font-semibold">Personal Details</h2>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-primary" />Current Age
              </Label>
              <Input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="h-10" />
              <input type="range" min="18" max="70" step="1" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>18</span><span className="font-medium text-foreground">{currentAge} yrs</span><span>70</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />Retirement Age
              </Label>
              <Input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="h-10" />
              <input type="range" min="40" max="80" step="1" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>40</span><span className="font-medium text-foreground">{retirementAge} yrs</span><span>80</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />Current Savings ($)
              </Label>
              <Input type="number" value={savings} onChange={(e) => setSavings(e.target.value)} className="h-10" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />Annual Savings ($)
              </Label>
              <Input type="number" value={annualSavings} onChange={(e) => setAnnualSavings(e.target.value)} className="h-10" />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-primary" />Expected Return (%)
              </Label>
              <Input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="h-10" />
              <input type="range" min="1" max="20" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="w-full accent-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span><span className="font-medium text-foreground">{expectedReturn}%</span><span>20%</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />Monthly Expenses ($)
              </Label>
              <Input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} className="h-10" />
            </div>

            <div className="hidden xl:block pt-2"><Adsterra300x250 /></div>
          </Card>
        </motion.div>

        <div className="xl:col-span-3 space-y-6">
          {result && (
            <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { label: 'Years to Retire', value: `${result.yearsToRetirement} yrs`, bg: 'from-indigo-500/10 to-purple-500/10', border: 'border-indigo-500/20', text: 'text-indigo-500' },
                  { label: 'Projected Corpus', value: `$${result.projectedCorpus.toLocaleString()}`, bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
                  { label: 'Needed Corpus', value: `$${result.neededCorpus.toLocaleString()}`, bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20', text: 'text-orange-500' },
                ].map((item, index) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
                    <Card className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}>
                      <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>{item.value}</div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Status Card */}
              <Card className={`p-6 border-2 ${result.isSufficient ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                <h3 className="text-lg font-semibold mb-4">
                  {result.isSufficient ? '✅ Retirement Goal on Track!' : '⚠️ Shortfall Alert'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Projected Corpus</div>
                    <div className="text-xl font-bold">${result.projectedCorpus.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Required Corpus</div>
                    <div className="text-xl font-bold">${result.neededCorpus.toLocaleString()}</div>
                  </div>
                  <div className="border-t sm:border-t-0 sm:border-l border-border/30 sm:pl-4 pt-3 sm:pt-0">
                    <div className="text-sm text-muted-foreground mb-1">{result.surplus >= 0 ? 'Surplus' : 'Deficit'}</div>
                    <div className={`text-xl font-bold ${result.surplus >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {result.surplus < 0 ? '-' : ''}${Math.abs(result.surplus).toLocaleString()}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Progress Bar */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-3">Corpus Progress</h3>
                <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${result.isSufficient ? 'bg-gradient-to-r from-blue-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'}`}
                    style={{ width: `${Math.min(100, Math.round((result.projectedCorpus / result.neededCorpus) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Projected: ${result.projectedCorpus.toLocaleString()}</span>
                  <span>{Math.min(100, Math.round((result.projectedCorpus / result.neededCorpus) * 100))}% of goal</span>
                  <span>Needed: ${result.neededCorpus.toLocaleString()}</span>
                </div>
              </Card>

              {/* Timeline */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Retirement Summary</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Current Age', value: `${currentAge} years` },
                    { label: 'Retirement Age', value: `${retirementAge} years` },
                    { label: 'Years to Retirement', value: `${result.yearsToRetirement} years` },
                    { label: 'Current Savings', value: `$${parseInt(savings).toLocaleString()}` },
                    { label: 'Annual Savings', value: `$${parseInt(annualSavings).toLocaleString()}` },
                    { label: 'Expected Return', value: `${expectedReturn}% p.a.` },
                    { label: 'Monthly Expenses', value: `$${parseInt(expenses).toLocaleString()}` },
                    { label: 'Projected Corpus', value: `$${result.projectedCorpus.toLocaleString()}` },
                    { label: 'Required Corpus', value: `$${result.neededCorpus.toLocaleString()}` },
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
