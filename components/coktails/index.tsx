'use client';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import Image from 'next/image';

// Coffee-themed data
const coffeeBlends = [
 {
	name: "Ethiopian Yirgacheffe",
	origin: "ET",
	detail: "Single Origin",
	price: "$24",
 },
 {
	name: "Colombian Supremo",
	origin: "CO",
	detail: "Medium Roast",
	price: "$22",
 },
 {
	name: "Blue Mountain",
	origin: "JM",
	detail: "Premium",
	price: "$45",
 },
 {
	name: "Kona Coffee",
	origin: "US",
	detail: "Hawaiian",
	price: "$38",
 },
];

const specialtyDrinks = [
 {
	name: "Vanilla Latte",
	origin: "US",
	detail: "Signature",
	price: "$6",
 },
 {
	name: "Caramel Macchiato",
	origin: "IT",
	detail: "Classic",
	price: "$7",
 },
 {
	name: "Mocha Frappé",
	origin: "US",
	detail: "Iced",
	price: "$8",
 },
 {
	name: "Cortado",
	origin: "ES",
	detail: "Traditional",
	price: "$5",
 },
];

const Cocktails = () => {
 useGSAP(() => {
	const parallaxTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#cocktails',
		start: 'top 30%',
		end: 'bottom 80%',
		scrub: true,
	 }
	})

	parallaxTimeline
	 .from('#c-left-leaf', {
		x: -100, y: 100
	})
	 .from('#c-right-leaf', {
		x: 100, y: 100
	})
 })

 return (
	<section id="cocktails" className="noisy">
	 <Image src="/images/hero-left-leaf.png" alt="l-leaf" id="c-left-leaf" width={300} height={400}/>
	 <Image src="/images/hero-right-leaf.png" alt="r-leaf" id="c-right-leaf" width={300} height={400}/>

	 <div className="list">
		<div className="popular">
		 <h2>Premium Coffee Blends:</h2>

		 <ul>
			{coffeeBlends.map(({ name, origin, detail, price }) => (
			 <li key={name}>
				<div className="md:me-28">
				 <h3>{name}</h3>
				 <p>{origin} | {detail}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>

		<div className="loved">
		 <h2>Signature Beverages:</h2>

		 <ul>
			{specialtyDrinks.map(({ name, origin, detail, price }) => (
			 <li key={name}>
				<div className="me-28">
				 <h3>{name}</h3>
				 <p>{origin} | {detail}</p>
				</div>
				<span>- {price}</span>
			 </li>
			))}
		 </ul>
		</div>
	 </div>
	</section>
 )
}

export default Cocktails
