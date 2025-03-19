'use client';
import { useRouter } from 'next/navigation';

export default function NewOrderForm() {
    const router = useRouter();

    const handleCreate = async () => {
        const res = await fetch('/api/orders', { method: 'POST' });
        const newOrder = await res.json();
        router.push(`/order/${newOrder.id}`);
    };

    return (
        <button
            onClick={handleCreate}
            className="bg-green-500 text-white p-3 rounded-xl hover:bg-green-600 transition"
        >
            Crear Orden
        </button>
    );
}
