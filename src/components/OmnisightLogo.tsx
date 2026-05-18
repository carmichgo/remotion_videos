import React from 'react';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  size?: number; // alto del símbolo en px
  withWordmark?: boolean;
  color?: string;
};

// Símbolo: anillo + iris (un "ojo" de vigilancia) construido en SVG.
export const OmnisightLogo: React.FC<Props> = ({
  size = 80,
  withWordmark = true,
  color = colors.accent,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: size * 0.28,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke={color}
          strokeWidth="5"
          opacity="0.35"
        />
        <path
          d="M8 50 Q 50 14 92 50 Q 50 86 8 50 Z"
          stroke={color}
          strokeWidth="5"
          fill="none"
        />
        <circle cx="50" cy="50" r="15" fill={color} />
        <circle cx="50" cy="50" r="6" fill={colors.bgDark} />
      </svg>
      {withWordmark ? (
        <span
          style={{
            fontFamily: fonts.display,
            fontWeight: 900,
            fontSize: size * 0.62,
            letterSpacing: size * 0.02,
            color: colors.text,
          }}
        >
          OMNISIGHT
        </span>
      ) : null}
    </div>
  );
};
