import React from 'react';
import { useVideoConfig, useCurrentFrame, interpolate } from 'remotion';

interface AlertVideoProps {
  findingTitle: string;
  summary: string;
  riskImpact: number;
}

export const AlertVideo: React.FC<AlertVideoProps> = ({ 
  findingTitle, 
  summary,
  riskImpact
}) => {
  const frame = useCurrentFrame();
  
  const pulse = interpolate(frame % 30, [0, 15, 30], [1, 1.1, 1]);
  const urgencyColor = riskImpact >= 8 ? '#ef4444' : '#f59e0b';
  
  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0f172a',
      fontFamily: 'Inter, sans-serif',
    }}>
      <div style={{
        backgroundColor: urgencyColor,
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <div style={{
          width: '24px',
          height: '24px',
          backgroundColor: 'white',
          borderRadius: '50%',
          transform: `scale(${pulse})`
        }} />
        <span style={{
          color: 'white',
          fontSize: '36px',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          Automation Alert
        </span>
      </div>
      
      <div style={{ padding: '50px 40px', color: 'white' }}>
        <h1 style={{ fontSize: '52px', fontWeight: 'bold', marginBottom: '30px' }}>
          {findingTitle}
        </h1>
        <p style={{ fontSize: '32px', color: '#cbd5e1', lineHeight: '1.5' }}>
          {summary}
        </p>
      </div>
    </div>
  );
};

export default AlertVideo;
