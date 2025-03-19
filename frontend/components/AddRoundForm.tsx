'use client';
import { useState, useEffect } from 'react';

type OrderItem = {
    name: string;
    quantity: number;
};

type StockItem = {
    name: string;
    price: number;
    quantity: number;
};

type ItemField = 'name' | 'quantity';

export default function AddRoundForm({ orderId, mutate }: { orderId: string; mutate: () => void }) {
    const [items, setItems] = useState<OrderItem[]>([{ name: '', quantity: 1 }]);
    const [stock, setStock] = useState<StockItem[]>([]);

    useEffect(() => {
        fetch('http://localhost:8000/stock')
            .then((res) => res.json())
            .then((data) => setStock(data.beers));
    }, []);

    const handleAddItem = () => {
        setItems([...items, { name: '', quantity: 1 }]);
    };

    const handleItemChange = (index: number, field: ItemField, value: any) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value,
        };
        setItems(newItems);
    };

    const handleSubmit = async () => {
        const roundPayload = {
            created: new Date().toISOString(),
            items,
        };

        const response = await fetch(`http://localhost:8000/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(roundPayload),
        });

        const result = await response.json();
        if (result.error) {
            alert(result.error);
        } else {
            alert('Ronda agregada correctamente');
            mutate(); // Refresca los datos sin recargar la página
            fetch('http://localhost:8000/stock')
                .then((res) => res.json())
                .then((data) => setStock(data.beers)); // Actualiza el stock mostrado
            setItems([{ name: '', quantity: 1 }]); // Limpia el formulario
        }
    };

    return (
        <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Agregar Ronda</h3>
            {items.map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                    <select
                        value={item.name}
                        onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                        className="border px-2 py-1"
                    >
                        <option value="">Seleccione cerveza</option>
                        {Array.isArray(stock) && stock.map((beer) => (
                            <option key={beer.name} value={beer.name} disabled={beer.quantity === 0}>
                                {beer.name} (Disponibles: {beer.quantity})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        className="border px-2 py-1 w-20"
                    />
                </div>
            ))}
            <button onClick={handleAddItem} className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                + Añadir item
            </button>
            <button onClick={handleSubmit} className="bg-green-500 text-white px-3 py-1 rounded">
                Guardar Ronda
            </button>
        </div>
    );
}