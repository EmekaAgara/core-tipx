import { motion } from "framer-motion";
import { FiZap, FiUser, FiGift, FiDollarSign } from "react-icons/fi";

export default function HowItWorks() {
  const steps = [
    {
      icon: <FiUser className="text-3xl text-purple-400" />,
      title: "Connect Wallet",
      description: "Link your crypto wallet in seconds",
    },
    {
      icon: <FiGift className="text-3xl text-purple-400" />,
      title: "Find Creators",
      description: "Discover or search for content creators",
    },
    {
      icon: <FiDollarSign className="text-3xl text-purple-400" />,
      title: "Send Tip",
      description: "Choose amount and send instantly",
    },
  ];

  return (
    <section className="">
      {/* <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-16"
      >
        How{" "}
        <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          CoreTipX
        </span>{" "}
        Works
      </motion.h2> */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-black p-8 rounded border border-gray-800 hover:border-purple-500 transition-all text-center"
          >
            <div className="flex justify-center mb-6">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400">{step.description}</p>
            <div className="mt-4 text-purple-400 font-bold text-sm">
              Step {index + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
