import {useEffect, useState} from 'react';

export const useDebounce = <T>(
  value: T,
  callback?: () => any,
  delay?: number,
): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      callback && callback();
    }, delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
