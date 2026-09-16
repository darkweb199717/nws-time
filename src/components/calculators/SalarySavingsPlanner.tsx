'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Copy, Check } from 'lucide-react'

import Adsterra728 from '@/components/Adsterra728'
import Adsterra300x250 from '@/components/Adsterra300x250'
import Adsterra320 from '@/components/Adsterra320'
import AdsterraCodeBanner from '@/components/Adsterra_CodeBanner'

export default function SalarySavingsPlanner() {
  const [salary, setSalary] = useState('100000')
  const [expenses, setExpenses] = useState('70000')
  const [copied, setCopied] = useState(false)

  const salaryValue = parseInt(salary || '0')
  const expensesValue = parseInt(expenses || '0')

  const savings = Math.max(0, salaryValue - expensesValue)

  const savingsRate =
    salaryValue > 0
      ? ((savings / salaryValue) * 100).toFixed(1)
      : '0'

  const expenseRate =
    salaryValue > 0
      ? ((expensesValue / salaryValue) * 100).toFixed(1)
      : '0'

  const handleCopy = () => {
    const text = `Salary Savings Plan:
Monthly Salary: $${salaryValue.toLocaleString()}
Monthly Expenses: $${expensesValue.toLocaleString()}
Monthly Savings: $${savings.toLocaleString()}
Savings Rate: ${savingsRate}%
Annual Savings: $${(savings * 12).toLocaleString()}`

    navigator.clipboard.writeText(text)
    setCopied(true)

    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 space-y-8">

      {/* Desktop 728x90 */}
      <div className="hidden md:block">
        <Adsterra728 />
      </div>

      {/* Mobile 320x50 */}
      <div className="block md:hidden">
        <Adsterra320 />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Income & Expenses */}
        <div className="lg:col-span-1 space-y-6">

          <Card className="p-6 border-border/50">
            <h2 className="text-xl font-bold mb-6">
              Monthly Income & Expenses
            </h2>

            <div className="space-y-6">

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Monthly Salary ($)
                </Label>

                <Input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="h-10"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Monthly Expenses ($)
                </Label>

                <Input
                  type="number"
                  value={expenses}
                  onChange={(e) => setExpenses(e.target.value)}
                  className="h-10"
                />
              </div>

            </div>
          </Card>

          {/* Desktop 300x250 */}
          <div className="hidden lg:flex justify-center">
            <Adsterra300x250 />
          </div>

        </div>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
            <div className="text-sm text-muted-foreground mb-1">
              Monthly Savings
            </div>

            <div className="text-4xl font-bold">
              ${savings.toLocaleString()}
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
            <div className="text-sm text-muted-foreground mb-1">
              Savings Rate
            </div>

            <div className="text-4xl font-bold">
              {savingsRate}%
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20">
            <div className="text-sm text-muted-foreground mb-1">
              Annual Savings
            </div>

            <div className="text-4xl font-bold">
              ${(savings * 12).toLocaleString()}
            </div>
          </Card>

        </div>
      </div>

      {/* Breakdown */}
      <Card className="p-6 border-border/50">
        <h3 className="text-lg font-semibold mb-6">
          Breakdown
        </h3>

        <div className="space-y-4">

          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <div>
              <div className="text-muted-foreground text-sm">
                Monthly Salary
              </div>

              <div className="font-semibold">
                ${salaryValue.toLocaleString()}
              </div>
            </div>

            <div className="text-2xl font-bold text-primary">
              100%
            </div>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-border/50">
            <div>
              <div className="text-muted-foreground text-sm">
                Monthly Expenses
              </div>

              <div className="font-semibold">
                ${expensesValue.toLocaleString()}
              </div>
            </div>

            <div className="text-2xl font-bold text-red-500">
              {expenseRate}%
            </div>
          </div>

          <div className="flex justify-between items-center pt-2 bg-muted/50 p-4 rounded-lg">
            <div>
              <div className="text-muted-foreground text-sm">
                Monthly Savings
              </div>

              <div className="font-semibold">
                ${savings.toLocaleString()}
              </div>
            </div>

            <div className="text-2xl font-bold text-green-500">
              {savingsRate}%
            </div>
          </div>

        </div>
      </Card>

      {/* Copy Results */}
      <Button
        onClick={handleCopy}
        className="w-full bg-gradient-to-r from-primary to-accent h-12"
      >
        {copied ? (
          <Check className="w-4 h-4 mr-2" />
        ) : (
          <Copy className="w-4 h-4 mr-2" />
        )}

        {copied ? 'Copied!' : 'Copy Results'}
      </Button>

      {/* Bottom Code Banner */}
      <AdsterraCodeBanner />

    </div>
  )
}
