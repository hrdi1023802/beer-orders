export const store = {
    stock: {
        last_updated: new Date().toISOString(),
        beers: [
            { name: 'Corona', price: 115, quantity: 2 },
            { name: 'Quilmes', price: 120, quantity: 0 },
            { name: 'Club Colombia', price: 110, quantity: 3 },
        ],
    },
    orders: [] as any[],
};