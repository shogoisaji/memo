import { useState, useEffect } from "react";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);

  useEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return size;
}

// 使用例
function MyComponent() {
  const [width, height] = useWindowSize();
  return <div>画面の高さ: {height}px</div>;
}
