'use client';

import { motion } from 'framer-motion';
import Image from "next/image";
import Scene3D from '@/components/Scene3D';
import ThemeToggle from '@/components/layout/ThemeToggle';
import ProjectCard from '@/components/projects/ProjectCard';
import Timeline from '@/components/experience/Timeline';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';
import BlogSection from '@/components/blog/BlogSection';
import SkillsVisualization from '@/components/skills/SkillsVisualization';
import ResumeDownload from '@/components/layout/ResumeDownload';
import ContactForm from '@/components/contact/ContactForm';

// Sample data - replace with your actual data
const projects = [
  {
    title: "Cross Chain Yield Aggregator",
    description: "A decentralized application that aggregates yields from various blockchain protocols, allowing users to find the best returns on their assets across different chains.",
    image: "/projects/cross-chain-yield-aggregator.jpg",
    technologies: ["Solana", "Rust", "Next.js", "TypeScript"],
    githubUrl: "https://github.com/mohtashimnawaz/cross-chain-aggr-side",
  },
  {
    title: "DMS Solana",
    description: "A decentralized management system built on Solana blockchain, implementing secure and efficient data management solutions.",
    image: "/projects/dms-solana.jpg",
    technologies: ["Solana", "Rust", "React"],
    githubUrl: "https://github.com/mohtashimnawaz/dmssolana",
    liveUrl: "https://dms-solana.vercel.app",
  },
  {
    title: "Solana Flappy Game",
    description: "A blockchain-based implementation of the classic Flappy Bird game on Solana, incorporating NFT rewards and on-chain game mechanics.",
    image: "/projects/solana-flappy.jpg",
    technologies: ["Solana", "JavaScript"],
    githubUrl: "https://github.com/mohtashimnawaz/Solana-flappy-game",
  },
  {
    title: "Decentralized P2P",
    description: "A peer-to-peer decentralized application implementing secure communication and data transfer protocols.",
    image: "/projects/decentralized-p2p.jpg",
    technologies: ["TypeScript", "Node.js"],
    githubUrl: "https://github.com/mohtashimnawaz/decentralizedp2p",
  },
  {
    title: "Space Invaders in Rust",
    description: "A modern implementation of the classic Space Invaders game using Rust, showcasing low-level game development and performance optimization.",
    image: "/projects/space-invaders.jpg",
    technologies: ["Rust", "Game Dev"],
    githubUrl: "https://github.com/mohtashimnawaz/space_invadors",
  },
  {
    title: "Decentralized Identity Verification",
    description: "A secure identity verification system built on blockchain technology, ensuring privacy and trust in digital identity management.",
    image: "/projects/identity-verification.jpg",
    technologies: ["TypeScript", "Blockchain"],
    githubUrl: "https://github.com/mohtashimnawaz/decentralized-identity-verification",
  },
  {
    title: "Custom Kernel",
    description: "A custom operating system kernel implementation in Rust, demonstrating low-level systems programming and OS development.",
    image: "/projects/custom-kernel.jpg",
    technologies: ["Rust", "Systems"],
    githubUrl: "https://github.com/mohtashimnawaz/my-kernel",
  },
  {
    title: "DMS ICP",
    description: "A decentralized management system on the Internet Computer Protocol (ICP), leveraging blockchain for secure and efficient data handling.",
    image: "/projects/dms-icp.jpg",
    technologies: ["Rust", "ICP"],
    githubUrl: "https://github.com/mohtashimnawaz/dms_icp",
  }
];

const experience = [
  {
    title: "Intern",
    company: "BlockseBlock",
    period: "Jun 2025 - Present",
    description: "Working on blockchain development and smart contract implementation.",
    technologies: ["Rust", "Solana", "Smart Contracts"],
  }
];

const volunteering = [
  {
    title: "Instructor",
    company: "CHANDIGARH UNIVERSITY",
    period: "Sep 2024 - Oct 2024",
    description: "I was the instructor of Rust. Interacted with Students in this Workshop and escalated a bigger cause i.e., making Rust popular among students. Conducted hands-on sessions and mentored students in blockchain development.",
    technologies: ["Rust", "Education", "Blockchain"],
  }
];

