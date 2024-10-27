import { Image } from "antd";
import React from "react";
import Slider from "react-slick";
const SliderComponent = ({ arrImages }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider settings={settings}>
            {arrImages.map((image) => {
                <Image src={image} alt="slider" />
            })}
        </Slider>
    )
}

export default SliderComponent