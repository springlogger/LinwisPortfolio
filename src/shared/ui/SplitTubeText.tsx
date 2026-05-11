'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(SplitText);

type SplitTubeTextProps = {
  text: string;
  className?: string;
  duration?: number;
  charStagger?: number;
  spins?: number;
};

export function SplitTubeText({
  text,
  className = '',
  duration = 0.5,
  charStagger = 0.03,
  spins = 1,
}: SplitTubeTextProps) {
  const rootRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const fontSize = parseFloat(getComputedStyle(root).fontSize) || 16;
      const transformOrigin = `50% 50% ${-fontSize * 0.7}px`;

      gsap.set(root, { transformStyle: 'preserve-3d' });

      const split = new SplitText(root, {
        type: 'chars',
        charsClass: 'split-tube-char',
      });

      gsap.set(split.chars, {
        backfaceVisibility: 'hidden',
        transformOrigin,
        rotationX: 0,
        force3D: true,
      });

      const timeline = gsap.timeline({ paused: true });
      timeline.to(split.chars, {
        rotationX: 360 * spins,
        stagger: charStagger,
        duration,
        ease: 'power3.inOut',
        transformOrigin,
        force3D: true,
      });

      const handleEnter = () => timeline.play();
      const handleLeave = () => timeline.reverse();

      root.addEventListener('mouseenter', handleEnter);
      root.addEventListener('mouseleave', handleLeave);

      return () => {
        root.removeEventListener('mouseenter', handleEnter);
        root.removeEventListener('mouseleave', handleLeave);
        timeline.kill();
        split.revert();
      };
    },
    {
      scope: rootRef,
      dependencies: [text, duration, charStagger, spins],
    }
  );

  return (
    <span
      ref={rootRef}
      className={['inline-block leading-none', className].join(' ')}
      style={{ perspective: '7em' }}
    >
      {text}
    </span>
  );
}
