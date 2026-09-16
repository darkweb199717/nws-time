'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Copy, Check, TrendingUp, TrendingDown } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState({
    cash: 500000,
    savings: 1000000,
    investments: 2000000,
    home: 5000000,
    vehicles: 1500000,
  })
  const [liabilities, setLiabilities] = useState({
    mortgage: 2000000,
    carLoan: 500000,
    creditCard: 100000,
  })
  const [copied, setCopied] = useState(false)

  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0)
  const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0)
  const netWorth = totalAssets - totalLiabilities

  const handleCopy = () => {
    const text = `Net Worth Report:\nTotal Assets: $${totalAssets.toLocaleString()}\nTotal Liabilities: $${totalLiabilities.toLocaleString()}\nNet Worth: $${netWorth.toLocaleString()}`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const assetLabels: Record<string, string> = {
    cash: 'Cash & Bank',
    savings: 'Savings',
    investments: 'Investments',
    home: 'Home / Property',
    vehicles: 'Vehicles',
  }

  const liabilityLabels: Record<string, string> = {
    mortgage: 'Mortgage',
    carLoan: 'Car Loan',
    creditCard: 'Credit Card',
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Header */}
      <motion.div className="text-center space-y-2" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl md:text-4xl font-bold">Net Worth Calculator</h1>
        <p className="text-muted-foreground text-base max-w-xl mx-auto">
          Calculate your total net worth by adding up your assets and subtracting your liabilities.
        </p>
      </motion.div>

      {/* Top Banner */}
      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>

      {/* Summary Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-5 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">Total Assets</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-blue-500">${totalAssets.toLocaleString()}</div>
        </Card>
        <Card className="p-5 bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">Total Liabilities</span>
          </div>
          <div className="text-2xl md:text-3xl font-bold text-red-500">${totalLiabilities.toLocaleString()}</div>
        </Card>
        <Card className={`p-5 bg-gradient-to-br border ${netWorth >= 0 ? 'from-emerald-500/10 to-green-500/10 border-emerald-500/20' : 'from-red-500/10 to-pink-500/10 border-red-500/20'}`}>
          <div className="text-sm text-muted-foreground mb-2">Net Worth</div>
          <div className={`text-2xl md:text-3xl font-bold ${netWorth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
            {netWorth < 0 ? '-' : ''}${Math.abs(netWorth).toLocaleString()}
          </div>
        </Card>
      </motion.div>

      {/* Net Worth Progress Bar */}
      <Card className="p-5 border-border/50">
        <h3 className="text-base font-semibold mb-3">Assets vs Liabilities</h3>
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${totalAssets > 0 ? Math.min(100, Math.round(((totalAssets - totalLiabilities) / totalAssets) * 100)) : 0}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>Liabilities: ${totalLiabilities.toLocaleString()}</span>
          <span>Net: ${netWorth.toLocaleString()}</span>
          <span>Assets: ${totalAssets.toLocaleString()}</span>
        </div>
      </Card>

      {/* Assets & Liabilities Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Assets */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-blue-500/20">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-semibold">Assets</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(assets).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                  <label className="text-sm text-muted-foreground">{assetLabels[key] || key}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setAssets({ ...assets, [key]: parseInt(e.target.value) || 0 })}
                    className="w-36 px-3 py-1.5 text-right bg-muted rounded-md border border-border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              ))}
              <div className="pt-3 border-t border-blue-500/30 flex justify-between font-bold">
                <span>Total Assets</span>
                <span className="text-blue-500">${totalAssets.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Liabilities */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="p-6 border-red-500/20">
            <div className="flex items-center gap-2 mb-5">
              <TrendingDown className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold">Liabilities</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(liabilities).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center pb-3 border-b border-border/40 last:border-0">
                  <label className="text-sm text-muted-foreground">{liabilityLabels[key] || key}</label>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => setLiabilities({ ...liabilities, [key]: parseInt(e.target.value) || 0 })}
                    className="w-36 px-3 py-1.5 text-right bg-muted rounded-md border border-border text-sm font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
              ))}
              <div className="pt-3 border-t border-red-500/30 flex justify-between font-bold">
                <span>Total Liabilities</span>
                <span className="text-red-500">${totalLiabilities.toLocaleString()}</span>
              </div>
            </div>

            {/* 300x250 Ad inside liabilities card on desktop */}
            <div className="hidden md:block mt-6"><Adsterra300x250 /></div>
          </Card>
        </motion.div>
      </div>

      {/* 300x250 Ad - Mobile */}
      <div className="block md:hidden"><Adsterra300x250 /></div>

      {/* Net Worth Result Card */}
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <Card className={`p-6 border-2 ${netWorth >= 0 ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
          <h2 className="text-xl font-bold text-center mb-6">Your Net Worth Summary</h2>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Total Assets</div>
              <div className="text-xl font-bold text-blue-500">${totalAssets.toLocaleString()}</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-1">Total Liabilities</div>
              <div className="text-xl font-bold text-red-500">${totalLiabilities.toLocaleString()}</div>
            </div>
            <div className={`text-center p-4 rounded-lg ${netWorth >= 0 ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
              <div className="text-xs text-muted-foreground mb-1">Net Worth</div>
              <div className={`text-xl font-bold ${netWorth >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                {netWorth < 0 ? '-' : ''}${Math.abs(netWorth).toLocaleString()}
              </div>
            </div>
          </div>

          <Button onClick={handleCopy} className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Results'}
          </Button>
        </Card>
      </motion.div>

      {/* Bottom Banner */}
      <div className="hidden md:block"><Adsterra728 /></div>
      <div className="block md:hidden"><Adsterra320 /></div>
      <AdsterraCodeBanner />

    </div>
  )
}
