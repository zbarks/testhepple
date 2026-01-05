import React, { useMemo, useState } from 'react';
// @ts-ignore
import tracker from '../analytics';
import { motion } from 'framer-motion';

const Dashboard: React.FC = () => {
  const [refresh, setRefresh] = useState(0);
  const stats = useMemo(() => tracker.getAggregatedData(), [refresh]) as any;
  const rawData = useMemo(() => tracker.getRawData(), [refresh]) as any[];

  const sortedClicks = Object.entries(stats.clicks as Record<string, number>)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 8);

  const sortedHovers = Object.entries(stats.hovers as Record<string, number>)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 8);

  // Process recent events from the flat log structure
  const recentEvents = rawData
    .map(e => ({
        type: e.event_type,
        target: e.element_id,
        path: e.page,
        timestamp: e.timestamp
    }))
    .sort((a, b) => (b.timestamp as number) - (a.timestamp as number))
    .slice(0, 15);

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-8 pt-32 pb-24">
      <div className="max-w-screen-2xl mx-auto space-y-16">
        
        {/* Header */}
        <header className="flex justify-between items-end border-b border-white/5 pb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.5em] text-[#555] block mb-4">Internal Console</span>
            <h1 className="serif text-6xl italic">Intelligence Dashboard</h1>
          </div>
          <button 
            onClick={() => setRefresh(r => r + 1)}
            className="px-8 py-3 border border-white/10 text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Refresh Intel
          </button>
        </header>

        {/* High Level Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: 'Total Page Views', value: stats.totalViews },
            { label: 'Active Sessions', value: stats.totalSessions },
            { label: 'Avg. View Time', value: `${stats.avgViewTime}s` },
            { label: 'Avg. Scroll Depth', value: `${stats.avgScroll}%` }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 p-8 flex flex-col justify-between"
            >
              <span className="text-[9px] uppercase tracking-widest text-[#555] mb-8">{stat.label}</span>
              <span className="serif text-4xl italic">{stat.value as React.ReactNode}</span>
            </motion.div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Most Clicked Elements (Click Map Summary) */}
          <div className="bg-white/[0.02] border border-white/5 p-12">
            <h2 className="serif text-3xl italic mb-12">Interaction Heatmap (Clicks)</h2>
            <div className="space-y-6">
              {sortedClicks.map(([target, count], i) => {
                const maxCount = (sortedClicks[0][1] as number) || 1;
                const percentage = Math.max(5, ((count as number) / maxCount) * 100);
                return (
                  <div key={i} className="group">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#888] mb-2">
                      <span className="truncate max-w-[80%]">{target as React.ReactNode}</span>
                      <span>{count as React.ReactNode} interactions</span>
                    </div>
                    <div className="h-1 bg-white/5 w-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="absolute h-full bg-[#6d7e6d]"
                      />
                    </div>
                  </div>
                );
              })}
              {sortedClicks.length === 0 && <p className="text-[#333] italic text-sm">No click data available yet.</p>}
            </div>
          </div>

          {/* Hover Intent (Aesthetics Heatmap) */}
          <div className="bg-white/[0.02] border border-white/5 p-12">
            <h2 className="serif text-3xl italic mb-12">Visual Engagement (Hovers)</h2>
            <div className="space-y-6">
              {sortedHovers.map(([target, count], i) => {
                const maxCount = (sortedHovers[0][1] as number) || 1;
                const percentage = Math.max(5, ((count as number) / maxCount) * 100);
                return (
                  <div key={i} className="group">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-[#888] mb-2">
                      <span className="truncate max-w-[80%]">{target as React.ReactNode}</span>
                      <span>{count as React.ReactNode} focuses</span>
                    </div>
                    <div className="h-1 bg-white/5 w-full relative overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        className="absolute h-full bg-white/30"
                      />
                    </div>
                  </div>
                );
              })}
              {sortedHovers.length === 0 && <p className="text-[#333] italic text-sm">No hover data available yet.</p>}
            </div>
          </div>

        </div>

        {/* Live Event Stream */}
        <div className="bg-white/[0.02] border border-white/5 p-12">
          <h2 className="serif text-3xl italic mb-12">Real-time Pulse</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[9px] uppercase tracking-[0.4em] text-[#555] border-b border-white/10">
                  <th className="pb-6">Event</th>
                  <th className="pb-6">Target</th>
                  <th className="pb-6">Route</th>
                  <th className="pb-6 text-right">Time</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {recentEvents.map((e, i) => (
                  <tr key={i} className="border-b border-white/[0.03] group hover:bg-white/[0.01] transition-colors">
                    <td className="py-6">
                      <span className={`px-3 py-1 text-[8px] uppercase tracking-widest font-bold ${
                        e.type === 'click' ? 'bg-[#2d3a2d] text-white' : 
                        e.type === 'hover' ? 'bg-white/10 text-white' : 
                        'bg-white/5 text-[#555]'
                      }`}>
                        {e.type}
                      </span>
                    </td>
                    <td className="py-6 text-[#888] truncate max-w-[200px]">{e.target || '-'}</td>
                    <td className="py-6 italic text-[#555]">{e.path}</td>
                    <td className="py-6 text-right text-[10px] text-[#333]">
                      {new Date(e.timestamp as number).toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Raw Data Export */}
        <div className="flex justify-center pt-12">
          <button 
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(rawData));
              const downloadAnchorNode = document.createElement('a');
              downloadAnchorNode.setAttribute("href", dataStr);
              downloadAnchorNode.setAttribute("download", "hepple_analytics.json");
              document.body.appendChild(downloadAnchorNode);
              downloadAnchorNode.click();
              downloadAnchorNode.remove();
            }}
            className="text-[10px] uppercase tracking-[0.3em] text-[#555] hover:text-white border-b border-white/5 pb-2 transition-all"
          >
            Export Structured JSON Log
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;