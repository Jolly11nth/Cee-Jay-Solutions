import { motion } from 'motion/react';
import { 
  Globe, 
  Code2, 
  Palette, 
  Smartphone, 
  Database, 
  Shield, 
  Zap, 
  Users,
  BrainCircuit,
  ArrowRight,
  Check
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: string) => void;
}

export function Services({ onNavigate }: ServicesProps) {
  const mainServices = [
    {
      icon: <Globe className="w-12 h-12 text-emerald-600" />,
      title: "Website Development",
      description: "Create stunning, responsive websites that engage your audience and drive conversions.",
      features: [
        "Custom website design and development",
        "E-commerce platform integration",
        "Content Management Systems (CMS)",
        "Search Engine Optimization (SEO)",
        "Performance optimization",
        "Mobile-responsive design"
      ],
      technologies: ["React", "Next.js", "WordPress", "Shopify", "HTML5", "CSS3"]
    },
    {
      icon: <Code2 className="w-12 h-12 text-emerald-600" />,
      title: "Software Solutions",
      description: "Build powerful, scalable software applications tailored to your business needs.",
      features: [
        "Custom software development",
        "API development and integration",
        "Database design and optimization",
        "Cloud-based solutions",
        "System integration",
        "Legacy system modernization"
      ],
      technologies: ["Python", "Node.js", "Java", "PostgreSQL", "MongoDB", "AWS"]
    },
    {
      icon: <Palette className="w-12 h-12 text-emerald-600" />,
      title: "UI/UX Design",
      description: "Design intuitive, user-centered interfaces that provide exceptional user experiences.",
      features: [
        "User experience (UX) research",
        "User interface (UI) design",
        "Prototyping and wireframing",
        "Design system creation",
        "Usability testing",
        "Brand identity design"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "Principle", "InVision", "Framer"]
    }
  ];

  const additionalServices = [
    {
      icon: <BrainCircuit className="w-8 h-8 text-emerald-600" />,
      title: "AI Modeling and Simulation",
      description: "Develop intelligent models and simulations to analyze complex systems, test scenarios, and support data-driven decisions."
    },
    {
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android."
    },
    {
      icon: <Database className="w-8 h-8 text-emerald-600" />,
      title: "Data Analytics",
      description: "Transform your data into actionable insights with advanced analytics solutions."
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with comprehensive security solutions."
    },
    {
      icon: <Zap className="w-8 h-8 text-emerald-600" />,
      title: "Cloud Solutions",
      description: "Migrate to the cloud and optimize your infrastructure for scalability."
    }
  ];

  const process = [
    {
      step: "01",
      title: "Discovery",
      description: "We start by understanding your business goals, challenges, and requirements."
    },
    {
      step: "02",
      title: "Strategy",
      description: "We develop a comprehensive strategy and project roadmap tailored to your needs."
    },
    {
      step: "03",
      title: "Design",
      description: "Our team creates wireframes, prototypes, and designs that align with your vision."
    },
    {
      step: "04",
      title: "Development",
      description: "We build your solution using best practices and cutting-edge technologies."
    },
    {
      step: "05",
      title: "Testing",
      description: "Rigorous testing ensures your solution works flawlessly across all platforms."
    },
    {
      step: "06",
      title: "Launch",
      description: "We deploy your solution and provide ongoing support and maintenance."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl text-gray-900 mb-6">
              Our <span className="text-emerald-600">Services</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive IT solutions designed to accelerate your business growth 
              and digital transformation journey.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {mainServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center gap-4 mb-6">
                    {service.icon}
                    <h2 className="text-3xl sm:text-4xl text-gray-900">
                      {service.title}
                    </h2>
                  </div>
                  
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-8">
                    <h3 className="text-xl text-gray-900 mb-4">What's Included:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl text-gray-900 mb-4">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => onNavigate('consultation')}
                    className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors duration-200 flex items-center gap-2 group">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className={`${index % 2 === 1 ? 'lg:col-start-1' : ''} relative`}>
                  <div className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl">
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                      <div className="text-center">
                        {service.icon}
                        <h3 className="text-2xl text-gray-900 mt-4 mb-2">
                          {service.title}
                        </h3>
                        <p className="text-gray-600">
                          Professional {service.title.toLowerCase()} solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expand your digital capabilities with our comprehensive range of specialized services.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl text-gray-900 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed text-center">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures successful project delivery from concept to completion.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto lg:mx-0">
                  <span className="text-lg">{step.step}</span>
                </div>
                <h3 className="text-xl text-gray-900 mb-3 text-center lg:text-left">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto">
              Let's discuss your project requirements and see how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('consultation')}
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Get a Free Consultation
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="text-white px-8 py-4 border-2 border-white rounded-lg hover:bg-white hover:text-emerald-600 transition-all duration-200"
              >
                Learn More About Us
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}