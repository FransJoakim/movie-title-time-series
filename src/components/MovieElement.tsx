import { useEffect, useRef, useState } from "react";
import useWindowDimensions from "../utils/useWindowDimensions";

export const MovieElement = ({ Title, Poster }: Movie) => {
  const { screenWidth } = useWindowDimensions();
  const ref = useRef<HTMLDivElement>(null);
  const [inViewPort, setInViewPort] = useState(true);

  useEffect(() => {
    if (ref.current) ref.current.style.visibility = "hidden";
  }, [ref]);

  return (
    <div key={Title}>
      <div
        className="movieElement"
        onMouseEnter={() => {
          if (ref.current) {
            console.log();
            console.log(ref.current.getBoundingClientRect());
          }
          if (ref.current) {
            const position = ref.current.getBoundingClientRect();
            if (screenWidth - (position.x + position.width) < 0) {
              setInViewPort(false);
            }
          }
          if (ref.current) ref.current.style.visibility = "visible";
        }}
        onMouseLeave={() => {
          if (ref.current) ref.current.style.visibility = "hidden";
        }}
      />
      <div
        ref={ref}
        onMouseEnter={() => {
          if (ref.current) ref.current.style.visibility = "visible";
        }}
        onMouseLeave={() => {
          if (ref.current) ref.current.style.visibility = "hidden";
        }}
        className={`infoModal${inViewPort ? "" : " leftModal"}`}
      >
        <p>{Title}</p>
        <img src={Poster} alt="Poster" />
      </div>
    </div>
  );
};
