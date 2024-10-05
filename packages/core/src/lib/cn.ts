import classNames from 'classnames';
import {twMerge} from 'tailwind-merge';

function cn(...args: classNames.ArgumentArray) {
  return twMerge(classNames(args));
}

export default cn;
