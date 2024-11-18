import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export default function Card({ className, children }: CardProps) {
  return (
    <div className={clsx('bg-white rounded-lg shadow-sm p-6', className)}>
      {children}
    </div>
  );
}
