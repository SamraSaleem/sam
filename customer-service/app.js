const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3002;

app.use(bodyParser.json());

// Dummy data array for customers

//insert 2 more data in Array


let customers = [
  {
    id: '1',
    name: 'Ali Khan',
    email: 'ali@example.com',
    preferences: {
      cuisine: 'Pakistani',
      deliveryTime: 'Evening'
    }
  },
    {
    id: '2',
    name: 'Sara Ali',
    email: 'sara@gmail.com',
    preferences: {
      cuisine: 'Italian',
      deliveryTime: 'Afternoon'
    }
    }
];

// 🔹 Register a new customer
app.post('/api/customers', (req, res) => {
  const { name, email, preferences } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  const newCustomer = {
    id: uuidv4(),
    name,
    email,
    preferences: preferences || {}
  };

  customers.push(newCustomer);
  res.status(201).json({ message: 'Customer registered', customer: newCustomer });
});

// 🔹 Get all customers
app.get('/' , (req, res) => {
  res.json(customers);
});

// 🔹 Get a customer by ID
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);

  if (!customer) return res.status(404).json({ message: 'Customer not found' });

  res.json(customer);
});

// 🔹 Update customer preferences
app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === req.params.id);

  if (!customer) return res.status(404).json({ message: 'Customer not found' });

  customer.preferences = req.body.preferences || customer.preferences;

  res.json({ message: 'Preferences updated', customer });
});

// 🔹 Delete a customer
app.delete('/api/customers/:id', (req, res) => {
  const index = customers.findIndex(c => c.id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Customer not found' });

  const deleted = customers.splice(index, 1);
  res.json({ message: 'Customer deleted', customer: deleted[0] });
});

// Start server
app.listen(PORT, () => {
  console.log(`Customer Service running on port ${PORT}`);
});
