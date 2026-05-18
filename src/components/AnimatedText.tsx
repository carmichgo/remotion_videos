import React from 'react';
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';

type Props = {
  children: React.ReactNode;
  delay?: number; // frames antes de aparecer
  duration?: number; // frames de la animación de entrada
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  fontFamily?: string;
  align?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  style?: React.CSSProperties;
};

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

export const AnimatedText: React.FC<Props> = ({
  children,
  delay = 0,
  duration = 20,
  fontSize = 64,
  fontWeight = 700,
  color = colors.text,
  fontFamily = fonts.display,
  align = 'center',
  letterSpacing = 0,
  lineHeight = 1.15,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const progress = interpolate(local, [0, duration], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: EASE,
  });

  // fps referenciado para mantener consistencia si cambia el framerate
  void fps;

  return (
    <div
      style={{
        fontFamily,
        fontSize,
        fontWeight,
        color,
        textAlign: align,
        letterSpacing,
        lineHeight,
        opacity: progress,
        transform: `translateY(${(1 - progress) * 28}px)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
