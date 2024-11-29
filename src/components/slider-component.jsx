import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import "../css/components/slider-component.css";

const SliderC = ({ imgs = [], configs = {}, imgConfigs = {} }) => {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    ...configs,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelectedIndex(embla.selectedScrollSnap());
    embla.on("select", onSelect);
    onSelect();
  }, [embla]);

  const scrollPrev = () => embla && embla.scrollPrev();
  const scrollNext = () => embla && embla.scrollNext();
  const scrollTo = (index) => embla && embla.scrollTo(index);

  return (
    <div className="slcp-container">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">
          {imgs.map((src, i) => (
            <div className="embla__slide" key={i}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                className="embla__slide__img"
                {...imgConfigs}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button className="embla__prev" onClick={scrollPrev}>
        &lt;
      </button>
      <button className="embla__next" onClick={scrollNext}>
        &gt;
      </button>

      {/* Navigation Dots */}
      <div className="embla__dots">
        {imgs.map((_, i) => (
          <button
            key={i}
            className={`embla__dot ${
              i === selectedIndex ? "embla__dot--active" : ""
            }`}
            onClick={() => scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderC;
