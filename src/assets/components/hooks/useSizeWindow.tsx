import React, { useRef, useEffect } from 'react';

// Custom hook to get the width of a div
export const useDivWidth = () => {
  const divRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState<number>(0);

  useEffect(() => {
    // Function to update the width when the component mounts or when the window is resized
    const updateWidth = () => {
      if (divRef.current) {
        setWidth(divRef.current.offsetWidth);
      }
    };

    // Initial width update
    updateWidth();

    // Event listener for window resize
    window.addEventListener('resize', updateWidth);

    // Cleanup: remove event listener
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return { divRef, width };
}