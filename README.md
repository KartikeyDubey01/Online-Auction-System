---

# 🛒 Online Auction System

A web-based auction platform where users can bid on items in real time. Built with **Node.js**, **Express**, **MySQL**, and **EJS**, this application allows sellers to list auction items and buyers to place bids securely and transparently.

---

## 🚀 Features

- Live auction listings with item details
- Real-time bidding system
- Bid validation against current and starting price
- Clean UI using EJS templates
- Error/success handling for bidding
- Server-side data validation
- Static file support (CSS, JS, images)

---

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: EJS templating
- **Database**: MySQL
- **Other**: HTML, CSS, JavaScript

---

## 📁 Project Structure

```
Online-Auction-System/
│
├── public/              # Static files (CSS, JS, images)
├── views/               # EJS templates
│   └── auction.ejs
├── database.js          # MySQL connection setup
├── server.js            # Main server file
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/online-auction-system.git
   cd online-auction-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Database**
   - Create a MySQL database.
   - Add a table named `AuctionItems` with the following fields:

     ```sql
     CREATE TABLE AuctionItems (
         item_id INT AUTO_INCREMENT PRIMARY KEY,
         item_name VARCHAR(100),
         item_description TEXT,
         starting_price DECIMAL(10,2),
         highest_bid DECIMAL(10,2) DEFAULT 0.00,
         bidder_name VARCHAR(100)
     );
     ```

   - Update `database.js` with your MySQL credentials.

4. **Start the Server**
   ```bash
   node server.js
   ```

5. **Visit in Browser**
   ```
   http://localhost:4000
   ```

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

Built with 💻 by Kartikey Dubey – Contributions, feedback, and forks are welcome!

---
