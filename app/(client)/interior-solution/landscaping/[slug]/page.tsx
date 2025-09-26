/* eslint-disable @typescript-eslint/no-explicit-any */
import { getLandscapingProjectBySlug } from '@/sanity/helpers';
import { urlFor } from '@/sanity/lib/image';
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getLandscapingProjectBySlug(slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function LandscapingProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getLandscapingProjectBySlug(slug);

  if (!project) {
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

        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8">{project.description}</p>
          
          {project.price && (
            <div className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold">
              {project.price}
            </div>
          )}
        </div>

        {/* Main Image */}
        {project.image && (
          <div className="mb-12 rounded-lg overflow-hidden">
            <Image
              src={urlFor(project.image).url()}
              alt={project.title}
              width={1200}
              height={600}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {project.detailedDescription && (
              <div className="prose prose-lg max-w-none mb-8">
                <PortableText value={project.detailedDescription} />
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.gallery.map((image:any, index:number) => (
                    <Image
                      key={index}
                      src={urlFor(image).url()}
                      alt={`${project.title} gallery ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Features */}
            {project.features && project.features.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {project.features.map((feature:any, index:number) => (
                    <li key={index} className="flex items-start">
                      <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA */}
            <div className="bg-primary text-white rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Interested in This Project?</h3>
              <p className="text-green-100 mb-6">
                Get a free consultation and quote for your space transformation.
              </p>
              <Link href={process.env.NEXT_PUBLIC_CALENDY || ""}>
                <Button className="w-full bg-white text-primary hover:bg-gray-100">
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
