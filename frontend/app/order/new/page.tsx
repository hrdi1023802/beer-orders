import NewOrderForm from '@/components/NewOrderForm';

export default function NewOrderPage() {
    return (
        <div className="p-8">
            <h2 className="text-xl font-semibold mb-4">Crear nueva orden</h2>
            <NewOrderForm />
        </div>
    );
}
