import { type SchemaTypeDefinition } from 'sanity'
import { blockContentType } from './blockContentType'
import { categoryType } from './categoryType'
import { productType } from './productType'
import { salesType } from './saleType'
import { orderType } from './orderType'
import { blogType } from './blogType'
import { authorType } from './authorType'
import { contactType } from './contactType'
import { landscapingProjectType } from './landscapingProjectType'
import { rentalPackageType } from './rentalPackageType'
import { galleryType } from './galleryType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    productType,
    salesType,
    orderType,
    blogType,
    authorType,
    contactType,
    landscapingProjectType,
    rentalPackageType,
    galleryType,
  ],
}
