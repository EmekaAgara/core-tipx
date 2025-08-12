import { motion } from "framer-motion";
import { FiAward, FiTrendingUp, FiUser } from "react-icons/fi";

export default function Leaderboard() {
  const topCreators = [
    {
      rank: 1,
      address: "0x8f2...4d7e",
      name: "CryptoArtist",
      tipsReceived: "12.5 CORE",
      avatar: "/crypto1.jpg",
    },
    {
      rank: 2,
      address: "0x3a9...1b2c",
      name: "Web3Dev",
      tipsReceived: "9.8 CORE",
      avatar: "/crypto2.jpg",
    },
    {
      rank: 3,
      address: "0x7e5...6f3d",
      name: "NFTDesigner",
      tipsReceived: "8.2 CORE",
      avatar: "/crypto3.jpg",
    },
    {
      rank: 4,
      address: "0x1c4...8a9b",
      name: "DeFiEducator",
      tipsReceived: "7.5 CORE",
      avatar: "/crypto4.jpg",
    },
    {
      rank: 5,
      address: "0x5d2...3e7f",
      name: "BlockchainGamer",
      tipsReceived: "6.9 CORE",
      avatar: "/crypto5.jpg",
    },
  ];

  return (
    <div className="bg-black border max-w-xl border-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <FiTrendingUp className="text-purple-500" />
          <span className="text-purple-500">Top Creators</span>
        </h2>
        <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {topCreators.map((creator, index) => (
          <motion.div
            key={creator.address}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-800 hover:border-purple-500 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                {creator.rank <= 3 && (
                  <div className="absolute -top-2 -left-2 bg-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {creator.rank}
                  </div>
                )}
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                  {creator.avatar ? (
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-2xl text-gray-400" />
                  )}
                </div>
              </div>
              <div>
                <h3 className="font-medium">{creator.name}</h3>
                <p className="text-sm text-gray-400">{creator.address}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-purple-400">
                {creator.tipsReceived}
              </p>
              <p className="text-xs text-gray-500">Total Tips</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
