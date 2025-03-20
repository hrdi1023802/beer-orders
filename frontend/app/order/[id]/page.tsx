'use client';
import { notFound } from 'next/navigation';
import AddRoundForm from '@/components/AddRoundForm';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrderDetail({ params }: { params: { id: string } }) {
    const { data: order, error, isLoading, mutate } = useSWR(
        params.id ? `http://localhost:8000/orders/${params.id}` : null,
        fetcher,
        {
            revalidateOnMount: true,
            refreshInterval: 0,
        }
    );

    if (error || (!order && !isLoading)) {
        fetch('http://localhost:8000/orders', { method: 'POST' })
            .then(res => res.json())
            .then(newOrder => {
                window.location.href = `/order/${newOrder.id}`;
            });
        return <div>Creando orden...</div>;
    }
    if (isLoading) return <div>Cargando...</div>;

    const handlePayOrder = async () => {
        if (!order.rounds || order.rounds.length === 0) {
            alert('No se puede pagar una orden sin rondas.');
            return;
        }
        try {
            const res = await fetch(`http://localhost:8000/orders/${params.id}/pay`, { method: 'PATCH' });
            if (res.ok) {
                alert('Orden pagada con éxito');
                window.location.href = '/';
            } else {
                const errorResponse = await res.json();
                alert(errorResponse.error || 'No se pudo pagar la orden.');
            }
        } catch (err) {
            console.error('Error al pagar:', err);
            alert('Ocurrió un error al procesar el pago.');
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Detalle Orden #{params.id}</h2>
            <p>Creada: {order.created}</p>
            <p>Pagada: {order.paid ? 'Sí' : 'No'}</p>
            <h3 className="text-lg font-bold mt-4">Rounds:</h3>
            {order.rounds?.length > 0 ? (
                <ul className="list-disc ml-6 mb-4">
                    {order.rounds.map((round: any, index: number) => (
                        <li key={index}>
                            <p>{round.created}</p>
                            {round.items?.length > 0 ? (
                                <ul className="ml-4 list-square">
                                    {round.items.map((item: any, idx: number) => (
                                        <li key={idx}>
                                            {item.quantity} x {item.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No hay items en esta ronda</p>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay rondas registradas</p>
            )}
            <AddRoundForm orderId={params.id} mutate={mutate} />
            {!order.paid && (
                <button
                    onClick={handlePayOrder}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Pagar Orden
                </button>
            )}
        </div>
    );
}