import { motion } from "framer-motion";
import { FiUser, FiArrowRight } from "react-icons/fi";
import Link from "next/link";

export default function FeaturedCreators() {
  const creators = [
    {
      name: "CryptoArtist",
      category: "Digital Art",
      address: "0x8f2...4d7e",
      avatar: "/avatars/1.png",
      tips: "12.5 CORE",
    },
    {
      name: "Web3Dev",
      category: "Developer",
      address: "0x3a9...1b2c",
      avatar: "/avatars/2.png",
      tips: "9.8 CORE",
    },
    {
      name: "NFTDesigner",
      category: "Designer",
      address: "0x7e5...6f3d",
      avatar: "/avatars/3.png",
      tips: "8.2 CORE",
    },
  ];

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Featured Creators
          </span>
        </h2>
        <Link
          href="/creators"
          className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
        >
          View All <FiArrowRight className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {creators.map((creator, index) => (
          <motion.div
            key={creator.address}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-black border border-gray-800 rounded-xl overflow-hidden hover:border-purple-500 transition-all"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
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
                <div>
                  <h3 className="font-bold text-lg">{creator.name}</h3>
                  <p className="text-purple-400 text-sm">{creator.category}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm text-gray-400">Address</p>
                  <p className="font-mono text-sm">{creator.address}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Tips</p>
                  <p className="font-bold text-purple-400">{creator.tips}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 px-6 py-3 border-t border-gray-800">
              <Link
                href={`/tip/${creator.address}`}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-4 py-2 rounded-lg font-medium transition-all text-sm flex items-center justify-center"
              >
                Tip This Creator
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
