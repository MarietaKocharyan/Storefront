#  Fake Store - Product Page (Next.js + TypeScript)

This project is a product display page using the [Fake Store API](https://fakestoreapi.com/) built with **Next.js 14**, **TypeScript**, and **TailwindCSS** (styled with ShadCN UI).

##  Features

-  Server-side rendering and static generation with `generateMetadata`
-  Dynamic Open Graph (OG) metadata for social sharing
-  Strong typing with TypeScript
-  Optimized image loading via `next/image`
-  Styled with TailwindCSS & ShadCN UI
-  Graceful error handling for invalid or missing products

---

## Project Structure
 /app 
- └── /products/[id]/ # Dynamic product page route
- └── layout.tsx # Root layout
- └── globals.css # Global styles

 /types
- └── product.ts # Type definition for Product


## Environment Variables
NEXT_PUBLIC_BASE_URL=http://localhost:3000


Created by Marieta

