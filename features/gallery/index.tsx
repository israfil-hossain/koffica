/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import { urlFor } from '@/sanity/lib/image';

interface GalleryItem {
  _id: string;
  title: string;
  slug: { current: string };
  category: string;
  image: any;
  description: string;
  features?: string[];
  isFeatured?: boolean;
}

interface GalleryProps {
  galleryItems: GalleryItem[];
}

const Gallery = ({ galleryItems }: GalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Espresso', 'Latte Art', 'Pour Over', 'Cold Brew', 'Roasting', 'Chocolate'];

  const filteredItems = selectedCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Coffee <span className="text-yellow-600">Gallery</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explore our collection of coffee moments, brewing artistry, and the passion
            behind every perfect cup. Get inspired by the world of specialty coffee.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-black'
                  : 'border-yellow-600 text-yellow-600 hover:bg-yellow-600/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => (
            <Card key={item._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer bg-gray-900 border-gray-800">
              <CardContent className="p-0" onClick={() => handleImageClick(item)}>
                <div className="relative overflow-hidden">
                  <Image 
                    src={urlFor(item.image).url()} 
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="bg-yellow-600 text-black hover:bg-yellow-700">
                      View Details
                    </Button>
                  </div>
                  <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </div>
                  {item.isFeatured && (
                    <div className="absolute top-4 right-4 bg-amber-600/90 text-black px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.description}</p>
                  {item.features && item.features.length > 0 && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-1">
                        {item.features.slice(0, 2).map((feature, index) => (
                          <span key={index} className="text-xs bg-amber-600/20 text-amber-400 px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <section className="bg-gradient-to-r from-yellow-600 to-amber-700 text-black rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Coffee Journey</h2>
            <p className="text-amber-900">Crafting exceptional coffee experiences, one cup at a time</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1000+', label: 'Cups Served Daily' },
              { number: '25+', label: 'Coffee Origins' },
              { number: '99%', label: 'Customer Satisfaction' },
              { number: '50+', label: 'Specialty Blends' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-amber-900">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Our Coffee Collection?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Discover our premium coffee beans, artisanal chocolates, and brewing accessories. Start your coffee journey with us today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3">
                Shop Coffee
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 px-8 py-3">
                Contact Us
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Image Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0 bg-gray-900 border-gray-700">
          {selectedImage && (
            <>
              <DialogHeader className="p-6 pb-0">
                <DialogTitle className="text-2xl font-bold text-white">
                  {selectedImage.title}
                </DialogTitle>
              </DialogHeader>
              <div className="px-6 pb-6">
                <Image
                  width={800} 
                  height={600}
                  src={urlFor(selectedImage.image).url()} 
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[60vh] object-cover rounded-lg mb-4"
                />
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    {selectedImage.category}
                  </span>
                  {selectedImage.isFeatured && (
                    <span className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-300 mb-4">{selectedImage.description}</p>
                {selectedImage.features && selectedImage.features.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-white mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {selectedImage.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-600 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
