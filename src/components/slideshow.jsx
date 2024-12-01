import React, { useEffect } from "react";
import "../css/components/slideshow.css";

const slidesData = [
  {
    src: "https://images.unsplash.com/photo-1506765336936-bb05e7e06295?ixlib=rb-0.3.5&s=d40582dbbbb66c7e0812854374194c2e&auto=format&fit=crop&w=1050&q=80",
    title: "Slide 1",
    copy: "DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.",
  },
  {
    src: "https://images.unsplash.com/photo-1496309732348-3627f3f040ee?ixlib=rb-0.3.5&s=4d04f3d5a488db4031d90f5a1fbba42d&auto=format&fit=crop&w=1050&q=80",
    title: "Slide 2",
    copy: "DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.",
  },
  {
    src: "https://images.unsplash.com/photo-1504271863819-d279190bf871?ixlib=rb-0.3.5&s=7a2b986d405a04b3f9be2e56b2be40dc&auto=format&fit=crop&w=334&q=80",
    title: "Slide 3",
    copy: "DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.",
  },
  {
    src: "https://images.unsplash.com/photo-1478728073286-db190d3d8ce6?ixlib=rb-0.3.5&s=87131a6b538ed72b25d9e0fc4bf8df5b&auto=format&fit=crop&w=1050&q=80",
    title: "Slide 4",
    copy: "DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT.",
  },
];

const Slideshow = () => {
  useEffect(() => {
    const container = document.getElementById("slideshow-container");
    const leftSlider = document.getElementById("slideshow-left-col");
    const nextButton = document.getElementById("slideshow-next-button");
    const prevButton = document.getElementById("slideshow-prev-button");

    let autoplay = setInterval(() => nextSlide(), 5000);

    const nextSlide = () => {
      const slides = Array.from(
        leftSlider.getElementsByClassName("slideshow-slide")
      );
      const captions = Array.from(
        container.getElementsByClassName("slideshow-caption")
      );

      // Get current, next, and previous slides
      const currentSlide = slides.find((slide) =>
        slide.classList.contains("current")
      );
      const nextSlide = currentSlide.nextElementSibling || slides[0];
      const previousSlide =
        currentSlide.previousElementSibling || slides[slides.length - 1];

      // Update slide classes
      slides.forEach((slide) =>
        slide.classList.remove("current", "next", "previous", "change")
      );
      currentSlide.classList.add("previous", "change");
      nextSlide.classList.add("current");
      const nextAfterNext = nextSlide.nextElementSibling || slides[0];
      nextAfterNext.classList.add("next");

      // Update caption classes
      captions.forEach((caption) =>
        caption.classList.remove(
          "current-caption",
          "next-caption",
          "previous-caption",
          "change"
        )
      );
      const currentCaption = captions[slides.indexOf(currentSlide)];
      const nextCaption = captions[slides.indexOf(nextSlide)];
      const nextAfterNextCaption = captions[slides.indexOf(nextAfterNext)];
      currentCaption.classList.add("previous-caption", "change");
      nextCaption.classList.add("current-caption");
      nextAfterNextCaption.classList.add("next-caption");
    };

    const prevSlide = () => {
      const slides = Array.from(
        leftSlider.getElementsByClassName("slideshow-slide")
      );
      const captions = Array.from(
        container.getElementsByClassName("slideshow-caption")
      );

      // Get current, previous, and next slides
      const currentSlide = slides.find((slide) =>
        slide.classList.contains("current")
      );
      const previousSlide =
        currentSlide.previousElementSibling || slides[slides.length - 1];
      const nextSlide = currentSlide.nextElementSibling || slides[0];

      // Update slide classes
      slides.forEach((slide) =>
        slide.classList.remove("current", "next", "previous", "change")
      );
      currentSlide.classList.add("next", "change");
      previousSlide.classList.add("current");
      const prevBeforePrevious =
        previousSlide.previousElementSibling || slides[slides.length - 1];
      prevBeforePrevious.classList.add("previous");

      // Update caption classes
      captions.forEach((caption) =>
        caption.classList.remove(
          "current-caption",
          "next-caption",
          "previous-caption",
          "change"
        )
      );
      const currentCaption = captions[slides.indexOf(currentSlide)];
      const previousCaption = captions[slides.indexOf(previousSlide)];
      const prevBeforePreviousCaption =
        captions[slides.indexOf(prevBeforePrevious)];
      currentCaption.classList.add("next-caption", "change");
      previousCaption.classList.add("current-caption");
      prevBeforePreviousCaption.classList.add("previous-caption");
    };

    nextButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      nextSlide();
      autoplay = setInterval(() => nextSlide(), 5000);
    });

    prevButton.addEventListener("click", (e) => {
      e.preventDefault();
      clearInterval(autoplay);
      prevSlide();
      autoplay = setInterval(() => nextSlide(), 5000);
    });

    // Keyboard Navigation
    container.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        clearInterval(autoplay);
        nextSlide();
        autoplay = setInterval(() => nextSlide(), 5000);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        clearInterval(autoplay);
        prevSlide();
        autoplay = setInterval(() => nextSlide(), 5000);
      }
    });

    return () => clearInterval(autoplay);
  }, []);

  return (
    <div
      id="slideshow-container"
      className="slideshow-container"
      tabIndex={0} // Makes the container focusable for keyboard navigation
    >
      <div id="slideshow-left-col" className="slideshow-left-col">
        {slidesData.map((slide, index) => (
          <div
            key={index}
            className={`slideshow-slide ${
              index === 0
                ? "current"
                : index === 1
                ? "next"
                : index === slidesData.length - 1
                ? "previous"
                : ""
            }`}
            style={{ backgroundImage: `url(${slide.src})` }}
          />
        ))}
      </div>
      {slidesData.map((slide, index) => (
        <div
          key={index}
          className={`slideshow-caption ${
            index === 0
              ? "current-caption"
              : index === 1
              ? "next-caption"
              : index === slidesData.length - 1
              ? "previous-caption"
              : ""
          }`}
        >
          <div className="slideshow-caption-heading">
            <h1>{slide.title}</h1>
          </div>
          <div className="slideshow-caption-subhead">
            <span>{slide.copy}</span>
          </div>
        </div>
      ))}
      <ul className="slideshow-nav">
        <li className="slideshow-slide-up">
          <a id="slideshow-prev-button" href="#">
            &#60;
          </a>
        </li>
        <li className="slideshow-slide-down">
          <a id="slideshow-next-button" href="#">
            &#62;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Slideshow;
