const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // for generating unique order IDs

const app = express();
const PORT = 3003;

app.use(bodyParser.json());

// Dummy in-memory array for orders
let orders = [
  {
    id: '1',
    customerId: 'cust123',
    restaurantId: 'rest123',
    items: [
      { name: 'Zinger Burger', quantity: 2 },
      { name: 'Fries', quantity: 1 }
    ],
    status: 'Pending',
    paymentStatus: 'Success'
  }
];

// 👉 Create a new order
app.post('/api/orders', (req, res) => {
  const { customerId, restaurantId, items } = req.body;

  if (!customerId || !restaurantId || !items || items.length === 0) {
    return res.status(400).json({ message: 'Invalid order data' });
  }

  const newOrder = {
    id: uuidv4(),
    customerId,
    restaurantId,
    items,
    status: 'Pending',
    paymentStatus: 'Success' // dummy payment success
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Order placed', order: newOrder });
});

// 👉 Get all orders
app.get('/', (req, res) => {
  res.json(orders);
});

// 👉 Get a specific order
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id);

  if (!order) return res.status(404).json({ message: 'Order not found' });

  res.json(order);
});

// 👉 Update an order status
app.put('/api/orders/:id', (req, res) => {
  const { status } = req.body;
  const order = orders.find(o => o.id === req.params.id);

  if (!order) return res.status(404).json({ message: 'Order not found' });

  if (status) order.status = status;

  res.json({ message: 'Order updated', order });
});

// 👉 Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const index = orders.findIndex(o => o.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Order not found' });

  const deleted = orders.splice(index, 1);
  res.json({ message: 'Order deleted', order: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Order Service (Array-based) running on port ${PORT}`);
});
