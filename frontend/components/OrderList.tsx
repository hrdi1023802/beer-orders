'use client';
import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function OrderList() {
    const { data: orders, error } = useSWR('http://localhost:8000/orders', fetcher);

    if (error) return <div>Error al cargar órdenes</div>;
    if (!orders) return <div>Cargando...</div>;

    return (
        <div className="mt-4 grid gap-4">
            {orders.map((order: any) => (
                <Link
                    key={order.id}
                    href={`/order/${order.id}`}
                    className="border p-4 rounded-xl hover:shadow transition"
                >
                    <h3 className="text-lg font-semibold">Orden #{order.id}</h3>
                    <p>Creada: {order.created}</p>
                    <p>Pagada: {order.paid ? 'Sí' : 'No'}</p>
                </Link>
            ))}
        </div>
    );
}
