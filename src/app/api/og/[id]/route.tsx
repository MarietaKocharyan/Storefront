import Image from 'next/image';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

import {Card} from "@/components/ui/card";
export const runtime = 'edge';

export async function GET(req: NextRequest) {
    const url = new URL(req.url)
    const id = url.pathname.split('/').pop()

    const productRes = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!productRes.ok) {
        return new Response('Product not found', { status: 404 });
    }

    const product = await productRes.json();

    return new ImageResponse(
        (
            <Card>
                <Image
                    width={300}
                    height={300}
                    src={product.image}
                    alt={product.title}
                    style={{ objectFit: 'contain', marginBottom: '20px' }}
                />
                <strong style={{ fontSize: 40 }}>{product.title}</strong>
                <span style={{ fontSize: 28, color: 'gray' }}>${product.price}</span>
            </Card>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
