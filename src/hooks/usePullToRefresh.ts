import { useState, useEffect, useCallback } from "react";

interface PullToRefreshHookProps {
  onRefresh: () => void;
}

const usePullToRefresh = ({ onRefresh }: PullToRefreshHookProps) => {
  const [startPoint, setStartPoint] = useState(0);
  const [pullChange, setPullChange] = useState(0);

  const pullStart = useCallback((e: TouchEvent) => {
    const { screenY } = e.targetTouches[0];
    setStartPoint(screenY);
  }, []);

  const pull = useCallback((e: TouchEvent) => {
    const touch = e.targetTouches[0];
    const { screenY } = touch;
    let pullLength = startPoint < screenY ? Math.abs(screenY - startPoint) : 0;
    setPullChange(pullLength);
  }, [startPoint]);

  const endPull = useCallback((e: TouchEvent) => {
    setStartPoint(0);
    setPullChange(0);
    if (pullChange > 100) {
      onRefresh();
    }
  }, [onRefresh, pullChange]);

  useEffect(() => {
    window.addEventListener("touchstart", pullStart);
    window.addEventListener("touchmove", pull);
    window.addEventListener("touchend", endPull);

    return () => {
      window.removeEventListener("touchstart", pullStart);
      window.removeEventListener("touchmove", pull);
      window.removeEventListener("touchend", endPull);
    };
  }, [pullStart, pull, endPull]);

  return { pullChange };
};

export default usePullToRefresh;
