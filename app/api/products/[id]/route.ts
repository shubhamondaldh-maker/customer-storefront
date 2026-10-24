import { NextRequest, NextResponse } from 'next/server';
import { getProductById, getProductBySlug } from '@/data/products';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Simulate network delay (300-800ms)
  const delay = Math.floor(Math.random() * 500) + 300;
  await new Promise((resolve) => setTimeout(resolve, delay));

  const product = getProductById(id) || getProductBySlug(id);

  if (!product) {
    return NextResponse.json(
      { error: `Product with ID '${id}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(product);
}
