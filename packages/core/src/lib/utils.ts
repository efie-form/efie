import classNames from 'classnames';
import { twMerge } from 'tailwind-merge';

export function cn(...args: classNames.ArgumentArray) {
  return twMerge(classNames(args));
}

const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function generateId(length: number = 10) {
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join('');
}
