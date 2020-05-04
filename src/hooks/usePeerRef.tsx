import { useEffect, RefObject } from 'react';

const usePeerRef = (ref: RefObject<HTMLElement>, attribute: string) => {
  useEffect(() => {
    if (!ref.current) {
      return;
    }
    
  }, [ref, attribute]);
}