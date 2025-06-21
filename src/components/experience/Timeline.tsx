'use client';

import { motion } from 'framer-motion';

interface TimelineItem {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-800" />
      
      <div className="space-y-12">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-12"
          >
            {/* Dot */}
            <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-400 border-4 border-white dark:border-gray-900" />
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-blue-600 dark:text-blue-400">{item.company}</p>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                  {item.period}
                </p>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {item.description}
              </p>
              
              {item.technologies && (
                <div className="flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 