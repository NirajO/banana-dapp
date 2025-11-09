import { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import { CONTRACT_ADDRESS, ABI } from "./bananaConfig";

function App() {
  const [wallet, setWallet] = useState(null);
  const [balance, setBalance] = useState(null);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");
  const [status, setStatus] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [transfers, setTransfers] = useState([]);

  async function connectWallet() {
    try {
      if (!window.ethereum) return alert("Install Metamask!");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setWallet(signer);
    } catch (error) {
      console.error("Wallet connection error:", error);
      setStatus("⚠️ Wallet connection failed.");
    }
  }

  async function getBalance() {
    if (!wallet) return;
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
      const userAddress = await wallet.getAddress();
      const raw = await contract.balanceOf(userAddress);
      const decimals = await contract.decimals();
      const symbol = await contract.symbol();
      setBalance(ethers.formatUnits(raw, decimals));
      setTokenSymbol(symbol);
      await fetchTransferHistory(contract, decimals);
    } catch (error) {
      console.error("Balance fetch error:", error);
      setStatus("⚠️ Could not fetch balance.");
    }
  }

  async function fetchTransferHistory(contract, decimals) {
    try {
      const filter = contract.filters.Transfer();
      const events = await contract.queryFilter(filter, -10000); // Last ~10k blocks
      const formatted = events.reverse().map((e) => ({
        from: e.args.from,
        to: e.args.to,
        value: ethers.formatUnits(e.args.value, decimals),
        tx: e.transactionHash
      }));
      setTransfers(formatted.slice(0, 5));
    } catch (err) {
      console.error("Transfer history error:", err);
    }
  }

  async function sendBanana() {
    if (!wallet) return;
    setStatus("⏳ Sending transaction...");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
      const decimals = await contract.decimals();
      const tx = await contract.transfer(to, ethers.parseUnits(amount, decimals));
      await tx.wait();
      setStatus("✅ Banana sent successfully!");
      getBalance();
    } catch (error) {
      console.error("Transfer error:", error);
      setStatus("❌ Failed to send Banana.");
    }
  }

  async function mintBanana() {
    if (!wallet) return;
    setStatus("⏳ Minting...");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
      const decimals = await contract.decimals();
      const tx = await contract.mint(await wallet.getAddress(), ethers.parseUnits(mintAmount, decimals));
      await tx.wait();
      setStatus("✅ Minted successfully!");
      getBalance();
    } catch (error) {
      console.error("Mint error:", error);
      setStatus("❌ Mint failed.");
    }
  }

  async function burnBanana() {
    if (!wallet) return;
    setStatus("⏳ Burning...");
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);
      const decimals = await contract.decimals();
      const tx = await contract.burn(ethers.parseUnits(burnAmount, decimals));
      await tx.wait();
      setStatus("🔥 Burned successfully!");
      getBalance();
    } catch (error) {
      console.error("Burn error:", error);
      setStatus("❌ Burn failed.");
    }
  }

  useEffect(() => {
    if (wallet) getBalance();
  }, [wallet]);

  return (
    <div className="container">
      <h1>🍌 Banana Token DApp</h1>

      {!wallet && <button onClick={connectWallet}>Connect Wallet</button>}

      {wallet && (
        <>
          <p><strong>Connected Wallet:</strong> {wallet.address}</p>
          <p><strong>Your {tokenSymbol}:</strong> {balance ?? "..."} </p>

          <input
            placeholder="Recipient address"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <br />
          <input
            placeholder={`Amount to send`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <br />
          <button onClick={sendBanana}>Send {tokenSymbol} 🍌</button>

          <br /><br />
          <input
            placeholder={`Amount to mint`}
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <br />
          <button onClick={mintBanana}>Mint {tokenSymbol} 🍌</button>

          <br /><br />
          <input
            placeholder={`Amount to burn`}
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <br />
          <button onClick={burnBanana}>Burn {tokenSymbol} 🔥</button>

          {status && <p style={{ marginTop: "15px", color: "#444" }}>{status}</p>}

          {transfers.length > 0 && (
            <div style={{ marginTop: "25px", textAlign: "left" }}>
              <h3>📜 Recent Transfers</h3>
              <ul>
                {transfers.map((tx, index) => (
                  <li key={index}>
                    <div><strong>From:</strong> {tx.from}</div>
                    <div><strong>To:</strong> {tx.to}</div>
                    <div><strong>Amount:</strong> {tx.value} {tokenSymbol}</div>
                    <div>
                      <a href={`https://sepolia.etherscan.io/tx/${tx.tx}`} target="_blank" rel="noreferrer">
                        View Tx ↗
                      </a>
                    </div>
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
