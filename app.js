const express = require('express');
const path = require('path');
const pool = require('./database');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        // Modified query to properly cast decimal values
        const [items] = await pool.query(`
            SELECT 
                item_id,
                item_name,
                item_description,
                CAST(starting_price AS DECIMAL(10,2)) as starting_price,
                CAST(highest_bid AS DECIMAL(10,2)) as highest_bid,
                bidder_name
            FROM AuctionItems
        `);
        res.render('auction', { items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

app.post('/bid', async (req, res) => {
    const { itemId, bidderName, bidAmount } = req.body;
    
    try {
        // Check current highest bid
        const [rows] = await pool.query(
            'SELECT highest_bid, starting_price FROM AuctionItems WHERE item_id = ?',
            [itemId]
        );
        
        if (rows.length === 0) {
            return res.status(404).send('Item not found');
        }
        
        const { highest_bid, starting_price } = rows[0];
        const bidValue = parseFloat(bidAmount);
        
        if (bidValue > highest_bid && bidValue >= starting_price) {
            await pool.query(
                'UPDATE AuctionItems SET highest_bid = ?, bidder_name = ? WHERE item_id = ?',
                [bidValue, bidderName, itemId]
            );
            res.redirect('/?success=Bid placed successfully!');
        } else {
            res.redirect(`/?error=Your bid must be higher than $${highest_bid.toFixed(2)} (current highest) and $${starting_price.toFixed(2)} (starting price)`);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});