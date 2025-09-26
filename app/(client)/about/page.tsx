import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About InterioWale | Green Interiors, Premium Plants & Landscaping",
  description:
    "Discover the story behind InterioWale — a startup dedicated to transforming homes, offices, and landscapes with premium indoor/outdoor plants and plant-powered design. From bonsai to tree rentals, we bring nature to you.",
  keywords: [
    "InterioWale",
    "Indoor plants",
    "Outdoor trees",
    "Bonsai",
    "Tree rental",
    "Green interiors",
    "Office landscaping",
    "Home plant design",
    "Plant-powered interior design",
    "Sustainable decor",
  ],
  openGraph: {
    title: "About InterioWale | Green Interiors & Premium Trees",
    description:
      "We specialize in plant-powered design—offering rare trees, interior landscaping, and tree rentals for home and office spaces.",
    url: "https://yourdomain.com/about",
    siteName: "InterioWale",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", // Replace with a real OG image URL
        width: 1200,
        height: 630,
        alt: "InterioWale - Green Interiors with Plants",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};


const About = () => {
  const team = [
    {
      name: "Israfil Hossain",
      role: "Founder & CEO",
      image: '/images/israfil.jpg',
      bio: "Founder of InterioWale, passionate about creating nature-driven interiors and sustainable green solutions.",
    },
    {
      name: "Nasir Hossain",
      role: "Plant Specialist",
      image: '/images/nasir.jpg',
      bio: "Nasir Hossain is our botanical expert in Plant Sciences and passion for sustainable living.",
    },
    {
      name: "Fayz Ahmed",
      role: "Interior Consultant",
      image: '/images/fayz.jpg',
      bio: "Fayz Ahmed interior design expertise with plant knowledge to create harmonious living spaces.",
    },
  ];

  const values = [
    {
      title: "Sustainability",
      description:
        "We believe in eco-friendly practices that benefit both our clients and the environment.",
      icon: "🌱",
    },
    {
      title: "Quality",
      description:
        "We source only the healthiest plants and provide premium design services.",
      icon: "⭐",
    },
    {
      title: "Innovation",
      description:
        "We stay ahead of trends to bring you the latest in plant care and interior design.",
      icon: "💡",
    },
    {
      title: "Community",
      description:
        "We build lasting relationships with our clients and support plant lovers everywhere.",
      icon: "🤝",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-emerald-600">InterioWale</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We bring nature into everyday life—through indoor and outdoor
            plants, premium and foreign trees, bonsai collections, and
            plant-powered interior solutions for homes, offices, and landscapes.
          </p>
        </div>

        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                InterioWale began with a simple dream—to bring trees into every
                space. We believe every room, lobby, or landscape deserves the
                beauty and peace that greenery brings.
              </p>
              <p>
                {`Over time, we expanded into selling premium indoor and outdoor plants, rare and foreign trees, 
                and stunning bonsai collections. Whether it's your home, office, or a public space—we transform it 
                with green.`}
              </p>
              <p>
                {`We’re proud to offer plant rentals for offices, events, and long-term commercial use. And we don’t stop 
                at plants—we design plant-centric interiors, offer full landscaping solutions, and help you fall in love 
                with trees the way we have.`}
              </p>
            </div>
          </div>
          <div className="relative">
            <Image
              src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Green plant interior"
              width={600}
              height={400}
              priority
              className="w-full h-[400px] object-cover rounded-2xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-green-100">Trees Delivered</div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {`Trees are more than our business—they’re our belief. Here's what drives us forward:`}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our passionate team of plant experts and designers are here to
              bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Image src={member.image} alt={member.name} width={96} height={96} className="rounded-full w-24 h-24 object-fill" />
                    {/* <span className="text-gray-500 text-2xl">👤</span> */}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-primary text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
              To connect people with plants by making green living practical,
              premium, and beautifully accessible—at home, at work, and
              everywhere in between.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-green-100">Plants & Trees Delivered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-green-100">Corporate Tree Rentals</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">3+</div>
                <div className="text-green-100">Years of Tree Love</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Work With Us?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            {
              "Let's create something beautiful together. Contact us today to start your plant journey."
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              className="bg-primary hover:bg-green-700 text-white px-8 py-3 cursor-pointer rounded-lg"
              href={process.env.NEXT_PUBLIC_CALENDY || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule a Consultation
            </Link>
            <Link
              href="/tips"
              className="bg-primary hover:bg-green-700 text-white px-8 py-3 cursor-pointer rounded-lg"
            >
              Learn More Tips
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
