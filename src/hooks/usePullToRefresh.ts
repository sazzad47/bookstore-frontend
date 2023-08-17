import { useState, useEffect, useCallback } from 'react';

interface PullToRefreshHookProps {
  onRefresh: () => void;
}

const usePullToRefresh = ({ onRefresh }: PullToRefreshHookProps) => {
  // State to track the starting point and the length of pull
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState(0);

  // Callback function to handle touchstart event
  const pullStart = useCallback((e: TouchEvent) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  }, []);

  // Callback function to handle touchmove event
  const pull = useCallback(
    (e: TouchEvent) => {
      const touch = e.targetTouches[0];
      const { screenY } = touch;
      let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
      setPullChange(pullLength);
    },
    [startPoint],
  );

  // Callback function to handle touchend event
  const endPull = useCallback(
    (e: TouchEvent) => {
      setStartPoint(0);
      setPullChange(0);
      // Check if the pull length is greater than 100 to trigger refresh
      if (pullChange > 100) {
        onRefresh();
      }
    },
    [onRefresh, pullChange],
  );

  useEffect(() => {
    // Add event listeners for touch events
    window.addEventListener('touchstart', pullStart);
    window.addEventListener('touchmove', pull);
    window.addEventListener('touchend', endPull);

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('touchstart', pullStart);
      window.removeEventListener('touchmove', pull);
      window.removeEventListener('touchend', endPull);
    };
  }, [pullStart, pull, endPull]);

  // Return the pullChange value and functions to the component using the hook
  return { pullChange };
};

export default usePullToRefresh;
