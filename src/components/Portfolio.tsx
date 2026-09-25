import { motion } from 'motion/react';
import { useState } from 'react';
import { ExternalLink, Smartphone, Palette, Code2 } from 'lucide-react';
import foodDeliveryImage1 from '../assets/b9891bb31cfe4c30a0317e0ec31ccbef329efa6a.png';
import foodDeliveryImage2 from '../assets/7fc4a481fa4c020b88fa28f1dc8bcc6a438c0598.png';
import foodDeliveryImage3 from '../assets/d5a8901ad8047e747dd3cf82c1cc8b390ca845d9.png';
import foodDeliveryImage4 from '../assets/769c6807172093ad010e57b1f975910d781d2ea5.png';
import mentalWellnessImage1 from '../assets/8483bb289dfc86279bd8f10527f209f2d4277d99.png';
import mentalWellnessImage2 from '../assets/ccea6a0bf00f87b71677ddf6557af93f1bcdd5f2.png';
import mentalWellnessImage3 from '../assets/a92f341065e97d810ae12a653d7ff4ccf84c9f11.png';

interface PortfolioProps {
  onNavigate: (page: string) => void;
}

export function Portfolio({ onNavigate }: PortfolioProps) {
  // State to track which device is featured for each project
  const [featuredDevice, setFeaturedDevice] = useState<{ [key: number]: number }>({
    1: 1, // P2P Marketplace starts with device index 1
    2: 1  // Therafam starts with device index 1
  });

  const projects = [
    {
      id: 1,
      title: 'P2P Marketplace - Multi-Vendor Platform',
      category: 'Mobile App Design',
      description: 'A comprehensive peer-to-peer marketplace app connecting customers with stores and riders. Features store discovery, rider dashboard, active delivery tracking, and real-time order management for seamless operations.',
      images: [foodDeliveryImage1, foodDeliveryImage2, foodDeliveryImage3, foodDeliveryImage4],
      tags: ['UI/UX Design', 'Mobile App', 'E-Commerce', 'Marketplace'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 2,
      title: 'Therafam - Mental Wellness Platform',
      category: 'Mobile App Design',
      description: 'A comprehensive mental health app designed to connect users with licensed therapists in a safe, encrypted environment. Features anonymous mode, self-help programs, and personalized therapy matching.',
      images: [mentalWellnessImage1, mentalWellnessImage2, mentalWellnessImage3],
      tags: ['UI/UX Design', 'Healthcare', 'Mobile App', 'Mental Health'],
      color: 'from-teal-400 to-emerald-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Our Portfolio
            </h1>
            <p className="text-lg sm:text-xl text-emerald-50 max-w-3xl mx-auto">
              Explore our collection of innovative designs and user-centric solutions that bring ideas to life
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
          >
            {[
              { icon: <Code2 className="w-6 h-6" />, value: '150+', label: 'Projects Completed' },
              { icon: <Smartphone className="w-6 h-6" />, value: '80+', label: 'Mobile Apps' },
              { icon: <Palette className="w-6 h-6" />, value: '50+', label: 'UI/UX Designs' },
              { icon: <ExternalLink className="w-6 h-6" />, value: '100%', label: 'Client Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center text-emerald-600 mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl sm:text-4xl text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Container with Gradient Overlay */}
                <div className="relative h-[400px] sm:h-[450px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  
                  {/* Multiple Screens Layout */}
                  <div className="relative h-full flex items-center justify-center p-6">
                    {project.images.length === 2 ? (
                      // Two screens side by side with slight overlap
                      <div className="flex items-center justify-center gap-4 w-full h-full">
                        <motion.img
                          src={project.images[0]}
                          alt={`${project.title} - Screen 1`}
                          className="h-[85%] w-auto object-contain drop-shadow-2xl"
                          whileHover={{ scale: 1.05, zIndex: 10 }}
                          transition={{ duration: 0.3 }}
                        />
                        <motion.img
                          src={project.images[1]}
                          alt={`${project.title} - Screen 2`}
                          className="h-[85%] w-auto object-contain drop-shadow-2xl"
                          whileHover={{ scale: 1.05, zIndex: 10 }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    ) : project.images.length === 3 ? (() => {
                      // Three-device floating front-view hero mockup with click-to-feature
                      const currentFeatured = featuredDevice[project.id] || 1;
                      
                      // Define positions for 3 devices (left, center, right)
                      const getDevicePosition = (deviceIndex: number) => {
                        const positions = [
                          { x: -110, z: -60, rotateY: 15, height: 250, zIndex: 1 },   // Left
                          { x: 0, z: 40, rotateY: 0, height: 300, zIndex: 20 },       // Center (featured)
                          { x: 110, z: -60, rotateY: -15, height: 250, zIndex: 1 }    // Right
                        ];
                        
                        // Rotate positions based on which device is featured
                        // Featured device should always be at center (index 1)
                        const offset = currentFeatured; // 0-based index of featured device
                        const rotatedIndex = (deviceIndex - offset + 3) % 3;
                        
                        return positions[rotatedIndex];
                      };

                      return (
                        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
                          {project.images.map((image, imgIndex) => {
                            const pos = getDevicePosition(imgIndex);
                            const isFeatured = pos.zIndex === 20;
                            
                            return (
                              <motion.div
                                key={imgIndex}
                                className="absolute cursor-pointer"
                                style={{ 
                                  transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg)`,
                                  zIndex: pos.zIndex
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                  opacity: 1,
                                  y: [0, isFeatured ? -15 : -8, 0],
                                  transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg)`
                                }}
                                transition={{ 
                                  opacity: { duration: 0.6, delay: 0.2 + (imgIndex * 0.15) },
                                  y: { 
                                    duration: isFeatured ? 3.5 : 3, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: imgIndex * 0.3
                                  },
                                  transform: { duration: 0.6, ease: "easeOut" }
                                }}
                                whileHover={{ scale: 1.12, zIndex: 50, rotateY: 0 }}
                                onClick={() => setFeaturedDevice(prev => ({ ...prev, [project.id]: imgIndex }))}
                              >
                                <img
                                  src={image}
                                  alt={`${project.title} - Screen ${imgIndex + 1}`}
                                  className={`w-auto object-contain drop-shadow-2xl rounded-lg transition-all duration-300 ${
                                    isFeatured ? 'ring-4 ring-teal-400/30' : ''
                                  }`}
                                  style={{ height: `${pos.height}px` }}
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })() : project.images.length === 4 ? (() => {
                      // Four-device floating front-view hero mockup with click-to-feature
                      const currentFeatured = featuredDevice[project.id] || 1;
                      
                      // Define positions for each slot based on featured device
                      const getDevicePosition = (deviceIndex: number) => {
                        // Calculate relative position from featured device
                        const positions = [
                          { x: -140, z: -80, rotateY: 12, height: 240, zIndex: 1 },    // Far left
                          { x: -50, z: 20, rotateY: 5, height: 280, zIndex: 10 },      // Center-left
                          { x: 50, z: 20, rotateY: -5, height: 280, zIndex: 10 },      // Center-right
                          { x: 140, z: -80, rotateY: -12, height: 240, zIndex: 1 }     // Far right
                        ];
                        
                        // Rotate positions array based on which device is featured
                        // Featured device should be at center-left (index 1) or center-right (index 2)
                        const offset = currentFeatured - 1; // 0-based
                        const rotatedIndex = (deviceIndex - offset + 4) % 4;
                        
                        return positions[rotatedIndex];
                      };

                      return (
                        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
                          {project.images.map((image, imgIndex) => {
                            const pos = getDevicePosition(imgIndex);
                            return (
                              <motion.div
                                key={imgIndex}
                                className="absolute cursor-pointer"
                                style={{ 
                                  transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg)`,
                                  zIndex: pos.zIndex
                                }}
                                initial={{ opacity: 0 }}
                                animate={{ 
                                  opacity: 1,
                                  y: [0, -10 - (imgIndex * 2), 0],
                                  transform: `translateX(${pos.x}px) translateZ(${pos.z}px) rotateY(${pos.rotateY}deg)`
                                }}
                                transition={{ 
                                  opacity: { duration: 0.6, delay: 0.2 + (imgIndex * 0.1) },
                                  y: { 
                                    duration: 3 + (imgIndex * 0.3), 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    delay: imgIndex * 0.2
                                  },
                                  transform: { duration: 0.5, ease: "easeOut" }
                                }}
                                whileHover={{ scale: 1.15, zIndex: 50, rotateY: 0 }}
                                onClick={() => setFeaturedDevice(prev => ({ ...prev, [project.id]: imgIndex }))}
                              >
                                <img
                                  src={image}
                                  alt={`${project.title} - Screen ${imgIndex + 1}`}
                                  className={`w-auto object-contain drop-shadow-2xl rounded-lg transition-all duration-300`}
                                  style={{ height: `${pos.height}px` }}
                                />
                              </motion.div>
                            );
                          })}
                        </div>
                      );
                    })() : (
                      // Single screen (fallback)
                      <motion.img
                        src={project.images[0]}
                        alt={project.title}
                        className="h-full w-auto object-contain drop-shadow-2xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-white text-emerald-600 px-6 py-3 rounded-lg flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8">
                  <div className="text-sm text-emerald-600 mb-2">
                    {project.category}
                  </div>
                  <h3 className="text-xl sm:text-2xl text-gray-900 mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-emerald-50 text-emerald-700 text-sm rounded-full border border-emerald-100"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg sm:text-xl text-emerald-50 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with innovative design and development solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('consultation')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-emerald-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get a Free Consultation
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-300"
              >
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Cee Jay IT Solutions. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}