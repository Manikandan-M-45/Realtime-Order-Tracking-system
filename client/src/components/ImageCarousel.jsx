import React from "react";
import Slider from "react-slick";

export default function ImageCarousel() {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };
  return (
    <div className="w-full">
      <Slider {...settings} style={{ overflow: "hidden" }}>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://plus.unsplash.com/premium_photo-1700056212664-a2998bf82d32?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://images.unsplash.com/photo-1554568218-0f1715e72254?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://plus.unsplash.com/premium_photo-1727967290081-c50ae33dbc3d?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://images.unsplash.com/photo-1608739872119-f78feab7f976?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://images.unsplash.com/photo-1641290748359-1d944fc8359a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
        <div className="h-100 lg:h-150 ">
          <img className="w-full h-full" src="https://plus.unsplash.com/premium_photo-1740020242524-318435e4be6f?q=80&w=812&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
      </Slider>
    </div>
  );
}