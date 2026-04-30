import React, { useState, useEffect } from 'react';

const Calculator = () => {
  const [dau, setDau] = useState(10); // Daily Active Users in Millions
  const [readWriteRatio, setReadWriteRatio] = useState(80); // Read %
  const [payloadSize, setPayloadSize] = useState(10); // Size per request in KB
  const [retentionYears, setRetentionYears] = useState(5); // Data retention in years

  const [metrics, setMetrics] = useState({
    rps: 0,
    bandwidth: 0,
    storage: 0,
    cache: 0
  });

  useEffect(() => {
    // Math Logic for Capacity Planning
    const totalUsers = dau * 1_000_000;
    const reqPerUser = 10; // Assume 10 requests per user per day
    const totalReqPerDay = totalUsers * reqPerUser;
    
    // Requests per second (RPS)
    const rps = Math.ceil(totalReqPerDay / 86400); // 86400 seconds in a day
    
    // Bandwidth in MB/s
    const bandwidthInKB = rps * payloadSize;
    const bandwidthInMB = (bandwidthInKB / 1024).toFixed(2);
    
    // Storage per day in GB
    const writePercentage = (100 - readWriteRatio) / 100;
    const writesPerDay = totalReqPerDay * writePercentage;
    const storagePerDayGB = (writesPerDay * payloadSize) / (1024 * 1024);
    
    // Total storage over retention period in Terabytes (TB)
    const totalStorageTB = ((storagePerDayGB * 365 * retentionYears) / 1024).toFixed(2);
    
    // Cache memory required (20% of daily read volume)
    const readsPerDay = totalReqPerDay * (readWriteRatio / 100);
    const readDataPerDayGB = (readsPerDay * payloadSize) / (1024 * 1024);
    const cacheMemoryGB = (readDataPerDayGB * 0.20).toFixed(2);

    setMetrics({
      rps: rps.toLocaleString(),
      bandwidth: bandwidthInMB,
      storage: totalStorageTB,
      cache: cacheMemoryGB
    });
  }, [dau, readWriteRatio, payloadSize, retentionYears]);

  return (
    <div className="pt-24 min-h-screen px-4 container relative">
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] -z-10" />
      
      <div className="text-center mb-12 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Capacity Calculator</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Estimate your system's scale dynamically. Adjust the sliders below to see real-time bandwidth, storage, and caching requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        {/* Controls Section */}
        <div className="glass-panel p-8 space-y-8">
          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-text-secondary">Daily Active Users (DAU)</label>
              <span className="text-primary font-bold">{dau} Million</span>
            </div>
            <input 
              type="range" min="1" max="1000" value={dau} 
              onChange={(e) => setDau(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-text-secondary">Read / Write Ratio</label>
              <span className="text-primary font-bold">{readWriteRatio}% Read / {100 - readWriteRatio}% Write</span>
            </div>
            <input 
              type="range" min="10" max="99" value={readWriteRatio} 
              onChange={(e) => setReadWriteRatio(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-text-secondary">Avg Payload Size (KB)</label>
              <span className="text-primary font-bold">{payloadSize} KB</span>
            </div>
            <input 
              type="range" min="1" max="1024" value={payloadSize} 
              onChange={(e) => setPayloadSize(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="font-medium text-text-secondary">Data Retention</label>
              <span className="text-primary font-bold">{retentionYears} Years</span>
            </div>
            <input 
              type="range" min="1" max="10" value={retentionYears} 
              onChange={(e) => setRetentionYears(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-primary mb-3">speed</span>
            <div className="text-sm text-text-secondary mb-1">Requests Per Second</div>
            <div className="text-3xl font-bold">{metrics.rps}</div>
          </div>
          
          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center hover:border-accent/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-accent mb-3">network_wifi</span>
            <div className="text-sm text-text-secondary mb-1">Peak Bandwidth</div>
            <div className="text-3xl font-bold">{metrics.bandwidth} <span className="text-lg font-normal text-text-secondary">MB/s</span></div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center hover:border-purple-500/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-purple-500 mb-3">database</span>
            <div className="text-sm text-text-secondary mb-1">Total Storage (5 yrs)</div>
            <div className="text-3xl font-bold">{metrics.storage} <span className="text-lg font-normal text-text-secondary">TB</span></div>
          </div>

          <div className="glass-panel p-6 flex flex-col justify-center items-center text-center hover:border-green-500/50 transition-colors">
            <span className="material-symbols-outlined text-4xl text-green-500 mb-3">memory</span>
            <div className="text-sm text-text-secondary mb-1">Required Cache Memory</div>
            <div className="text-3xl font-bold">{metrics.cache} <span className="text-lg font-normal text-text-secondary">GB</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
