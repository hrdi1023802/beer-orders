import { NextResponse } from 'next/server';
import { store } from '@/lib/store';

export async function GET(request: Request, context: { params: { id: string } }) {
    const id = parseInt(context.params.id);
    const order = store.orders[id];

    if (!order) {
        return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(JSON.parse(JSON.stringify(order)));
}

export async function PATCH(req: Request, context: { params: { id: string } }) {
    const data = await req.json();
    const order = store.orders[parseInt(context.params.id)];

    if (order) {
        order.rounds.push({
            created: new Date().toISOString(),
            items: data.items,
        });
    }

    return NextResponse.json(order);
}