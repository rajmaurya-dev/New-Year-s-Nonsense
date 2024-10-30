import { motion } from 'framer-motion';
import Link from 'next/link';
import { LogIn } from "lucide-react";

interface PopupProps {
  message: string;
}

const Popup: React.FC<PopupProps> = ({ message }) => {
  return (
    <motion.div
      className="fixed bottom-0 mb-8 inset-x-0 flex justify-center z-50 px-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-auto p-6 space-y-4">
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2,
          }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">
            Welcome to Resolution App!
          </h2>
        </motion.div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-[2px] rounded-lg">
            <div className="bg-white rounded-lg p-4">
              <p className="text-gray-700">{message}</p>
            </div>
          </div>

          <Link
            href="/create"
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-orange-600 transition-colors"
          >
            <LogIn size={20} />
            Sign in with Google
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default Popup;