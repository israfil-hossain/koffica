'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

interface Blog {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  coverImage: any;
  publishedAt: string;
  author: { name: string };
  categories: { title: string }[];
  isFeatured: boolean;
}

interface TipsProps {
  blogs: Blog[];
}

const Tips = ({ blogs }: TipsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Extract unique categories from blogs
  const categories = ['All', ...Array.from(new Set(
    blogs.flatMap(blog => blog.categories?.map(cat => cat.title) || [])
  ))];

  const filteredPosts = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || 
                           blog.categories?.some(cat => cat.title === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (excerpt: string) => {
    const words = excerpt.split(' ').length;
    const readTime = Math.ceil(words / 200);
    return `${readTime} min read`;
  };

  return (
    <div className="min-h-screen bg-black">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Coffee <span className="text-yellow-500">Tips & Guides</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Expert brewing techniques, coffee knowledge, and barista tips to help you create
            the perfect cup of coffee at home and discover the world of specialty coffee.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <Input
              type="text"
              placeholder="Search coffee articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-center bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            />
          </div>
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

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <Card className="mb-16 overflow-hidden shadow-lg bg-gray-900 border-gray-800">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {filteredPosts[0].coverImage && (
                  <Image
                    width={500}
                    height={200}
                    src={urlFor(filteredPosts[0].coverImage).url()}
                    alt={filteredPosts[0].title}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                )}
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center mb-4">
                    <span className="bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    {filteredPosts[0].categories?.[0] && (
                      <span className="ml-3 text-yellow-600 text-sm font-medium">
                        {filteredPosts[0].categories[0].title}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-gray-300 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-400">
                      <span>By {filteredPosts[0].author?.name || 'Anonymous'}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                      <span className="mx-2">•</span>
                      <span>{getReadTime(filteredPosts[0].excerpt)}</span>
                    </div>
                    <Button className="bg-yellow-600 hover:bg-yellow-700 text-black">
                      <Link href={`/tips/${filteredPosts[0].slug.current}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredPosts.slice(1).map((blog) => (
            <Card key={blog._id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  {blog.coverImage && (
                    <Image
                      width={500}
                      height={200}
                      src={urlFor(blog.coverImage).url()}
                      alt={blog.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  {blog.categories?.[0] && (
                    <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-medium">
                      {blog.categories[0].title}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-600 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{blog.excerpt}</p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <span>By {blog.author?.name || 'Anonymous'}</span>
                    <span>{getReadTime(blog.excerpt)}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{formatDate(blog.publishedAt)}</span>
                    <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-600/10">
                      <Link href={`/tips/${blog.slug.current}`}>
                        Read More
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <section className="bg-yellow-600 text-black rounded-2xl p-8 md:p-12 mb-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-black/80 mb-6 max-w-2xl mx-auto">
              Get the latest coffee brewing tips, bean reviews, and exclusive content delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900"
              />
              <Button className="bg-black text-yellow-600 hover:bg-gray-800 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </section>

        {/* Popular Topics */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Popular Topics</h2>
            <p className="text-gray-300">Explore our most popular coffee brewing and knowledge topics</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { topic: 'Brewing Methods', count: '12 articles', icon: '☕' },
              { topic: 'Bean Origins', count: '8 articles', icon: '🌍' },
              { topic: 'Roasting Guide', count: '6 articles', icon: '🔥' },
              { topic: 'Latte Art', count: '10 articles', icon: '🎨' }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow cursor-pointer bg-gray-900 border-gray-800">
                <CardContent className="p-0">
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{item.topic}</h3>
                  <p className="text-sm text-gray-400">{item.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Tips;
