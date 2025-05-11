import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {ProductPageProps} from "@/types/product";
import {fetchProductData} from "@/lib/api/products";

export async function generateMetadata({ params }: {params :  Promise<ProductPageProps>}) {
    const { id } = await params;

    const product = await fetchProductData(id);

    if (!product) return {};

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';

    return {
        title: `${product.title} | Fake Store`,
        description: product.description,
        openGraph: {
            title: product.title,
            description: product.description,
            images: [
                {
                    url: `${baseUrl}/api/og/${id}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
    };
}

export default async function ProductPage({ params }: {params : Promise<ProductPageProps>}) {
    const { id } = await params;

    const product = await fetchProductData(id);

    if (!product) return notFound();

    return (
        <main className="p-6 max-w-4xl mx-auto">
            <Card className="grid md:grid-cols-2 gap-6 p-4">
                <div className="flex items-center justify-center">
                    <Image
                        width={500}
                        height={500}
                        src={product.image}
                        alt={product.title}
                        className="object-contain max-h-[400px] w-full"
                    />
                </div>

                <div>
                    <CardHeader>
                        <CardTitle className="text-2xl">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-green-600 text-xl font-semibold">${product.price}</p>
                        <Separator />
                        <p className="text-muted-foreground">{product.description}</p>
                        <Button className="w-full mt-4">Add to Cart</Button>
                    </CardContent>
                </div>
            </Card>
        </main>
    );
}