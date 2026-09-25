import { motion } from 'motion/react';
import { Target, Eye, Heart, Users, Award, Lightbulb } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

export function About({ onNavigate }: AboutProps) {
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8 text-emerald-600" />,
      title: "Innovation",
      description: "We constantly explore new technologies and approaches to deliver cutting-edge solutions."
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: "Collaboration",
      description: "We work closely with our clients as partners, ensuring every solution meets their unique needs."
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from code quality to customer service."
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      title: "Passion",
      description: "Our love for technology and problem-solving drives us to create exceptional digital experiences."
    }
  ];

  const team = [
    {
      name: "Development Team",
      description: "Expert developers specializing in modern web technologies, mobile apps, and custom software solutions."
    },
    {
      name: "Design Team",
      description: "Creative designers focused on user experience, interface design, and brand identity."
    },
    {
      name: "Strategy Team",
      description: "Business analysts and project managers who ensure every solution aligns with your goals."
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
              About <span className="text-emerald-600">Cee Jay</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We are a passionate team of developers, designers, and strategists dedicated to 
              creating innovative IT solutions that drive business success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl sm:text-4xl text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded with a vision to bridge the gap between technology and business success, 
                  Cee Jay began as a small team of passionate developers who believed that every 
                  business deserves access to world-class IT solutions.
                </p>
                <p>
                  Over the years, we've grown into a comprehensive IT solutions provider, working 
                  with startups, SMEs, and enterprise clients across various industries. Our journey 
                  has been marked by continuous learning, adaptation, and an unwavering commitment 
                  to our clients' success.
                </p>
                <p>
                  Today, Cee Jay stands as a trusted partner for businesses looking to leverage 
                  technology for growth, efficiency, and competitive advantage. We're not just 
                  service providers; we're your digital transformation partners.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-gradient-to-br from-emerald-100 to-teal-100 p-8 rounded-2xl"
            >
              <h3 className="text-2xl text-gray-900 mb-6">Quick Facts</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">5+ years of industry experience</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">150+ successful projects delivered</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">50+ satisfied clients worldwide</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  <span className="text-gray-700">24/7 support and maintenance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <Target className="w-10 h-10 text-emerald-600" />
                <h3 className="text-2xl sm:text-3xl text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To empower businesses with innovative, user-centric IT solutions that drive growth, 
                enhance efficiency, and create meaningful digital experiences. We strive to be the 
                trusted technology partner that helps our clients achieve their goals through 
                cutting-edge software development, intuitive design, and strategic digital transformation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <Eye className="w-10 h-10 text-emerald-600" />
                <h3 className="text-2xl sm:text-3xl text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-600 leading-relaxed">
                To be the leading IT solutions provider that transforms how businesses operate in 
                the digital age. We envision a future where technology seamlessly integrates with 
                business processes, enabling organizations of all sizes to reach their full potential 
                and create lasting impact in their industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape our relationships with clients and partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              Our Team
            </h2>
            <p className="text-lg text-emerald-100 max-w-2xl mx-auto">
              A diverse group of experts united by our passion for technology and commitment to excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl text-center"
              >
                <h3 className="text-xl text-gray-900 mb-3">
                  {member.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help transform your business with innovative IT solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => onNavigate('consultation')}
                className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition-colors duration-200">
                Get a Free Consultation
              </button>
              <button 
                onClick={() => onNavigate('services')}
                className="text-emerald-400 px-8 py-4 border-2 border-emerald-400 rounded-lg hover:bg-emerald-400 hover:text-white transition-all duration-200"
              >
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}