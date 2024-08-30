import { motion } from "framer-motion";
import { Link } from "react-router-dom";


const PageNotFound = () => {
	
  return (
    <motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
            404 Error
          
			</h2>
			<div className="space-y-6 mb-6">
				<motion.div
					className="p-4 bg-gray-800 bg-opacity-50 roundd-lg border border-gray-700"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity:1, y:0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className="text-xl font-semibold text-green-400 text-center mb-3">
                        Page Not Found
                    </h3>

				</motion.div>

				
			</div>

            <div className="space-y-6">
            <motion.div
						className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200'
                        initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
               
                 <div className='flex justify-center text-xl font-semibold text-white-400 space-x-4'>
                        
                        <Link to='/' className='text-white-400 hover:underline'>
						  Let's Go Back
					    </Link>
                </div>
                
					
					
					
				</motion.div>
                </div>
			

				
			    
			
		</motion.div>
  )
}

export default PageNotFound;