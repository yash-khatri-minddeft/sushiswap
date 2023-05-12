import React from 'react'

import { getTreasurySnapshot } from '../lib'
import { HistoricalTreasury } from './HistoricalTreasury'
import { TreasuryBalancesTable } from './TreasuryBalancesTable'
import { TreasuryKpis } from './TreasuryKpis'

export async function TreasuryOverview() {
  const treasurySnapshot = await getTreasurySnapshot()

  return (
    <section className="space-y-14">
      <div className="space-y-8">
        <h2 className="ml-1 text-2xl font-bold text-slate-200">Treasury Overview</h2>
        <div className="grid grid-cols-[3fr,7fr] gap-4">
          <TreasuryKpis treasurySnapshot={treasurySnapshot} />
          {/* @ts-expect-error Async Server Component */}
          <HistoricalTreasury treasuryLiquidBalance={treasurySnapshot.balancesValueUsd} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="h-full w-full rounded-lg bg-[#1A2031] p-5">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm bg-[#BF60EE]" />
              <label className="text-sm text-slate-400">Expense</label>
            </div>
            <div className="h-4 rounded-full border border-gray-50/20 bg-gray-50/20" />
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm bg-blue" />
              <label className="text-sm text-slate-400">Revenue</label>
            </div>
          </div>
          <h3 className="mt-3 text-xl font-semibold">Quarterly Expenses vs. Revenue</h3>
          <div className="mt-10 w-full bg-slate-700">chart</div>
        </div>
        <div className="h-full w-full rounded-lg bg-[#1A2031] p-5">
          <div className="flex items-center gap-[14px]">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm bg-[#BF60EE]" />
              <label className="text-sm text-slate-400">Outflow</label>
            </div>
            <div className="h-4 rounded-full border border-gray-50/20 bg-gray-50/20" />
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-sm bg-blue" />
              <label className="text-sm text-slate-400">Inflow</label>
            </div>
          </div>
          <h3 className="mt-3 text-xl font-semibold">Token Netflow</h3>
          <div className="mt-10 w-full bg-slate-700">chart</div>
        </div>
      </div>
      <TreasuryBalancesTable balances={treasurySnapshot.balances} />
    </section>
  )
}
