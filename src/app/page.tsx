// src/app/page.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

async function getProducts(): Promise<Product[]> {
  const res = await fetch('https://fakestoreapi.com/products');
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
      <main className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
            <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="border rounded-lg p-4 hover:shadow-md transition"
            >
              <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="w-full h-48 object-contain mb-2"
              />
              <h2 className="text-lg font-semibold line-clamp-2">{product.title}</h2>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
        ))}
      </main>
  );
}
