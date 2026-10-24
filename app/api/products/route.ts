import { NextRequest, NextResponse } from 'next/server';
import { PRODUCTS, Product } from '@/data/products';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q')?.toLowerCase().trim() || '';
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || '';
  const featured = searchParams.get('featured') === 'true';
  const noFail = searchParams.get('no_fail') === 'true';
  const forceFail = searchParams.get('force_fail') === 'true';

  // Simulate network delay (300-800ms)
  const delay = Math.floor(Math.random() * 500) + 300;
  await new Promise((resolve) => setTimeout(resolve, delay));

  // Simulate occasional server failure (~10% chance unless disabled or forced)
  const shouldFail = forceFail || (!noFail && Math.random() < 0.10);
  if (shouldFail) {
    return NextResponse.json(
      { error: 'Simulated backend error: Server busy or connection timeout. Please retry.' },
      { status: 500 }
    );
  }

  let filtered: Product[] = [...PRODUCTS];

  // Search filter
  if (q) {
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (category && category !== 'All Categories') {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  // Featured filter
  if (featured) {
    filtered = filtered.filter((p) => p.featured);
  }

  // Sorting
  if (sort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  return NextResponse.json({
    products: filtered,
    total: filtered.length,
  });
}