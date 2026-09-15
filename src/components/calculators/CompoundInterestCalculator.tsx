'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { calculateCompoundInterest } from '@/lib/calculations'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts'
import { Copy, Check, DollarSign, Percent, Calendar } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('100000')
  const [rate, setRate] = useState('8')
  const [years, setYears] = useState('10')
  const [copied, setCopied] = useState(false)

  const result =
    principal && rate && years
      ? calculateCompoundInterest(
          parseInt(principal),
          parseFloat(rate),
          parseInt(years)
        )
      : null

  const handleCopy = () => {
    if (result) {
      const text = `Compound Interest Calculator:\nPrincipal: $${result.principal.toLocaleString()}\nRate: ${rate}%\nYears: ${years}\nFinal Amount: $${result.finalAmount.toLocaleString()}\nInterest Earned: $${result.interest.toLocaleString()}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Page Header */}
      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Compound Interest Calculator
        </h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          See how your money grows over time with the power of compounding interest.
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
            <h2 className="text-lg font-semibold">Investment Details</h2>

            {/* Principal */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-primary" />
                Initial Investment
              </Label>
              <Input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                placeholder="100000"
                className="h-10"
              />
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10K</span>
                <span className="font-medium text-foreground">
                  ${parseInt(principal || '0').toLocaleString()}
                </span>
                <span>$1Cr</span>
              </div>
            </div>

            {/* Rate */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Percent className="w-3.5 h-3.5 text-primary" />
                Annual Interest Rate
              </Label>
              <Input
                type="number"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="8"
                className="h-10"
              />
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1%</span>
                <span className="font-medium text-foreground">{rate}%</span>
                <span>20%</span>
              </div>
            </div>

            {/* Years */}
            <div className="space-y-2">
              <Label className="text-sm font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-primary" />
                Time Period (Years)
              </Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                placeholder="10"
                className="h-10"
              />
              <input
                type="range"
                min="1"
                max="50"
                step="1"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1yr</span>
                <span className="font-medium text-foreground">{years} yrs</span>
                <span>50yrs</span>
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

          {result ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: 'Final Amount',
                    value: `$${result.finalAmount.toLocaleString()}`,
                    bg: 'from-blue-500/10 to-cyan-500/10',
                    border: 'border-blue-500/20',
                    text: 'text-blue-500',
                  },
                  {
                    label: 'Interest Earned',
                    value: `$${result.interest.toLocaleString()}`,
                    bg: 'from-emerald-500/10 to-green-500/10',
                    border: 'border-emerald-500/20',
                    text: 'text-emerald-500',
                  },
                  {
                    label: 'Return Multiple',
                    value: `${(result.finalAmount / result.principal).toFixed(2)}x`,
                    bg: 'from-purple-500/10 to-pink-500/10',
                    border: 'border-purple-500/20',
                    text: 'text-purple-500',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Card
                      className={`p-5 bg-gradient-to-br ${item.bg} border ${item.border}`}
                    >
                      <div className="text-sm text-muted-foreground mb-1">
                        {item.label}
                      </div>
                      <div className={`text-2xl md:text-3xl font-bold ${item.text}`}>
                        {item.value}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Area Chart */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Growth Over Time</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={result.yearlyData}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorInterest" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      formatter={(value) =>
                        `$${(value as number).toLocaleString()}`
                      }
                      contentStyle={{
                        backgroundColor: 'var(--background)',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '12px',
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stroke="#6366f1"
                      fill="url(#colorAmount)"
                      name="Total Amount"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      stroke="#10b981"
                      fill="url(#colorInterest)"
                      name="Interest Earned"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>

              {/* Breakdown Table */}
              <Card className="p-5 border-border/50">
                <h3 className="text-base font-semibold mb-4">Summary</h3>
                <div className="space-y-3">
                  {[
                    {
                      label: 'Initial Investment',
                      value: `$${result.principal.toLocaleString()}`,
                    },
                    {
                      label: 'Annual Interest Rate',
                      value: `${rate}%`,
                    },
                    {
                      label: 'Time Period',
                      value: `${years} years`,
                    },
                    {
                      label: 'Interest Earned',
                      value: `$${result.interest.toLocaleString()}`,
                    },
                    {
                      label: 'Final Amount',
                      value: `$${result.finalAmount.toLocaleString()}`,
                    },
                    {
                      label: 'Return Multiple',
                      value: `${(result.finalAmount / result.principal).toFixed(2)}x`,
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-sm py-1.5 border-b border-border/30 last:border-0"
                    >
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
          ) : (
            <Card className="p-12 border-border/50 text-center text-muted-foreground">
              Enter your investment details to see the results.
            </Card>
          )}

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
