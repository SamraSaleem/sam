const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); 

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// In-memory array to store restaurants
let restaurants = [
    {
      id: '1',
      name: 'Spice Garden',
      location: 'Chowk Azam',
      menu: [
        { item: 'Chicken Karahi', price: 750 },
        { item: 'Mutton Biryani', price: 850 }
      ]
    }
  ];
  
// 👉 Create a new restaurant
app.post('/api/restaurants', (req, res) => {
    const { name, location, menu } = req.body;

    if (!name || !location) {
        return res.status(400).json({ message: 'Name and location are required' });
    }

    const newRestaurant = {
        id: uuidv4(),
        name,
        location,
        menu: menu || []
    };

    restaurants.push(newRestaurant);
    res.status(201).json({ message: 'Restaurant added', restaurant: newRestaurant });
});

// 👉 Get all restaurants
app.get('/api/restaurants', (req, res) => {
    res.status(200).json(restaurants);
});

// 👉 Get a single restaurant by ID
app.get('/api/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const restaurant = restaurants.find(r => r.id === id);

    if (!restaurant) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    res.json(restaurant);
});

// 👉 Update a restaurant by ID
app.put('/api/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, menu } = req.body;

    const index = restaurants.findIndex(r => r.id === id);
    if (index === -1) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    restaurants[index] = {
        ...restaurants[index],
        name: name || restaurants[index].name,
        location: location || restaurants[index].location,
        menu: menu || restaurants[index].menu
    };

    res.json({ message: 'Restaurant updated', restaurant: restaurants[index] });
});

// 👉 Delete a restaurant by ID
app.delete('/api/restaurants/:id', (req, res) => {
    const { id } = req.params;
    const index = restaurants.findIndex(r => r.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Restaurant not found' });
    }

    const removed = restaurants.splice(index, 1);
    res.json({ message: 'Restaurant deleted', restaurant: removed[0] });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Restaurant Service (Array-based) running on port ${PORT}`);
});
