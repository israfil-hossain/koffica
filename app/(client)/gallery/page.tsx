import Gallery from '@/features/gallery'
import { getAllGalleryItems } from '@/sanity/helpers'
import React from 'react'

const Page = async () => {
  const galleryItems = await getAllGalleryItems();

  return (
    <Gallery galleryItems={galleryItems} />
  )
}

export default Page
