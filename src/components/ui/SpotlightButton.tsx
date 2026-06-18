import { useRef, useState } from "react";

export interface SpotlightButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: any;
  to?: string;
  href?: string;
  className?: string;
}

export function SpotlightButton({
  children,
  as: Component = "button",
  className = "",
  ...props
}: SpotlightButtonProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const baseClasses = `relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full border border-white/[0.08] bg-bg-elevated/40 px-8 font-medium text-text-primary shadow-sm backdrop-blur-xl transition-all duration-300 hover:border-white/[0.15] hover:shadow-[0_0_20px_rgba(42,157,143,0.15)] ${className}`;

  return (
    <Component
      ref={divRef as any}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
      {...props}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, rgba(42,157,143,0.3), transparent 40%)`,
        }}
      />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </Component>
  );
}
