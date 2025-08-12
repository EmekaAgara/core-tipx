import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import {
  FiCopy,
  FiShare2,
  FiDownload,
  FiCheck,
  FiZap,
  FiDollarSign,
  FiUsers,
  FiArrowRight,
  FiGift,
} from "react-icons/fi";
import QRCode from "react-qr-code";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Leaderboard from "../components/Leaderboard";
import Stats from "../components/Stats";
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      {/* ... ( Head and Hero section code) ... */}
      <Head>
        <title>CoreTipX | Send Crypto Tips Instantly</title>
        <meta
          name="description"
          content="Send and receive crypto tips instantly on Core blockchain"
        />
      </Head>
      <Navbar />
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="relative z-10">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-6xl lg:text-7xl mb-6 leading-tight"
              >
                <span className="text-purple-400">Reward Creators</span> with
                Crypto Tips
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-xs text-gray-500 mb-8 max-w-lg"
              >
                CoreTipX makes it effortless to support your favorite creators
                with instant CORE tips directly on the blockchain. No middlemen,
                just pure appreciation.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {address ? (
                  <Link
                    href="/profile"
                    className="flex items-center justify-center bg-purple-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                  >
                    My Payment Link <FiArrowRight className="ml-2" />
                  </Link>
                ) : (
                  <button
                    className="flex items-center justify-center bg-purple-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 rounded-lg font-medium transition-all shadow-lg hover:shadow-purple-500/20"
                    onClick={() =>
                      document
                        .querySelector('[data-testid="rk-connect-button"]')
                        ?.click()
                    }
                  >
                    Connect Wallet to Start
                  </button>
                )}
                <Link
                  href="/creators"
                  className="flex items-center justify-center border border-purple-400 text-purple-400 hover:bg-gray-950 hover:text-gray-900 px-8 py-4 rounded-lg font-medium transition-all"
                >
                  Explore Creators
                </Link>
              </motion.div>
            </div>

            {/* Right Column */}
            {/* Leaderboard  */}
            <Leaderboard />
          </div>
        </div>
      </section>

      {/* Stats  */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Stats />
      </div>

      {/* Featured Creators  */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FeaturedCreators />
      </div> */}

      {/* HowItWorks */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HowItWorks />
      </div>

      {/* Features Section */}
      <section className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Instant Payments",
                description: "Tips arrive instantly with Core blockchain speed",
                icon: <FiZap className="text-4xl text-purple-400 mb-4" />,
              },
              {
                title: "Keep 100%",
                description: "No platform fees - you keep all your earnings",
                icon: (
                  <FiDollarSign className="text-4xl text-purple-400 mb-4" />
                ),
              },
              {
                title: "Global Reach",
                description: "Receive support from fans anywhere in the world",
                icon: <FiUsers className="text-4xl text-purple-400 mb-4" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black p-8 rounded border border-gray-800 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/10"
              >
                {feature.icon}
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-900">
        <p className="py-5 text-sm text-center">
          Copyright 2025 @ CoreTipx - All Right Reserved.
        </p>
      </div>
    </div>
  );
}
