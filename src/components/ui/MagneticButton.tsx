import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  as?: any;
  to?: string;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary";
}

export function MagneticButton({ 
  children, 
  as: Component = "button", 
  variant = "primary",
  className = "", 
  ...props 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    const x = (clientX - (left + width / 2)) * 0.35; // The multiplier controls the pull strength
    const y = (clientY - (top + height / 2)) * 0.35;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const baseStyles = "relative overflow-hidden rounded-full font-medium transition-colors duration-300 flex items-center justify-center";
  const variants = {
    primary: "bg-gold text-bg-deep hover:bg-gold-light shadow-[0_0_20px_rgba(212,175,106,0.3)]",
    secondary: "bg-transparent text-text-primary border border-white/20 hover:border-white/50 backdrop-blur-sm"
  };

  return (
    <Component
      {...props}
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="w-full h-full absolute inset-0 pointer-events-none"
      />
      
      {/* Shine effect on hover */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "200%" : "-100%" }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <motion.span 
        animate={{ x: position.x * 0.5, y: position.y * 0.5 }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
    </Component>
  );
}
