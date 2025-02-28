import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const CurrentDateTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-right"
    >
      <div className="text-xl font-bold text-white">
        {format(currentTime, "EEEE, MMMM d, yyyy")}
      </div>
      <div className="text-lg text-gray-400">
        {format(currentTime, "h:mm:ss a")}
      </div>
    </motion.div>
  );
};

export default CurrentDateTime;
