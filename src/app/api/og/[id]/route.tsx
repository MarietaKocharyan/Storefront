import Image from 'next/image';
import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 36,
                    width: '100%',
                    height: '100%',
                    background: 'white',
                    padding: '40px',
                    textAlign: 'center',
                }}
            >
                <Image
                    width={300}
                    height={300}
                    src={product.image}
                    alt={product.title}
                    style={{ objectFit: 'contain', marginBottom: '20px' }}
                />
                <strong style={{ fontSize: 40 }}>{product.title}</strong>
                <span style={{ fontSize: 28, color: 'gray' }}>${product.price}</span>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    );
}
