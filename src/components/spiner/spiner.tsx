import React from 'react';
import './styles.css';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

export default function LoadingSpinner({ size = 50, color = '#00aaff' }: LoadingSpinnerProps) {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    border: `${size / 10}px solid ${color}80`,
    borderTop: `${size / 10}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  };

  return (
    <div className="loadingSpinnerContainer">
      <div style={spinnerStyle} role="status" aria-label="Загрузка" />
    </div>
  );
}
