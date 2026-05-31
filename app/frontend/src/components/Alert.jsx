import Alert from 'react-bootstrap/Alert';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const AlertBox = ({ showAlert, setShowAlert, message, variant = '' }) => {
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Keep alert visible for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showAlert, setShowAlert]);

  return (
    <AnimatePresence>
      {showAlert && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}    // Start with x 100 and opacity 0
          animate={{ opacity: 0.9, x: 0 }}      // Animate to full opacity and x
          exit={{ opacity: 0, x: 100 }}       // Exit animation with opacity 0 and x movement
          transition={{ duration: 0.3 }}      // Animation duration
          className="fixed top-20 right-2 md:right-20 w-fit z-[1100]"
        >
          <Alert
            variant={variant}
            dismissible={true}
            onClose={() => setShowAlert(false)}
            className="border-2 text-sm md:text-base relative transition-all duration-300 hover:shadow-md overflow-hidden"
          >
            <span className="md:px-6 max-md:px-0">{message}</span>
            {/* Animated progress bar */}
            <motion.div
              className={`absolute bottom-0 left-0 h-1 w-full 
                ${variant === 'success'
                  ? 'bg-green-500/50'
                  : variant === 'danger'
                    ? 'bg-red-500/50'
                    : variant === 'warning'
                      ? 'bg-yellow-500/50'
                      : ''
                }
                `}
              initial={{ width: 0 }}        // Start with width 0
              animate={{ width: '100%' }}   // Animate to full width
              exit={{ width: 0 }}           // Exit animation to shrink width to 0
              transition={{
                duration: 3,  // Animation duration for the progress bar
                delay: 0.3,   // Add a slight delay before the progress bar shrinks when exiting
              }}
            />
          </Alert>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// PropTypes validation
AlertBox.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  variant: PropTypes.oneOf(['', 'success', 'danger', 'warning']),
};

export default AlertBox;
