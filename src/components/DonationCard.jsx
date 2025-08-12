import { useState } from "react";
import QRCode from "react-qr-code";
import { FiCopy, FiCheck, FiShare2, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";

export default function DonationCard({
  campaignName,
  targetAmount,
  campaignLink,
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(campaignLink);
    toast.success("Link copied to clipboard!");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support ${campaignName}`,
          text: `Help me reach my goal of ${targetAmount} CORE on CoreTipX!`,
          url: campaignLink,
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("campaign-qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      // Add watermark
      ctx.fillStyle = "#6B46C1";
      ctx.font = "bold 14px Arial";
      ctx.textAlign = "center";
      ctx.fillText("CoreTipX.com", canvas.width / 2, canvas.height - 10);

      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `CoreTipX-${campaignName.replace(
        /\s+/g,
        "-"
      )}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svgData))
    )}`;
  };

  return (
    <div className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-purple-400">{campaignName}</h2>
        <div className="flex space-x-2">
          <button
            onClick={shareLink}
            className="p-2 rounded-lg bg-gray-800 hover:bg-purple-900 transition-all relative group"
            title="Share"
          >
            {shared ? (
              <FiCheck className="text-purple-400" />
            ) : (
              <FiShare2 className="text-purple-400" />
            )}
          </button>
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-gray-800 hover:bg-purple-900 transition-all relative group"
            title="Copy"
          >
            {copied ? (
              <FiCheck className="text-purple-400" />
            ) : (
              <FiCopy className="text-purple-400" />
            )}
          </button>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-400">Target Amount:</p>
        <p className="text-xl font-bold text-purple-400">{targetAmount} CORE</p>
      </div>

      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="bg-white p-4 rounded-lg">
            <QRCode
              id="campaign-qr-code"
              value={campaignLink}
              size={160}
              bgColor="#FFFFFF"
              fgColor="#000000"
              level="H"
            />
          </div>
          <button
            onClick={downloadQRCode}
            className="absolute -bottom-2 -right-2 bg-purple-600 hover:bg-purple-700 p-2 rounded-full shadow-lg transition-all group"
            title="Download QR Code"
          >
            <FiDownload className="text-white" />
          </button>
        </div>

        <div className="w-full">
          <p className="text-gray-400 mb-2 text-sm">Your Campaign Link:</p>
          <div className="flex">
            <input
              type="text"
              value={campaignLink}
              readOnly
              className="flex-grow border border-gray-500 rounded-l-lg py-4 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 truncate"
            />
            <button
              onClick={copyToClipboard}
              className="bg-gray-900 hover:bg-[#121212] border border-[#121212] rounded-r-lg py-2 px-3 transition-all"
            >
              {copied ? (
                <FiCheck className="text-green-400" />
              ) : (
                <FiCopy className="text-purple-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
