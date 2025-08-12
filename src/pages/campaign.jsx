import { useState } from "react";
import { useAccount } from "wagmi";
import DonationCard from "../components/DonationCard";
import { motion } from "framer-motion";
import { FiPlusCircle, FiAlertCircle } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
import Navbar from "../components/Navbar";

export default function Campaign() {
  const { isConnected, address } = useAccount();
  const [campaignName, setCampaignName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [createdCampaign, setCreatedCampaign] = useState(null);

  const createCampaign = () => {
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    if (!campaignName || !targetAmount) {
      alert("Please fill all fields");
      return;
    }
    const link = `${
      window.location.origin
    }/tip/${address}?campaign=${encodeURIComponent(
      campaignName
    )}&target=${targetAmount}`;
    setCreatedCampaign({
      name: campaignName,
      target: targetAmount,
      link: link,
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400">
            Create a Fundraiser
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Set up a campaign to receive support from your community
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isConnected ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FiPlusCircle className="text-purple-500" />
                  <span className="text-purple-500">New Campaign</span>
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block mb-2 text-gray-400">
                    Campaign Name
                  </label>
                  <input
                    type="text"
                    value={campaignName}
                    onChange={(e) => setCampaignName(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="e.g. My Creative Project"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-gray-400">
                    Target Amount (CORE)
                  </label>
                  <input
                    type="number"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    min="0.1"
                    step="0.1"
                    placeholder="10.0"
                  />
                </div>
                <button
                  onClick={createCampaign}
                  className="w-full bg-purple-600 hover:from-purple-700 hover:to-blue-700 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                >
                  Create Campaign
                </button>
              </div>
            </motion.div>

            {/* Right Column - Shows either placeholder or campaign card */}
            {createdCampaign ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-blackrounded-xl hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                <DonationCard
                  campaignName={createdCampaign.name}
                  targetAmount={createdCampaign.target}
                  campaignLink={createdCampaign.link}
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10 flex items-center justify-center min-h-[400px]"
              >
                <h1 className="text-gray-400 text-center">
                  Your campaign link will appear here
                </h1>
              </motion.div>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <div className="flex items-center justify-center mb-8">
              <GoAlertFill className="animate-pulse text-purple-500 text-6xl" />
            </div>
            <p className="text-xl mb-8">
              Connect your wallet to create a fundraiser
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
