import { useState } from "react";
import { useAccount } from "wagmi";
import QRCode from "react-qr-code";
import TipHistory from "../components/TipHistory";
import { motion } from "framer-motion";
import {
  FiZap,
  FiDollarSign,
  FiUsers,
  FiShare2,
  FiCopy,
  FiAward,
  FiUser,
  FiLink,
  FiDownload,
  FiCheck,
} from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
import Link from "next/link";
import Navbar from "../components/Navbar";

export default function Profile() {
  const { isConnected, address } = useAccount();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const tipLink = address ? `${window.location.origin}/tip/${address}` : "";

  const copyToClipboard = () => {
    if (!tipLink) return;
    navigator.clipboard.writeText(tipLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My CoreTipX Profile",
          text: "Support me with crypto tips on CoreTipX!",
          url: tipLink,
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
    if (!tipLink) return;

    const svg = document.getElementById("qr-code-svg");
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
      downloadLink.download = `CoreTipX-${address?.slice(0, 6)}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(
      unescape(encodeURIComponent(svgData))
    )}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isConnected ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400">
              Your Tipping Link
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl mx-auto">
              Share your tipping link and track your supporter contributions
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-center">
              <GoAlertFill className="animate-pulse text-purple-500 text-9xl" />
            </div>
          </>
        )}
      </section>

      {/* Profile Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enhanced QR Code Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiLink className="text-purple-500" />
                  <span className="text-purple-500">Your Tip Link</span>
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={shareLink}
                    className="p-2 rounded-lg bg-[#121212] hover:bg-purple-900 transition-all relative group"
                    title="Share"
                  >
                    {shared ? (
                      <FiCheck className="text-purple-400" />
                    ) : (
                      <FiShare2 className="text-purple-400" />
                    )}
                    <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-[#121212] text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {shared ? "Shared!" : "Share"}
                    </span>
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 rounded-lg bg-[#121212] hover:bg-purple-900 transition-all relative group"
                    title="Copy"
                  >
                    {copied ? (
                      <FiCheck className="text-purple-400" />
                    ) : (
                      <FiCopy className="text-purple-400" />
                    )}
                    <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied ? "Copied!" : "Copy"}
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCode
                      id="qr-code-svg"
                      value={tipLink}
                      size={250}
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
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      Download
                    </span>
                  </button>
                </div>

                <div className="w-full mt-6">
                  <p className="text-gray-400 mb-2 text-sm">Your Tip Link:</p>
                  <div className="flex">
                    <input
                      type="text"
                      value={tipLink}
                      readOnly
                      className="flex-grow border border-gray-700 rounded-l-lg py-4 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 truncate"
                    />
                    <button
                      onClick={copyToClipboard}
                      className="bg-[#121212] hover:bg-[#121212] border border-gray-700 rounded-r-lg py-2 px-5 transition-all"
                    >
                      {copied ? (
                        <FiCheck className="text-green-400" />
                      ) : (
                        <FiCopy className="text-purple-400" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-gray-400 text-sm text-center">
                  Scan or share this QR code to receive tips
                </p>
              </div>
            </motion.div>

            {/* Tip History Card (unchanged) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-black border border-gray-800 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiAward className="text-purple-500" />
                  <span className="text-purple-500">Your Tip History</span>
                </h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        <FiUser className="text-2xl text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium">From: 0x7f...3a4b</h3>
                        <p className="text-sm text-gray-400">{item} day ago</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-purple-400">
                        {0.1 * item} CORE
                      </p>
                      <p className="text-xs text-gray-500">Received</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <p className="text-xl mb-8">
              Connect your wallet to view your Qr Link
            </p>
            <button
              className="bg-purple-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
              onClick={() =>
                document
                  .querySelector('[data-testid="rk-connect-button"]')
                  ?.click()
              }
            >
              Connect Wallet
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
