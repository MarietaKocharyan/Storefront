import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Product } from '@/types/product';

interface ProductPageProps {
    params: { id: string };
}
async function getProduct(id: string): Promise<Product | null> {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
            next: { revalidate: 60 }, // Optional: revalidate every 60 seconds
        });

        if (!res.ok) {
            console.warn(`Failed to fetch product ${id}: ${res.status} ${res.statusText}`);
            return null;
        }

        const product = await res.json();

        if (!product || typeof product !== 'object' || !product.id) {
            console.warn(`Invalid product data for ID ${id}`);
            return null;
        }

        return product;
    } catch (err) {
        console.error(`Error fetching product ${id}:`, err);
        return null;
    }
}

export async function generateMetadata({ params }: ProductPageProps) {
    const product = await getProduct(params.id);
    if (!product) return {};

    return {
        title: `${product.title} | Fake Store`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [
                {
                    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og/${params.id}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    const product = await getProduct(params.id);
    if (!product) return notFound();


    return (
        <main className="p-6 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
                <Image
                    src={product.image}
                    alt={product.title}
                    width={500}
                    height={500}
                    className="object-contain max-h-[400px] w-full"
                />
                <div>
                    <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
                    <p className="text-green-600 text-xl font-semibold mb-2">${product.price}</p>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                </div>
            </div>
        </main>
    );
}
