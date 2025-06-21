'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import Image from 'next/image';

interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
  icon: string;
  description: string;
}

interface SkillsVisualizationProps {
  skills: Skill[];
}

export default function SkillsVisualization({ skills }: SkillsVisualizationProps) {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(skills.map(skill => skill.category)));
    return uniqueCategories;
  }, [skills]);

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={variants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
      >
        {categories.map((category) => (
          <motion.div
            key={category}
            variants={itemVariants}
            className="col-span-2 md:col-span-3 lg:col-span-4"
          >
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="relative"
                    onHoverStart={() => setHoveredSkill(skill)}
                    onHoverEnd={() => setHoveredSkill(null)}
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div
                      className={`p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                        selectedSkill?.name === skill.name
                          ? 'bg-blue-100 dark:bg-blue-900'
                          : hoveredSkill?.name === skill.name
                          ? 'bg-gray-100 dark:bg-gray-800'
                          : 'bg-white dark:bg-gray-800'
                      } border border-gray-200 dark:border-gray-700 hover:shadow-md`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 relative">
                          <Image
                            src={skill.icon}
                            alt={skill.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {skill.name}
                          </h4>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 mt-1">
                            <div
                              className="bg-blue-600 dark:bg-blue-400 h-1.5 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {(selectedSkill || hoveredSkill) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src={(selectedSkill || hoveredSkill)?.icon || ''}
                  alt={(selectedSkill || hoveredSkill)?.name || ''}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {(selectedSkill || hoveredSkill)?.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(selectedSkill || hoveredSkill)?.category}
                </p>
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Proficiency:</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                      {(selectedSkill || hoveredSkill)?.level}%
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {(selectedSkill || hoveredSkill)?.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 