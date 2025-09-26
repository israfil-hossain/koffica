'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { socials } from '@/constants';

const Contact = () => {
 useGSAP(() => {
	const contactTimeline = gsap.timeline({
	 scrollTrigger: {
		trigger: '#contact',
		start: 'top center',
		end: 'bottom center',
		scrub: 1,
	 }
	});

	contactTimeline
	 .from('#contact h2', {
		yPercent: 50,
		opacity: 0,
		duration: 1,
		ease: 'power1.out'
	 })
	 .from('#contact .content > div', {
		yPercent: 30,
		opacity: 0,
		duration: 1,
		stagger: 0.2,
		ease: 'power1.out'
	 }, '-=0.5');
 });

 return (
	<section id="contact">
	 <Image 
		src="/images/footer-left-leaf.png" 
		alt="left-leaf" 
		width={300} 
		height={400} 
		id="f-left-leaf" 
	 />
	 <Image 
		src="/images/footer-right-leaf.png" 
		alt="right-leaf" 
		width={200} 
		height={300} 
		id="f-right-leaf" 
	 />
	 
	 <div className="content">
		<div>
		 <h2>Get in Touch</h2>
		</div>
		
		<div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
		 <div className="space-y-8">
			<div>
			 <h3>Visit Our Café</h3>
			 <p>123 Coffee Street, Bean District<br />
				Brew City, BC 12345</p>
			</div>
			
			<div>
			 <h3>Contact Info</h3>
			 <p>(555) 123-BREW<br />
				hello@koffita.com</p>
			</div>
		 </div>
		 
		 <div className="space-y-8">
			<div>
			 <h3>Opening Hours</h3>
			 <div className="space-y-2">
				<p>Mon–Thu: 6:00am – 9:00pm</p>
				<p>Fri: 6:00am – 10:00pm</p>
				<p>Sat: 7:00am – 10:00pm</p>
				<p>Sun: 7:00am – 8:00pm</p>
			 </div>
			</div>
			
			
		 <h3>Follow Us</h3>
		 
		 <div className="flex-center gap-5">
			{socials.map((social) => (
			 <a
			 	key={social.name}
				href={social.url}
				target="_blank"
				rel="noopener noreferrer"
				aria-label={social.name}
			 >
				<Image alt="social" width={50} height={50} src={social.icon} />
			 </a>
			))}
		 </div>
		 </div>
		</div>
		
		<div className="mt-16 text-center">
		 <p className="text-lg opacity-80">
			Experience the perfect cup. Visit us today.
		 </p>
		</div>
	 </div>
	 
	 
	</section>
 );
};

export default Contact;
