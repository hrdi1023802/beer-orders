import { NextResponse } from 'next/server';

export async function GET() {
    const response = await fetch('http://localhost:8000/orders');
    const data = await response.json();
    return NextResponse.json(data);
}

export async function POST() {
    const response = await fetch('http://localhost:8000/orders', {
        method: 'POST',
    });
    const data = await response.json();
    return NextResponse.json(data);
}
