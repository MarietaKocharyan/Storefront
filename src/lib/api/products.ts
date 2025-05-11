import {Product} from "@/types/product";

const validateProductData = (product: Product) => product && typeof product === 'object';
export async function fetchProductData(id: string): Promise<Product | null> {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            console.error(`Failed to fetch product ${id}: ${response.status} ${response.statusText}`);
            return null;
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
            console.warn(`Unexpected content type for product ${id}: ${contentType}`);
            return null;
        }

        const text = await response.text();
        if (!text) {
            console.warn(`Empty response body for product ${id}`);
            return null;
        }

        const product = JSON.parse(text);

        return validateProductData(product) ? product : null;
    } catch (error) {
        console.error(`Error fetching product ${id}:`, error);
        return null;
    }
}
