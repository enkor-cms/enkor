import { Database } from '@/lib/db_types';
import React from 'react';
import { Text } from '../common';

interface CompassProps {
  orientation: Database['public']['Enums']['orientation'];
  showLabel?: boolean;
}

const Compass: React.FC<CompassProps> = ({
  orientation,
  showLabel = false,
}) => {
  const rotationMap: { [key: string]: number } = {
    N: 0,
    NE: 45,
    E: 90,
    SE: 135,
    S: 180,
    SW: 225,
    W: 270,
    NW: 315,
  };

  const rotation = rotationMap[orientation];

  return (
    <div className="relative w-10 h-10">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="49"
          fill="transparent"
          stroke="#b0bfc9"
          strokeWidth="1"
        />
        <g transform={`rotate(${rotation}, 50, 50)`}>
          <path
            d="M50 0 L58 49 L50 50 L42 49 Z"
            fill="red"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M50 100 L58 51 L50 50 L42 51 Z"
            fill="#d5dde2"
            stroke="#d5dde2"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      </svg>
      {showLabel && (
        <Text
          variant="caption"
          className="hidden font-bold absolute -bottom-3 left-1/2  transform -translate-x-1/2"
        >
          {orientation}
        </Text>
      )}
    </div>
  );
};

export default Compass;
