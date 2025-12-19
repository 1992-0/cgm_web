import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  target?: string;
  rel?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', href, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-sm',
      secondary: 'bg-secondary text-white hover:bg-secondary/90 shadow-sm',
      outline: 'border-2 border-primary text-primary hover:bg-primary/5',
      ghost: 'text-primary hover:bg-primary/5',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-8 py-3.5 text-lg',
    };

    const styles = cn(
      'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    );

    if (href) {
      // Cast props to any to avoid type conflicts between button and anchor attributes
      return (
        <Link to={href} className={styles} {...(props as any)}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={styles} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
