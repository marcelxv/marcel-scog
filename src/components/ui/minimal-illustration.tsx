'use client';

interface MinimalIllustrationProps {
  variant?: 'hero' | 'footer';
  className?: string;
}

export function MinimalIllustration({
  variant = 'hero',
  className = '',
}: MinimalIllustrationProps) {
  if (variant === 'footer') {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <svg
          width="80"
          height="32"
          viewBox="0 0 80 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-30 dark:opacity-20"
        >
          <circle cx="8" cy="16" r="2" className="fill-primary-500" />
          <circle cx="24" cy="8" r="1.5" className="fill-primary-400" />
          <circle cx="24" cy="24" r="1.5" className="fill-primary-400" />
          <circle cx="40" cy="16" r="2.5" className="fill-primary-500/60" />
          <circle cx="56" cy="8" r="1.5" className="fill-primary-400" />
          <circle cx="56" cy="24" r="1.5" className="fill-primary-400" />
          <circle cx="72" cy="16" r="2" className="fill-primary-500" />
          <line
            x1="10"
            y1="16"
            x2="22.5"
            y2="8"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="16"
            x2="22.5"
            y2="24"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="26.5"
            y1="8"
            x2="37.5"
            y2="16"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="26.5"
            y1="24"
            x2="37.5"
            y2="16"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="42.5"
            y1="16"
            x2="54.5"
            y2="8"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="42.5"
            y1="16"
            x2="54.5"
            y2="24"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="58.5"
            y1="8"
            x2="70"
            y2="16"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
          <line
            x1="58.5"
            y1="24"
            x2="70"
            y2="16"
            className="stroke-primary-300/50"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Network nodes */}
        <circle
          cx="140"
          cy="140"
          r="80"
          className="stroke-primary-200 dark:stroke-primary-800"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="140"
          cy="140"
          r="55"
          className="stroke-primary-200 dark:stroke-primary-800"
          strokeWidth="0.5"
          fill="none"
        />
        <circle
          cx="140"
          cy="140"
          r="30"
          className="stroke-primary-200 dark:stroke-primary-800"
          strokeWidth="0.5"
          fill="none"
        />

        {/* Nodes */}
        <circle cx="140" cy="60" r="3" className="fill-primary-400/60" />
        <circle cx="140" cy="220" r="3" className="fill-primary-400/60" />
        <circle cx="60" cy="140" r="3" className="fill-primary-400/60" />
        <circle cx="220" cy="140" r="3" className="fill-primary-400/60" />
        <circle cx="83" cy="83" r="2" className="fill-primary-400/40" />
        <circle cx="197" cy="83" r="2" className="fill-primary-400/40" />
        <circle cx="83" cy="197" r="2" className="fill-primary-400/40" />
        <circle cx="197" cy="197" r="2" className="fill-primary-400/40" />

        {/* Center node */}
        <circle cx="140" cy="140" r="4" className="fill-primary-500/80" />

        {/* Connection lines */}
        <line
          x1="140"
          y1="60"
          x2="140"
          y2="220"
          className="stroke-primary-300/20 dark:stroke-primary-700/20"
          strokeWidth="0.5"
        />
        <line
          x1="60"
          y1="140"
          x2="220"
          y2="140"
          className="stroke-primary-300/20 dark:stroke-primary-700/20"
          strokeWidth="0.5"
        />
        <line
          x1="83"
          y1="83"
          x2="197"
          y2="197"
          className="stroke-primary-300/20 dark:stroke-primary-700/20"
          strokeWidth="0.5"
        />
        <line
          x1="83"
          y1="197"
          x2="197"
          y2="83"
          className="stroke-primary-300/20 dark:stroke-primary-700/20"
          strokeWidth="0.5"
        />

        {/* Data dots */}
        <circle cx="112" cy="98" r="1.5" className="fill-primary-400/30" />
        <circle cx="168" cy="98" r="1.5" className="fill-primary-400/30" />
        <circle cx="112" cy="182" r="1.5" className="fill-primary-400/30" />
        <circle cx="168" cy="182" r="1.5" className="fill-primary-400/30" />
        <circle cx="98" cy="112" r="1.5" className="fill-primary-400/30" />
        <circle cx="182" cy="112" r="1.5" className="fill-primary-400/30" />
        <circle cx="98" cy="168" r="1.5" className="fill-primary-400/30" />
        <circle cx="182" cy="168" r="1.5" className="fill-primary-400/30" />
      </svg>
    </div>
  );
}
