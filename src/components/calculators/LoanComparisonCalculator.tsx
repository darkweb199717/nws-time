'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check, DollarSign, Percent, Calendar, Trophy } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

interface LoanInput {
  label: string
  amount: string
  rate: string
  years: string
}

function calculateLoan(amount: string, rate: string, years: string) {
  const p = parseInt(amount)
  const r = parseFloat(rate) / 12 / 100
  const n = parseInt(years) * 12
  if (!p || !r || !n) return null
  const emi = (p * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
  const totalAmount = emi * n
  const totalInterest = totalAmount - p
  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    months: n,
  }
}

const COLORS = [
  { bg: 'from-blue-500/10 to-cyan-500/10', border: 'border-blue-500/20', text: 'text-blue-500' },
  { bg: 'from-purple-500/10 to-pink-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
  { bg: 'from-orange-500/10 to-red-500/10', border: 'border-orange-500/20', text: 'text-orange-500' },
]

export default function LoanComparisonCalculator() {
  const [loans, setLoans] = useState<LoanInput[]>([
    { label: 'Loan Option 1', amount: '1000000', rate: '7', years: '10' },
    { label: 'Loan Option 2', amount: '1000000', rate: '8', years: '10' },
    { label: 'Loan Option 3', amount: '1000000', rate: '9', years: '10' },
  ])
  const [copied, setCopied] = useState(false)

  const results = loans.map((loan) => calculateLoan(loan.amount, loan.rate, loan.years))

  const bestIndex = results.reduce((bestIdx, result, idx) => {
    if (!result) return bestIdx
    if (bestIdx === -1) return idx
    const best = results[bestIdx]
    if (!best) return idx
    return result.totalInterest < best.totalInterest ? idx : bestIdx
  }, -1)

  const updateLoan = (index: number, field: keyof LoanInput, value: string) => {
    setLoans((prev) => prev.map((loan, i) => (i === index ? { ...loan, [field]: value } : loan)))
  }

  const handleCopy = () => {
    const text = loans
      .map((loan, i) => {
        const r = results[i]
        if (!r) return ''
        return `${loan.label}:\nAmount: $${parseInt(loan.amount).toLocaleString()} | Rate: ${loan.rate}% | Tenure: ${loan.years}yrs\nMonthly EMI: $${r.emi.toLocaleString()} | Total Interest: $${r.totalInterest.toLocaleString()} | Total: $${r.totalAmount.toLocaleString()}`
      })
      .join('\n\n')
    navigator.clipboard.writeText(`Loan Comparison:\n\n${text}\n\nBest Option: ${loans[bestIndex]?.label}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Loan Comparison Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Compare up to 3 loan offers side by side to find the best deal with the lowest total cost.
        </p>
      </motion.div>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      {/* Loan Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loans.map((loan, index) => (
          <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
            <Card className={`p-5 border ${COLORS[index].border} space-y-4`}>
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold">{loan.label}</h2>
                {bestIndex === index && results[index] && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-500 px-2 py-0.5 rounded-full">
                    <Trophy className="w-3 h-3" /> Best
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs font-medium flex items-center gap-1"><DollarSign className="w-3 h-3 text-primary" />Loan Amount ($)</Label>
                  <Input type="number" value={loan.amount} onChange={(e) => updateLoan(index, 'amount', e.target.value)} className="h-9 text-sm" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium flex items-center gap-1"><Percent className="w-3 h-3 text-primary" />Interest Rate (% p.a.)</Label>
                  <Input type="number" step="0.1" value={loan.rate} onChange={(e) => updateLoan(index, 'rate', e.target.value)} className="h-9 text-sm" />
                  <input type="range" min="1" max="20" step="0.1" value={loan.rate} onChange={(e) => updateLoan(index, 'rate', e.target.value)} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>1%</span><span className="font-medium text-foreground">{loan.rate}%</span><span>20%</span></div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-medium flex items-center gap-1"><Calendar className="w-3 h-3 text-primary" />Tenure (Years)</Label>
                  <Input type="number" value={loan.years} onChange={(e) => updateLoan(index, 'years', e.target.value)} className="h-9 text-sm" />
                  <input type="range" min="1" max="30" step="1" value={loan.years} onChange={(e) => updateLoan(index, 'years', e.target.value)} className="w-full accent-primary" />
                  <div className="flex justify-between text-xs text-muted-foreground"><span>1yr</span><span className="font-medium text-foreground">{loan.years} yrs</span><span>30yrs</span></div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* EMI Results */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.map((result, index) =>
          result ? (
            <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.1 }}>
              <Card className={`p-5 bg-gradient-to-br ${COLORS[index].bg} border ${COLORS[index].border}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">{loans[index].label}</span>
                  {bestIndex === index && <span className="text-xs font-semibold text-emerald-500">Best Deal</span>}
                </div>
                <div className={`text-2xl font-bold ${COLORS[index].text} mb-1`}>${result.emi.toLocaleString()}/mo</div>
                <div className="text-xs text-muted-foreground">Monthly EMI</div>
              </Card>
            </motion.div>
          ) : null
        )}
      </div>

      {/* Comparison Table */}
      <Card className="p-5 border-border/50 overflow-x-auto">
        <h3 className="text-base font-semibold mb-4">Side-by-Side Comparison</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 text-muted-foreground font-medium">Detail</th>
              {loans.map((loan, i) => (
                <th key={i} className={`text-right py-2 font-semibold ${COLORS[i].text}`}>
                  {loan.label} {bestIndex === i && results[i] ? '🏆' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: 'Loan Amount', values: loans.map((l) => `$${parseInt(l.amount || '0').toLocaleString()}`) },
              { label: 'Interest Rate', values: loans.map((l) => `${l.rate}%`) },
              { label: 'Tenure', values: loans.map((l) => `${l.years} years`) },
              { label: 'Monthly EMI', values: results.map((r) => (r ? `$${r.emi.toLocaleString()}` : '-')) },
              { label: 'Total Interest', values: results.map((r) => (r ? `$${r.totalInterest.toLocaleString()}` : '-')) },
              { label: 'Total Amount', values: results.map((r) => (r ? `$${r.totalAmount.toLocaleString()}` : '-')) },
            ].map((row, i) => (
              <tr key={i} className="border-b border-border/20 last:border-0">
                <td className="py-2.5 text-muted-foreground">{row.label}</td>
                {row.values.map((val, j) => (
                  <td key={j} className={`py-2.5 text-right font-medium ${bestIndex === j && i >= 3 ? 'text-emerald-500' : ''}`}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Best Option Card */}
      {bestIndex !== -1 && results[bestIndex] && (
        <Card className="p-5 bg-emerald-500/10 border-2 border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-semibold text-emerald-500">Best Option: {loans[bestIndex].label}</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {loans[bestIndex].label} has the lowest total interest of{' '}
            <span className="font-semibold text-foreground">${results[bestIndex]!.totalInterest.toLocaleString()}</span>{' '}
            — saving you the most money over the full loan tenure.
          </p>
        </Card>
      )}

      <div className="hidden md:block"><Adsterra300x250 /></div>
      <div className="block md:hidden"><Adsterra300x250 /></div>

      <Button onClick={handleCopy} className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
        {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
        {copied ? 'Copied to Clipboard!' : 'Copy Comparison Results'}
      </Button>

      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>
      <AdsterraCodeBanner />

    </div>
  )
}
