import { NextRequest, NextResponse } from 'next/server';
import { getOrderById } from '@/data/orders';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const order = getOrderById(id);

  if (!order) {
    return NextResponse.json(
      { error: `Order '${id}' not found.` },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}
