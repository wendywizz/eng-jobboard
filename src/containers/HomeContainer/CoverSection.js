import React, { useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import "./index.css";
import coverImage1 from "assets/img/cover-1.jpg";
import coverImage2 from "assets/img/cover-2.jpg";

const items = [
  {
    src: coverImage1,
    altText: "Slide 1",
  },
  {
    src: coverImage2,
    altText: "Slide 2",
  },
];

function CoverSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem        
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div className="image" style={{ backgroundImage: 'url('+item.src+')'}} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}          
        />
      </CarouselItem>
    );
  });

  return (
    <div className="cover-container">
      <Carousel className="cover-carousel" activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}          
        />
        {slides}
      </Carousel>
    </div>
  );
}
export default CoverSection;
