require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

const stripe = require('stripe')("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");

app.post("/payment", async (req, res) => {
    const { items } = req.body;
    console.log()
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card','boleto'],
            mode: 'payment',
            line_items:items.map(item => {
                return{
                    price_data: {
                        currency: 'brl',
                        product_data: {
                            name: item.name,
                            images: [item.image],
                        },
                        unit_amount: item.price * 100
                    },
                    quantity: item.quant,
                }               
            }),
            success_url:`http://localhost:3000/`,
            cancel_url:`http://localhost:3000/`,
        })
        res.json({ url: session.url })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

app.listen(4000, () => console.log("Listening on PORT 4000"));