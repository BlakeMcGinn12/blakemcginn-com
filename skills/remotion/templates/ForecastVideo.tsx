import React from 'react';
import { useVideoConfig, useCurrentFrame, interpolate } from 'remotion';

interface ForecastVideoProps {
  riskScore: number;
  roleTitle: string;
  timeline: {
    six_months: number;
    one_year: number;
    three_years: number;
    five_years: number;
  };
}

export const ForecastVideo: React.FC<ForecastVideoProps> = ({ 
  riskScore, 
  roleTitle,
  timeline 
}) => {
  const frame = useCurrentFrame();
  
  // Animate elements in
  const opacity = interpolate(frame, [0, 30], [0, 1]);
  const scale = interpolate(frame, [0, 30], [0.8, 1]);
  
  // Risk color based on score
  const getRiskColor = (score: number) => {
    if (score < 30) return '#22c55e';
    if (score < 60) return '#eab308';
    return '#ef4444';
  };
  
  const riskColor = getRiskColor(riskScore);
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px',
      fontFamily: 'Inter, sans-serif',
      color: 'white',
      opacity,
    }}>
      <div style={{ transform: `scale(${scale})`, textAlign: 'center' }}>
        <p style={{ fontSize: '28px', color: '#94a3b8', textTransform: 'uppercase' }}>
          Your Automation Forecast
        </p>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>{roleTitle}</h1>
      </div>
      
      <div style={{
        fontSize: '180px',
        fontWeight: 'bold',
        color: riskColor,
        textShadow: `0 0 60px ${riskColor}40`
      }}>
        {riskScore}%
      </div>
      
      <p style={{ fontSize: '36px', color: '#cbd5e1' }}>Automation Risk</p>
    </div>
  );
};

export default ForecastVideo;
