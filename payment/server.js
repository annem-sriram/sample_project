const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

app.post('/charge', (req, res) => {
    const { amount } = req.body;
    console.log(`Processing dummy payment for $${amount}`);
    
    // Simulating a successful payment
    res.json({
        success: true,
        status: `Charged $${amount} successfully via DummyPay!`
    });
});

app.listen(PORT, () => console.log(`Payment service running on port ${PORT}`));
