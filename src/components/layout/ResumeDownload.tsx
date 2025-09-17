'use client';

import { motion } from 'framer-motion';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface ResumeDownloadProps {
  variant?: 'primary' | 'secondary' | 'icon';
  className?: string;
}

export default function ResumeDownload({ variant = 'primary', className = '' }: ResumeDownloadProps) {
  const handleDownload = () => {
    // Updated to use the correct CV file name
    const resumeUrl = '/resume/Mohtashim Nawaz CV-4.pdf';
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Mohtashim_Nawaz_CV.pdf'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const variants = {
    primary: "px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center gap-2",
    secondary: "px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300 flex items-center gap-2",
    icon: "p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleDownload}
      className={`${variants[variant]} ${className}`}
      aria-label="Download Resume"
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      {variant !== 'icon' && <span>Download Resume</span>}
    </motion.button>
  );
} 