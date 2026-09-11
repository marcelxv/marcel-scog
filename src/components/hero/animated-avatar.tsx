'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

/**
 * Eye positions expressed in the natural coordinate space of
 * `marcel-scog-alpha.jpeg` (a 1080×1080 square illustration).
 * The overlay SVG uses the same 0 0 1080 1080 viewBox and is laid on top of
 * the image, so these coordinates line up regardless of the rendered size.
 */
const EYES = [
  // viewer's left eye (character's right)
  { cx: 478, cy: 250, rx: 18, ry: 15, pupil: 8, maxMove: 5 },
  // viewer's right eye (character's left)
  { cx: 557, cy: 244, rx: 18, ry: 15, pupil: 8, maxMove: 5 },
] as const;

type Vec = { x: number; y: number };

export function AnimatedAvatar({ className = '' }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRefs = useRef<(SVGGElement | null)[]>([]);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (reduce) return;

    // per-eye animation state (target + current offset in viewBox units)
    const eyes = EYES.map((eye) => ({
      eye,
      target: { x: 0, y: 0 } as Vec,
      current: { x: 0, y: 0 } as Vec,
    }));
    let pointer: Vec | null = null;
    let raf = 0;

    const computeTargets = () => {
      const svg = svgRef.current;
      if (!svg || !pointer) return;
      const rect = svg.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      for (const s of eyes) {
        // eye center in screen space
        const sx = rect.left + (s.eye.cx / 1080) * rect.width;
        const sy = rect.top + (s.eye.cy / 1080) * rect.height;
        const dx = pointer.x - sx;
        const dy = pointer.y - sy;
        const dist = Math.hypot(dx, dy) || 1;
        // ease the reach in: full travel once the cursor is ~220px away
        const move = s.eye.maxMove * Math.min(1, dist / 220);
        s.target.x = (dx / dist) * move;
        s.target.y = (dy / dist) * move;
      }
    };

    const tick = () => {
      let animating = false;
      eyes.forEach((s, i) => {
        // lerp toward target for a soft follow
        s.current.x += (s.target.x - s.current.x) * 0.15;
        s.current.y += (s.target.y - s.current.y) * 0.15;
        const g = pupilRefs.current[i];
        if (g) {
          g.style.transform = `translate(${s.current.x}px, ${s.current.y}px)`;
        }
        if (
          Math.abs(s.target.x - s.current.x) > 0.05 ||
          Math.abs(s.target.y - s.current.y) > 0.05
        ) {
          animating = true;
        }
      });
      raf = animating || pointer ? requestAnimationFrame(tick) : 0;
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      pointer = { x: e.clientX, y: e.clientY };
      computeTargets();
      kick();
    };
    const onLeave = () => {
      pointer = null;
      for (const s of eyes) {
        s.target.x = 0;
        s.target.y = 0;
      }
      kick();
    };
    const onScroll = () => {
      computeTargets();
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('blur', onLeave);

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('blur', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <Image
        src="/images/marcel-scog-alpha.jpeg"
        alt="Marcel Scognamiglio"
        fill
        className="object-cover"
        priority
      />

      <svg
        ref={svgRef}
        viewBox="0 0 1080 1080"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full pointer-events-none"
        aria-hidden="true"
      >
        {EYES.map((eye, i) => (
          <g key={i}>
            {/* eye white — covers the original pupil so the tracked one reads cleanly */}
            <ellipse
              cx={eye.cx}
              cy={eye.cy}
              rx={eye.rx}
              ry={eye.ry}
              fill="#f7f1e6"
              stroke="#241d17"
              strokeWidth={3}
            />
            {/* clip so the pupil can never slide past the white */}
            <clipPath id={`eye-clip-${i}`}>
              <ellipse
                cx={eye.cx}
                cy={eye.cy}
                rx={eye.rx - 2}
                ry={eye.ry - 2}
              />
            </clipPath>
            <g clipPath={`url(#eye-clip-${i})`}>
              <g
                ref={(el) => {
                  pupilRefs.current[i] = el;
                }}
                style={{ willChange: 'transform' }}
              >
                {/* iris + pupil */}
                <circle cx={eye.cx} cy={eye.cy} r={eye.pupil} fill="#3a2a1e" />
                <circle
                  cx={eye.cx}
                  cy={eye.cy}
                  r={eye.pupil * 0.55}
                  fill="#140d08"
                />
                {/* catch-light */}
                <circle
                  cx={eye.cx - eye.pupil * 0.35}
                  cy={eye.cy - eye.pupil * 0.4}
                  r={eye.pupil * 0.28}
                  fill="#ffffff"
                  opacity={0.9}
                />
              </g>
            </g>
          </g>
        ))}
      </svg>
    </div>
  );
}
