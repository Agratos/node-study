import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Banner.style.css';

const Banner = () => {
	const image = ['free.png', 'sale.jpg'];
	const [index, setIndex] = useState(0);

	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1400 },
			items: 1,
		},
		tablet: {
			breakpoint: { max: 1400, min: 464 },
			items: 1,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};
	// useEffect(() => {
	// 	setInterval(() => {
	// 		setIndex((idx) => (idx + 1) % image.length);
	// 	}, 5000);
	// }, []);

	return (
		<Carousel
			itemClass='movie-slider'
			containerClass='carousel-container'
			responsive={responsive}
			infinite={true}
			//centerMode={true}
			autoPlay={true}
			autoPlaySpeed={5000}
			//showDots={true}
			//arrows={false}
			//renderButtonGroupOutside={true}
			//customButtonGroup={<ButtonGroup />}
		>
			{image.map((bannerImg) => (
				<div style={{ backgroundImage: `url('/image/${bannerImg}')` }} className='banner' />
			))}
		</Carousel>
	);
};

export default Banner;
