import { useAccount, useBalance } from "wagmi";

export default function WalletBalance() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });

  return (
    <div className="p-4 border border-gray-800 rounded-lg mb-4">
      <h3 className="font-bold">Your Wallet</h3>
      {address ? (
        <>
          <p>
            Address: {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
          <p>
            Balance: {balance?.formatted} {balance?.symbol}
          </p>
        </>
      ) : (
        <p>Connect your wallet to view balance</p>
      )}
    </div>
  );
}