const testimonials = [
  {
    id: 1,
    name: "Sahil Thakur",
    role: "CTO",
    company: "BlockseBlock",
    content: "Mohtashim is an exceptional developer who consistently delivers high-quality solutions.",
    rating: 5,
    image: "/testimonials/john-doe.jpg",
  },
  // Add more testimonials...
];

const blogPosts = [
  {
    id: 1,
    title: "Building on Solana: A Comprehensive Guide",
    excerpt: "Learn how to build scalable applications on the Solana blockchain...",
    content: "Full blog post content...",
    date: "2024-03-15",
    category: "Blockchain",
    tags: ["Solana", "Rust", "Web3"],
    image: "/blog/solana-guide.jpg",
    slug: "building-on-solana-guide",
  },
  // Add more blog posts...
];

const skills = [
  // Programming Languages
  {
    name: "Rust",
    level: 90,
    category: "Programming Languages",
    description: "Advanced Rust development with focus on blockchain, systems programming, and game development",
    icon: "/skills/rust.svg"
  },
  {
    name: "TypeScript",
    level: 85,
    category: "Programming Languages",
    description: "Full-stack development with TypeScript, including React and Node.js applications",
    icon: "/skills/typescript.svg"
  },
  {
    name: "JavaScript",
    level: 85,
    category: "Programming Languages",
    description: "Modern JavaScript development for web applications and blockchain integration",
    icon: "/skills/javascript.svg"
  },
  {
    name: "Python",
    level: 80,
    category: "Programming Languages",
    description: "Python development for automation, data processing, and backend services",
    icon: "/skills/python.svg"
  },

  // Blockchain & Web3
  {
    name: "Solana",
    level: 90,
    category: "Blockchain & Web3",
    description: "Solana blockchain development, smart contracts, and DApp creation",
    icon: "/skills/solana.svg"
  },
  {
    name: "Smart Contracts",
    level: 85,
    category: "Blockchain & Web3",
    description: "Development of secure and efficient smart contracts for various blockchain platforms",
    icon: "/skills/smart-contracts.svg"
  },
  {
    name: "Web3.js",
    level: 80,
    category: "Blockchain & Web3",
    description: "Building decentralized applications with Web3.js and blockchain integration",
    icon: "/skills/web3.svg"
  },
  {
    name: "Internet Computer (ICP)",
    level: 75,
    category: "Blockchain & Web3",
    description: "Development on the Internet Computer Protocol for decentralized applications",
    icon: "/skills/icp.svg"
  },

  // Frontend Development
  {
    name: "React",
    level: 85,
    category: "Frontend Development",
    description: "Building modern, responsive user interfaces with React and Next.js",
    icon: "/skills/react.svg"
  },
  {
    name: "Next.js",
    level: 85,
    category: "Frontend Development",
    description: "Full-stack development with Next.js, including server-side rendering and API routes",
    icon: "/skills/nextjs.svg"
  },
  {
    name: "Tailwind CSS",
    level: 90,
    category: "Frontend Development",
    description: "Creating responsive and modern UI designs with Tailwind CSS",
    icon: "/skills/tailwind.svg"
  },
  {
    name: "HTML/CSS",
    level: 90,
    category: "Frontend Development",
    description: "Semantic HTML and modern CSS for creating accessible and responsive web applications",
    icon: "/skills/html-css.svg"
  },

  // Backend Development
  {
    name: "Node.js",
    level: 85,
    category: "Backend Development",
    description: "Building scalable backend services and APIs with Node.js",
    icon: "/skills/nodejs.svg"
  },
  {
    name: "Express.js",
    level: 80,
    category: "Backend Development",
    description: "Creating RESTful APIs and backend services with Express.js",
    icon: "/skills/express.svg"
  },
  {
    name: "PostgreSQL",
    level: 75,
    category: "Backend Development",
    description: "Database design and management with PostgreSQL",
    icon: "/skills/postgresql.svg"
  },

  // DevOps & Tools
  {
    name: "Git",
    level: 90,
    category: "DevOps & Tools",
    description: "Version control and collaborative development with Git",
    icon: "/skills/git.svg"
  },
  {
    name: "Docker",
    level: 75,
    category: "DevOps & Tools",
    description: "Containerization and deployment with Docker",
    icon: "/skills/docker.svg"
  },
  {
    name: "Linux",
    level: 80,
    category: "DevOps & Tools",
    description: "System administration and development in Linux environments",
    icon: "/skills/linux.svg"
  },
  {
    name: "VS Code",
    level: 90,
    category: "DevOps & Tools",
    description: "Efficient development workflow with VS Code and extensions",
    icon: "/skills/vscode.svg"
  },

  // Game Development
  {
    name: "Game Development",
    level: 80,
    category: "Game Development",
    description: "Creating games using Rust and modern game development practices",
    icon: "/skills/game-dev.svg"
  },
  {
    name: "Graphics Programming",
    level: 75,
    category: "Game Development",
    description: "Graphics programming and game engine development",
    icon: "/skills/graphics.svg"
  }
];

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Scene3D />
      <ThemeToggle />
      
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center backdrop-blur-sm bg-white/10 dark:bg-gray-900/10 p-8 rounded-2xl"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Hi, I&apos;m</span> <span className="text-blue-600 dark:text-blue-400">Mohtashim Nawaz</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Software Engineer specializing in Rust, Solana, and Full Stack Development
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="#contact" className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                Get in Touch
              </a>
              <a href="#projects" className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:text-white transition duration-300">
                View Projects
              </a>
              <ResumeDownload variant="secondary" />
            </div>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/mohtashimnawaz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/mohtashim-nawaz-0200b5257/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </section>

        {/* About Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="about" 
          className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <Image 
                  src="/profile.jpg" 
                  alt="Mohtashim Nawaz" 
                  width={200} 
                  height={200} 
                  className="rounded-full mx-auto shadow-lg border-4 border-blue-300 dark:border-blue-700"
                />
              </div>
              <div className="md:w-2/3 md:pl-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                <p className="mb-4">
                  I&apos;m a passionate software engineer with expertise in blockchain technology, particularly Solana
                  development, and a strong foundation in Rust programming. My journey in software development has led
                  me to work on innovative projects that combine cutting-edge technologies with practical solutions.
                </p>
                <p>
                  When I&apos;m not coding, I&apos;m constantly learning about new technologies and contributing to open-source
                  projects. I believe in writing clean, efficient code and creating solutions that make a real impact.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Skills & Expertise</h2>
            <SkillsVisualization skills={skills} />
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.title} {...project} />
              ))}
              </div>
              {/* View More Projects on GitHub */}
            <div className="mt-8 text-center">
              <a
                href="https://github.com/mohtashimnawaz?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-xl group"
              >
                <span className="group-hover:scale-105 transition-transform duration-300">
                  View All Projects on GitHub →
                </span>
              </a>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Experience</h2>
            <Timeline items={experience} />
          </div>
        </section>

        {/* Volunteering Section */}
        <section id="volunteering" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Volunteering</h2>
            <Timeline items={volunteering} />
              </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
            <TestimonialCarousel testimonials={testimonials} />
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10">
          <BlogSection posts={blogPosts} />
        </section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          id="contact" 
          className="py-20 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10"
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>
            
            {/* Contact Form */}
            <div className="mb-12">
              <ContactForm />
            </div>
            
            {/* Social Links */}
            <div className="flex justify-center gap-8 mb-12">
              <a 
                href="https://github.com/mohtashimnawaz"
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/mohtashim-nawaz-0200b5257/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>LinkedIn</span>
              </a>
              <ResumeDownload variant="primary" />
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
