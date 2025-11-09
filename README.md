# 🍌 Banana Token DApp

A decentralized web application for interacting with the **Banana Token (BAN)** — a custom ERC-20 cryptocurrency deployed on the Ethereum Sepolia test network.  
This DApp allows users to connect their wallets, view balances, transfer tokens, and perform mint/burn operations — all through a simple and responsive React interface.

---

## 🚀 Features

✅ **Connect Wallet** – Seamlessly connect using MetaMask.  
✅ **View Balances** – Instantly display your token holdings.  
✅ **Transfer Tokens** – Send BAN tokens securely between accounts.  
✅ **Mint & Burn** – Owner can mint new tokens or burn existing ones.  
✅ **Transaction Feedback** – Real-time status updates (pending, success, or failed).  
✅ **Live Transaction History** – View all token transfer activity dynamically.  
✅ **Responsive UI** – Works smoothly on both desktop and mobile devices.  

---

## 🧠 Tech Stack

| Layer | Tools / Frameworks |
|-------|---------------------|
| **Frontend** | React, Vite, TailwindCSS |
| **Blockchain** | Solidity, Hardhat, Sepolia Testnet |
| **Web3 Integration** | Ethers.js, MetaMask |
| **Version Control** | Git & GitHub |

---

## ⚙️ Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/NirajO/banana-dapp.git
cd banana-dapp
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Locally
```bash
npm run dev
```
Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🪙 Smart Contract Info

- **Token Name:** Banana  
- **Symbol:** BAN  
- **Initial Supply:** 1,000,000 BAN  
- **Network:** Ethereum Sepolia Testnet  
- **Type:** ERC-20 (Mintable, Burnable, Ownable)  
- **Tools Used:** Hardhat, MetaMask, Etherscan  

---

## 📁 Folder Structure

```
banana-dapp/
│
├── src/
│   ├── components/        # Reusable React components (buttons, forms, etc.)
│   ├── pages/             # Pages (Home, Wallet, History, etc.)
│   ├── context/           # React context for managing wallet & token state
│   ├── utils/             # Helper files (ABI, contract config)
│   └── App.jsx            # Root React file
│
├── public/                # Static assets (logo, icons, etc.)
├── package.json
├── README.md
└── vite.config.js
```

---

## 🌐 Deployment

You can deploy this DApp easily using **Vercel**, **Netlify**, or **GitHub Pages**.  
Make sure your contract address and network match your deployed contract before building:

```bash
npm run build
```

---

## 🤝 Contributing

Pull requests are welcome!  
If you'd like to contribute, please fork the repository and create a new branch:

```bash
git checkout -b feature/your-feature
git commit -m "Add new feature"
git push origin feature/your-feature
```

Then open a **Pull Request**.

---

## 🧑‍💻 Author

**Niraj Ojha**  
🎓 Computer Science @ McNeese State University  
💡 Passionate about blockchain, AI, and full-stack development  
🔗 [GitHub Profile](https://github.com/NirajO)

---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
