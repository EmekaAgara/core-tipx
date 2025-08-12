import { motion } from "framer-motion";
import { FiDollarSign, FiUsers, FiZap, FiHeart } from "react-icons/fi";

export default function Stats() {
  const stats = [
    {
      icon: <FiDollarSign className="text-3xl text-purple-400" />,
      value: "42,500+",
      label: "Total Tips Sent",
    },
    {
      icon: <FiUsers className="text-3xl text-purple-400" />,
      value: "8,200+",
      label: "Active Creators",
    },
    {
      icon: <FiZap className="text-3xl text-purple-400" />,
      value: "Instant",
      label: "Transaction Speed",
    },
    // {
    //   icon: <FiHeart className="text-3xl text-purple-400" />,
    //   value: "0%",
    //   label: "Platform Fees",
    // },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          viewport={{ once: true }}
          className="bg-black p-6 rounded border border-gray-800 hover:border-purple-500 transition-all text-center"
        >
          <div className="flex justify-center mb-4">{stat.icon}</div>
          <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
          <p className="text-gray-400">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
