import { motion } from "framer-motion";

const FormButton = ({ text, onClick, ...props }) => {
    return (
      <motion.button
        type="button"
       
        onClick={onClick}
        {...props}
      >
        {text}
      </motion.button>
    );
  };
  
  export default FormButton;