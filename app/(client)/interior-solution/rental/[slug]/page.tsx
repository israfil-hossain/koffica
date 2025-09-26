/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRentalPackageBySlug } from '@/sanity/helpers';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const RentPackage = await getRentalPackageBySlug(slug);
  
  if (!RentPackage) {
    return {
      title: 'Package Not Found',
    };
  }

  return {
    title: RentPackage.title,
    description: RentPackage.description,
  };
}

export default async function RentalPackagePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = await getRentalPackageBySlug(slug);

  if (!pkg) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link href="/interior-solution">
          <Button variant="outline" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Interior Solutions
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Package Info */}
          <div>
            {pkg.isPopular && (
              <div className="inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                Most Popular Package
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {pkg.title}
            </h1>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-green-600 mb-2">{pkg.price}</div>
              {pkg.duration && (
                <div className="text-gray-500">{pkg.duration}</div>
              )}
            </div>

            <p className="text-xl text-gray-600 mb-8">{pkg.description}</p>

            {/* Features */}
            {pkg.features && pkg.features.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{"What's Included"}</h3>
                <ul className="space-y-4">
                  {pkg.features.map((feature:any, index:number) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Detailed Description */}
            {pkg.detailedDescription && (
              <div className="prose prose-lg max-w-none mb-8">
                <PortableText value={pkg.detailedDescription} />
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={process.env.NEXT_PUBLIC_CALENDY || ""}>
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3">
                  Choose This Package
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 px-8 py-3">
                  Get Custom Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Package Image */}
          <div>
            {pkg.image && (
              <div className="rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={urlFor(pkg.image).url()}
                  alt={pkg.title}
                  width={600}
                  height={400}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
