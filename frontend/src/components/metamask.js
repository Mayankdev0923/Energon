export const connectWallet = async () => {
  if (!window.ethereum) {
    alert("MetaMask not detected! Please install it.");
    return null;
  }

  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0];
  } catch (error) {
    console.error("MetaMask connection failed:", error);
    alert("User denied wallet connection.");
    return null;
  }
};
