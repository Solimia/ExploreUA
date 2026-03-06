import { useEffect, useRef } from "react";
import pannellum from "pannellum";

function Panorama() {
  const viewerRef = useRef(null);

  useEffect(() => {
    pannellum.viewer(viewerRef.current, {
      type: "equirectangular",
      panorama: "/panorama.jpg", // твоя 360 картинка
      autoLoad: true,
      showZoomCtrl: true,
      showFullscreenCtrl: true
    });
  }, []);

  return (
    <div
      ref={viewerRef}
      style={{ width: "100%", height: "100vh" }}
    />
  );
}

export default Panorama;