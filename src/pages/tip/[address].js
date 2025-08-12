import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import TipButton from "../../components/TipButton";
import WalletBalance from "../../components/WalletBalance";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import { FiArrowRight, FiUser } from "react-icons/fi";

export default function TipPage() {
  const router = useRouter();
  const { address } = router.query;
  const { isConnected } = useAccount();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-purple-400">
            Send a Tip
          </h1>
          <p className="text-sm text-gray-300 max-w-2xl mx-auto">
            Support this creator with a crypto tip
          </p>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        {isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <WalletBalance />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-black border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <FiUser className="text-2xl text-gray-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Recipient Address</h2>

              <p className="text-gray-400 text-sm font-mono">
                {address.slice(0, 6)}...{address.slice(-4)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <TipButton recipientAddress={address} />
          </div>
        </motion.div>

        {!isConnected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-center"
          >
            <button
              onClick={() =>
                document
                  .querySelector('[data-testid="rk-connect-button"]')
                  ?.click()
              }
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20 flex items-center justify-center gap-2 mx-auto"
            >
              Connect Wallet to Tip <FiArrowRight />
            </button>
          </motion.div>
        )}
      </section>
    </div>
  );
}
