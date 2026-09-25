import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, Phone, User, Building, Globe, MessageSquare, Send, CheckCircle, AlertCircle, Percent } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface ConsultationProps {
  onNavigate: (page: string) => void;
}

interface CountryData {
  country: string;
  countryCode: string;
  currency: string;
  currencySymbol: string;
}

export function Consultation({ onNavigate }: ConsultationProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    serviceType: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    additionalInfo: '',
    country: '',
    currency: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [countryData, setCountryData] = useState<CountryData>({
    country: '',
    countryCode: '',
    currency: 'USD',
    currencySymbol: '$'
  });
  const [isNigerian, setIsNigerian] = useState(false);
  const [isLoadingCountry, setIsLoadingCountry] = useState(true);

  // Detect user's country on component mount
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const detectedCountryData: CountryData = {
          country: data.country_name || '',
          countryCode: data.country_code || '',
          currency: data.currency || 'USD',
          currencySymbol: data.currency === 'NGN' ? '₦' : data.currency === 'EUR' ? '€' : data.currency === 'GBP' ? '£' : '$'
        };
        
        setCountryData(detectedCountryData);
        setIsNigerian(data.country_code === 'NG');
        
        // Update form data with detected country and currency
        setFormData(prev => ({
          ...prev,
          country: detectedCountryData.country,
          currency: detectedCountryData.currency
        }));
      } catch (error) {
        console.error('Error detecting country:', error);
        // Default to USD if detection fails
        setCountryData({
          country: '',
          countryCode: '',
          currency: 'USD',
          currencySymbol: '$'
        });
      } finally {
        setIsLoadingCountry(false);
      }
    };

    detectCountry();
  }, []);

  const serviceTypes = [
    'Website Development',
    'Software Solutions',
    'UI/UX Design',
    'Mobile App Development',
    'E-commerce Platform',
    'Custom Software',
    'System Integration',
    'Consultation Only',
    'Other'
  ];

  // Generate budget ranges based on currency and apply discount for Nigerians
  const getBudgetRanges = () => {
    const symbol = countryData.currencySymbol;
    const isNGN = countryData.currency === 'NGN';
    
    // Special pricing for Nigerian clients (already discounted by 40%)
    if (isNigerian && isNGN) {
      return [
        `Under ${symbol}500,000`,
        `${symbol}500,000 - ${symbol}1,500,000`,
        `${symbol}1,500,000 - ${symbol}3,000,000`,
        `${symbol}3,000,000 - ${symbol}5,000,000`,
        `${symbol}5,000,000 - ${symbol}10,000,000`,
        `Over ${symbol}10,000,000`,
        'To be discussed'
      ];
    }
    
    // Base USD values for non-Nigerian clients
    const baseRanges = [
      { min: 0, max: 5000, label: 'Under' },
      { min: 5000, max: 15000 },
      { min: 15000, max: 30000 },
      { min: 30000, max: 50000 },
      { min: 50000, max: 100000 },
      { min: 100000, max: null, label: 'Over' }
    ];

    // Currency conversion rates (approximate)
    const conversionRate = countryData.currency === 'EUR' ? 0.92 : countryData.currency === 'GBP' ? 0.79 : 1;

    return baseRanges.map(range => {
      if (range.label === 'Under') {
        const value = Math.round(range.max * conversionRate);
        return `Under ${symbol}${value.toLocaleString()}`;
      } else if (range.label === 'Over') {
        const value = Math.round(range.min * conversionRate);
        return `Over ${symbol}${value.toLocaleString()}`;
      } else {
        const min = Math.round(range.min * conversionRate);
        const max = Math.round(range.max! * conversionRate);
        return `${symbol}${min.toLocaleString()} - ${symbol}${max.toLocaleString()}`;
      }
    }).concat(['To be discussed']);
  };

  const budgetRanges = getBudgetRanges();

  const timelineOptions = [
    'ASAP',
    '1-2 months',
    '3-6 months',
    '6-12 months',
    'Over 1 year',
    'Flexible'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      const response = await fetch('/api/consultation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          isNigerian,
          discountApplied: isNigerian ? '40%' : 'None'
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error('Consultation submission failed:', result);
        setSubmitError(result.error || 'Failed to submit consultation request. Please try again.');
        return;
      }

      console.log('Consultation submitted successfully:', result);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error submitting consultation form:', error);
      setSubmitError('Network error occurred. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      serviceType: '',
      budget: '',
      timeline: '',
      projectDescription: '',
      additionalInfo: '',
      country: countryData.country,
      currency: countryData.currency
    });
    setIsSubmitted(false);
    setSubmitError('');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-emerald-600 mx-auto mb-6" />
                <h1 className="text-3xl sm:text-4xl text-gray-900 mb-4">
                  Thank You!
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  We've received your consultation request. Our team will review your information 
                  and get back to you within 24 hours to schedule your free consultation.
                </p>
                {isNigerian && (
                  <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <p className="text-emerald-800">
                      <Percent className="w-5 h-5 inline mr-2" />
                      As a Nigerian client, you qualify for our 40% special discount!
                    </p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => onNavigate('home')}
                    className="bg-emerald-600 hover:bg-emerald-700"
                  >
                    Return to Home
                  </Button>
                  <Button 
                    onClick={resetForm}
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                  >
                    Submit Another Request
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

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
              Get Your Free <span className="text-emerald-600">Consultation</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Tell us about your project and let our experts help you transform your ideas into reality.
              No obligations, just valuable insights.
            </p>
            {isNigerian && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8"
              >
                <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 text-lg">
                  <Percent className="w-5 h-5 mr-2" />
                  Special 40% Discount for Nigerian Clients!
                </Badge>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl text-center">
                  Project Consultation Form
                </CardTitle>
                <CardDescription className="text-center text-lg">
                  Please provide as much detail as possible to help us understand your needs
                </CardDescription>
                {!isLoadingCountry && countryData.country && (
                  <div className="text-center mt-2">
                    <p className="text-sm text-gray-500">
                      Detected Location: {countryData.country} | Currency: {countryData.currency}
                    </p>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Nigerian Discount Notice */}
                  {isNigerian && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 border-2 border-emerald-200 rounded-lg p-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-emerald-600 rounded-full p-2 flex-shrink-0">
                          <Percent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="text-emerald-900 mb-2">🎉 Special Discount Applied!</h4>
                          <p className="text-emerald-800 text-sm leading-relaxed">
                            As a valued Nigerian client, you automatically qualify for our <strong>40% discount</strong> on all services! 
                            The budget ranges shown below already reflect this special pricing.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Personal Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl text-gray-900 flex items-center gap-2">
                      <User className="w-5 h-5 text-emerald-600" />
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company Information */}
                  <div className="space-y-6">
                    <h3 className="text-xl text-gray-900 flex items-center gap-2">
                      <Building className="w-5 h-5 text-emerald-600" />
                      Company Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company">Company Name</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="website" className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Current Website (if any)
                        </Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <h3 className="text-xl text-gray-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                      Project Details
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="serviceType">Service Type *</Label>
                        <select
                          id="serviceType"
                          value={formData.serviceType}
                          onChange={(e) => handleInputChange('serviceType', e.target.value)}
                          required
                          className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select a service</option>
                          {serviceTypes.map(service => (
                            <option key={service} value={service}>{service}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="budget">
                          Budget Range {isNigerian && <span className="text-emerald-600 text-xs">(40% off)</span>}
                        </Label>
                        <select
                          id="budget"
                          value={formData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                          className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map(budget => (
                            <option key={budget} value={budget}>{budget}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timeline">Project Timeline</Label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) => handleInputChange('timeline', e.target.value)}
                          className="w-full h-12 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select timeline</option>
                          {timelineOptions.map(timeline => (
                            <option key={timeline} value={timeline}>{timeline}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="projectDescription">Project Description *</Label>
                      <Textarea
                        id="projectDescription"
                        value={formData.projectDescription}
                        onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                        required
                        rows={5}
                        placeholder="Please describe your project, goals, and any specific requirements..."
                        className="min-h-[120px] resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Additional Information</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                        rows={3}
                        placeholder="Any additional details, questions, or specific preferences..."
                        className="min-h-[90px] resize-none"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-red-800 font-medium">Submission Failed</h4>
                        <p className="text-red-700 text-sm mt-1">{submitError}</p>
                        <p className="text-red-600 text-xs mt-2">
                          You can also contact us directly at cee.jay11nth@gmail.com
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 h-12 px-8 text-lg flex items-center gap-2 mx-auto"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Submit Consultation Request
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">1</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Submit Your Request</h3>
              <p className="text-gray-600">
                Fill out our detailed consultation form with your project requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">2</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Schedule Your Call</h3>
              <p className="text-gray-600">
                We'll contact you within 24 hours to schedule your free consultation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">3</span>
              </div>
              <h3 className="text-xl text-gray-900 mb-2">Get Your Proposal</h3>
              <p className="text-gray-600">
                Receive a detailed project proposal and timeline tailored to your needs.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
