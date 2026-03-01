'use client';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
 const videoRef = useRef<HTMLVideoElement>(null);
 
 const isMobile = useMediaQuery({ maxWidth: 767 });
 
 useGSAP(() => {
	const heroSplit = new SplitText(".title", {
	 type: "chars, words",
	});
	
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	
	// Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});
	
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});
	
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	})
	.to(".right-leaf", { y: 200 }, 0)
	.to(".left-leaf", { y: -200 }, 0)
	.to(".arrow", { y: 100 }, 0);
	
	const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";
	
	const tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current?.addEventListener('loadedmetadata', () => {
	 if (videoRef.current) {
		tl.to(videoRef.current, {
		 currentTime: videoRef.current.duration,
		});
	 }
	});
 }, []);
 
 return (
	<>
	 <section id="hero" className="noisy">
		<h1 className="title">KOFFICA</h1>

		<Image
		 src="/images/hero-left-leaf.png"
		 alt="left-leaf"
		 className="left-leaf"
         width={300}
		 height={400}
		 priority
		/>
		<Image
		 src="/images/hero-right-leaf.png"
		 alt="right-leaf"
		 className="right-leaf"
         width={200}
		 height={300}
		 priority
		/>

		<div className="body">
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Premium. Artisanal. Exceptional.</p>
			 <p className="subtitle">
				Taste the Art <br /> of Coffee
			 </p>
			</div>

			<div className="view-cocktails">
			 <p className="subtitle">
				Every cup in our collection is a blend of premium beans,
				expert craftsmanship, and timeless brewing techniques — designed to awaken your
				senses.
			 </p>
			 <a href="#cocktails">Explore Coffee</a>
			</div>
		 </div>
		</div>
	 </section>

	 <div className="video absolute inset-0 w-full ">
		<video
		 ref={videoRef}
		 muted
		 playsInline
		 preload="none"
		 src="/videos/output.mp4"
		/>
	 </div>
	</>
 );
};

export default Hero;
