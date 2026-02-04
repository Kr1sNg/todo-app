import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// to combine tailwind className, and make sure of using the newest attribute
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
