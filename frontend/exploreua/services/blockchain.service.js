import { ethers } from "ethers";

const contractAddress = "0xC0C3b22C576345b6d08617f0163a006e46d21B46";
const abi = [
    {
        "inputs": [],
        "name": "join",
        "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getBalance",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    }
];


const getProvider = () => {
    if (!window.ethereum) {
        alert("Будь ласка, встановіть MetaMask!");
        return null;
    }
    return new ethers.BrowserProvider(window.ethereum);
};


export const getSigner = async () => {
    try {
        const provider = getProvider();
        if (!provider) return null;
        return await provider.getSigner();
    } catch (error) {
        console.error("Помилка підключення MetaMask:", error);
        return null;
    }
};


export const getContract = async () => {
    const signer = await getSigner();
    if (!signer) return null;
    return new ethers.Contract(contractAddress, abi, signer);
};


export const payForTourBlockchain = async (amountInEth = "0.001") => {
    try {
        const contract = await getContract();
        if (!contract) return null;

        console.log("Відправляємо транзакцію...");
        
        const tx = await contract.join({
            value: ethers.parseEther(amountInEth)
        });

        console.log("Чекаємо підтвердження...");
        const receipt = await tx.wait(); 

        console.log("Оплата успішна:", receipt.hash);
        return receipt.hash; 
    } catch (error) {
        console.error("Помилка при оплаті в блокчейні:", error);
        throw error;
    }
};