const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const PAYMENT_URL = process.env.PAYMENT_SERVICE_URL || 'http://localhost:8080';

const products = [
    { id: "1", name: "Kubernetes Up & Running Book", price: 40 },
    { id: "2", name: "Sleek Developer Keyboard", price: 120 }
];

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/checkout', async (req, res) => {
    const { productId } = req.body;
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    try {
        // Forward the payment request to the payment microservice
        const paymentResponse = await axios.post(`${PAYMENT_URL}/charge`, {
            amount: product.price
        });
        
        res.json({ message: `Success! ${paymentResponse.data.status}` });
    } catch (error) {
        res.status(500).json({ message: "Payment service unavailable." });
    }
});

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
