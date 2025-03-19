import OrderList from '@/components/OrderList';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Beer Orders Dashboard 🍻</h1>
            <div className="flex flex-col gap-4">
                <Link
                    href="/order/new"
                    className="bg-blue-500 text-white p-3 rounded-xl text-center hover:bg-blue-600 transition"
                >
                    Agregar Nueva Orden
                </Link>
                <OrderList />
            </div>
        </div>
    );
}