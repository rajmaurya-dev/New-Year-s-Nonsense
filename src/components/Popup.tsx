import { motion } from 'framer-motion';
import Link from 'next/link';
interface PopupProps {
    message: string;
}
const Popup: React.FC<PopupProps> = ({ message }) => {
    return (
        <motion.div
            className="fixed bottom-0 mb-4 inset-x-0 flex justify-center"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                repeat: Infinity,
                repeatType: 'reverse',
            }}
        >
            <div className="bg-white rounded-lg max-w-xl mx-auto p-4 space-y-2 text-center">
                <h2 className="text-2xl font-semibold">Welcome to Resolution App!</h2>
                <div className='flex flex-col'>
                    <span>

                        {message}
                    </span>
                    <Link href="/create" className="text-blue-500 underline">
                        sign in with Google
                    </Link>

                </div>
            </div>
        </motion.div>
    );
}


export default Popup