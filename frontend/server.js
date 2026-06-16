const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Backend URL will be injected via Kubernetes Environment Variables
const BACKEND_URL = process.env.BACKEND_SERVICE_URL || 'http://localhost:5000';

app.get('/', async (req, res) => {
    try {
        // Fetch products from the backend
        const response = await axios.get(`${BACKEND_URL}/products`);
        const products = response.data;

        let html = `<h1>Welcome to Mini-Amazon</h1><ul>`;
        products.forEach(p => {
            html += `<li>${p.name} - $${p.price} <button onclick="buy('${p.id}')">Buy Now</button></li>`;
        });
        html += `</ul>
        <script>
            function buy(id) {
                fetch('${BACKEND_URL}/checkout', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ productId: id })
                })
                .then(res => res.json())
                .then(data => alert(data.message))
                .catch(err => alert('Payment Failed!'));
            }
        </script>`;
        res.send(html);
    } catch (error) {
        res.status(500).send("Error connecting to backend service.");
    }
});

app.listen(PORT, () => console.log(`Frontend running on port ${PORT}`));
