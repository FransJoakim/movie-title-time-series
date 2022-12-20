import { useEffect, useRef } from "react";

export const MovieElement = ({ Title, Poster }: Movie) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.style.visibility = "hidden";
  }, [ref]);

  return (
    <div key={Title}>
      <div
        className="movieElement"
        onMouseEnter={() => {
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
        className="infoModal"
      >
        <p>{Title}</p>
        <img src={Poster} alt="Poster" />
      </div>
    </div>
  );
};
