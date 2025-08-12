import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";

export default function TipHistory() {
  const { address } = useAccount();

  // Mock data - in a real app you would fetch this from your backend
  const mockTips = [
    {
      id: 1,
      from: "0x123...456",
      amount: "0.05",
      currency: "CORE",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: 2,
      from: "0x789...012",
      amount: "0.1",
      currency: "CORE",
      timestamp: new Date(Date.now() - 86400000),
    },
  ];

  return (
    <div className="space-y-2">
      {address ? (
        mockTips.length > 0 ? (
          <ul className="divide-y">
            {mockTips.map((tip) => (
              <li key={tip.id} className="py-2">
                <div className="flex justify-between">
                  <span>From: {tip.from}</span>
                  <span className="font-bold">
                    {tip.amount} {tip.currency}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {formatDistanceToNow(tip.timestamp)} ago
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tips received yet</p>
        )
      ) : (
        <p>Connect your wallet to view tip history</p>
      )}
    </div>
  );
}
