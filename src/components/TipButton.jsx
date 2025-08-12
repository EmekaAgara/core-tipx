import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { parseEther } from "viem";
import { toast } from "react-toastify";

export default function TipButton({ recipientAddress }) {
  const [amount, setAmount] = useState("0.01");
  const { sendTransaction } = useSendTransaction();
  const { isConnected } = useAccount();

  const handleTip = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!recipientAddress) {
      toast.error("Recipient address is missing");
      return;
    }

    sendTransaction(
      {
        to: recipientAddress,
        value: parseEther(amount),
      },
      {
        onSuccess: () => {
          toast.success(
            `Sent ${amount} CORE to ${recipientAddress.slice(0, 6)}...`
          );
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          step="0.001"
          min="0.001"
          className="p-2 border border-gray-700 mb-3 w-full rounded"
        />
        <span>CORE</span>
      </div>
      <button
        onClick={handleTip}
        className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600"
      >
        Send Tip
      </button>
    </div>
  );
}
