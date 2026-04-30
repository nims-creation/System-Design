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
    <div className="auth-page container" style={{ flexDirection: 'column', padding: '2rem 1.5rem' }}>
      <div className="auth-header animate-fade-in" style={{ marginTop: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Capacity Calculator</h1>
        <p className="text-muted" style={{ maxWidth: '600px', margin: '0 auto' }}>
          Estimate your system's scale dynamically. Adjust the sliders below to see real-time bandwidth, storage, and caching requirements.
        </p>
      </div>

      <div className="calc-grid animate-fade-in" style={{ animationDelay: '0.1s' }}>
        {/* Controls Section */}
        <div className="auth-card glass calc-controls">
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Daily Active Users (DAU)</label>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{dau} Million</span>
            </div>
            <input 
              type="range" min="1" max="1000" value={dau} 
              onChange={(e) => setDau(Number(e.target.value))}
              className="calc-slider"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Read / Write Ratio</label>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{readWriteRatio}% Read / {100 - readWriteRatio}% Write</span>
            </div>
            <input 
              type="range" min="10" max="99" value={readWriteRatio} 
              onChange={(e) => setReadWriteRatio(Number(e.target.value))}
              className="calc-slider"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Avg Payload Size (KB)</label>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{payloadSize} KB</span>
            </div>
            <input 
              type="range" min="1" max="1024" value={payloadSize} 
              onChange={(e) => setPayloadSize(Number(e.target.value))}
              className="calc-slider"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <label>Data Retention</label>
              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{retentionYears} Years</span>
            </div>
            <input 
              type="range" min="1" max="10" value={retentionYears} 
              onChange={(e) => setRetentionYears(Number(e.target.value))}
              className="calc-slider"
            />
          </div>
        </div>

        {/* Results Section */}
        <div className="calc-results">
          <div className="calc-result-card glass">
            <span className="logo-icon" style={{ color: 'var(--primary)' }}>⚡</span>
            <div className="result-label">Requests Per Second</div>
            <div className="result-value">{metrics.rps}</div>
          </div>
          
          <div className="calc-result-card glass">
            <span className="logo-icon" style={{ color: 'var(--accent)' }}>🌐</span>
            <div className="result-label">Peak Bandwidth</div>
            <div className="result-value">{metrics.bandwidth} <span className="result-unit">MB/s</span></div>
          </div>

          <div className="calc-result-card glass">
            <span className="logo-icon" style={{ color: '#a855f7' }}>💾</span>
            <div className="result-label">Total Storage (5 yrs)</div>
            <div className="result-value">{metrics.storage} <span className="result-unit">TB</span></div>
          </div>

          <div className="calc-result-card glass">
            <span className="logo-icon" style={{ color: '#22c55e' }}>🧠</span>
            <div className="result-label">Required Cache</div>
            <div className="result-value">{metrics.cache} <span className="result-unit">GB</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
