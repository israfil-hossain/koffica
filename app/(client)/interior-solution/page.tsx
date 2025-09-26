/* eslint-disable @typescript-eslint/no-explicit-any */
import { ContactUsButton, ScheduleButton } from '@/components/schedule-button'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getAllLandscapingProjects, getAllRentalPackages } from '@/sanity/helpers'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  const [landscapingProjects, rentalPackages] = await Promise.all([
    getAllLandscapingProjects(),
    getAllRentalPackages()
  ]);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Interior <span className="text-secondary">Solutions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Transform your living and working spaces with our professional interior plant design services. 
            We create beautiful, healthy environments tailored to your lifestyle and space requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <ScheduleButton />
           <ContactUsButton text="View Our Portfolio" link="/about"/>
          </div>
        </div>

        {/* Landscaping Projects Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Landscaping <span className="text-secondary">Projects</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From office interiors to rooftop gardens, we create stunning green spaces for every environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {landscapingProjects.map((project:any) => (
              <Card key={project._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {project.image && (
                      <Image
                        width={500} 
                        height={200}
                        src={urlFor(project.image).url()}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                    {project.price && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-green-600 font-semibold text-sm">{project.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    
                    {project.features && project.features.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.slice(0, 3).map((feature:any, index:number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Link href={`/interior-solution/landscaping/${project.slug.current}`}>
                      <Button className="w-full bg-primary hover:bg-secondary text-white">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Office Rental Plant Service Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Office Rental <span className="text-secondary">Plant Service</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose from our flexible rental packages designed to keep your office green and vibrant year-round.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {rentalPackages.map((pkg:any) => (
              <Card key={pkg._id} className={`group hover:shadow-xl transition-all duration-300 overflow-hidden relative ${pkg.isPopular ? 'ring-2 ring-green-500' : ''}`}>
                {pkg.isPopular && (
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    {pkg.image && (
                      <Image
                        width={500} 
                        height={200}
                        src={urlFor(pkg.image).url()}
                        alt={pkg.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.title}</h3>
                      <div className="text-3xl font-bold text-green-600 mb-1">{pkg.price}</div>
                      {pkg.duration && (
                        <div className="text-gray-500 text-sm">{pkg.duration}</div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-4 text-center line-clamp-2">{pkg.description}</p>
                    
                    {pkg.features && pkg.features.length > 0 && (
                      <div className="mb-6">
                        <ul className="space-y-2">
                          {pkg.features.slice(0, 4).map((feature:any, index:number) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center">
                              <span className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <Link href={`/interior-solution/rental/${pkg.slug.current}`}>
                      <Button className={`w-full ${pkg.isPopular ? 'bg-green-600 hover:bg-green-700' : 'bg-primary hover:bg-secondary'} text-white`}>
                        Choose Package
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process Section */}
        <section className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Design Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a systematic approach to ensure your space transformation exceeds expectations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', desc: 'We assess your space, lighting, and lifestyle needs' },
              { step: '02', title: 'Design', desc: 'Custom plant selection and placement planning' },
              { step: '03', title: 'Installation', desc: 'Professional setup and styling of your space' },
              { step: '04', title: 'Support', desc: 'Ongoing care guidance and maintenance tips' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-primary text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Book a free consultation with our interior plant specialists and discover how we can bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={process.env.NEXT_PUBLIC_CALENDY || ""} className="bg-white border-white text-primary hover:bg-secondary hover:text-white px-8 py-3">
              Book Free Consultation
            </Link>
            <Link href="#" className="bg-white border-white text-primary hover:bg-secondary hover:text-white px-8 py-3">
              Call Us: +88017-23560254
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Page
