import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import QRCode from "react-qr-code";

export default function QRCodeGenerator() {
  const { address } = useAccount();
  const [tipLink, setTipLink] = useState("");

  useEffect(() => {
    if (address) {
      const link = `${window.location.origin}/tip/${address}`;
      setTipLink(link);
    }
  }, [address]);

  const copyToClipboard = () => {
    if (tipLink) {
      navigator.clipboard.writeText(tipLink);
      toast.success("Link copied to clipboard!");
    }
  };

  if (!address) {
    return (
      <p className="text-gray-500">
        Connect your wallet to generate a tip link
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* QR Code Container */}
      <div className="p-4 bg-white rounded-lg border border-gray-300">
        {tipLink && (
          <QRCode
            value={tipLink}
            size={200}
            level="H"
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        )}
      </div>

      {/* Link display */}
      <div className="flex flex-col w-full max-w-md space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={tipLink}
            readOnly
            className="p-2 border rounded flex-grow text-sm"
          />
          <button
            onClick={copyToClipboard}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap text-sm"
            disabled={!tipLink}
          >
            Copy
          </button>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Share this link to receive tips from your fans
        </p>
      </div>
    </div>
  );
}
