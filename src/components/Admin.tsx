import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Mail, Phone, User, Building, Globe, MessageSquare, Calendar, Clock, CheckCircle, Eye, ExternalLink, Trash2, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface ConsultationData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  website?: string;
  serviceType: string;
  budget?: string;
  timeline?: string;
  projectDescription: string;
  additionalInfo?: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'declined';
  updatedAt?: string;
}

interface AdminProps {
  onNavigate: (page: string) => void;
}

export function Admin({ onNavigate }: AdminProps) {
  const [consultations, setConsultations] = useState<ConsultationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedConsultation, setSelectedConsultation] = useState<ConsultationData | null>(null);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5b6f216/consultations`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError('Failed to load consultations');
        return;
      }

      setConsultations(result.consultations);
    } catch (error) {
      console.error('Error fetching consultations:', error);
      setError('Network error occurred while loading consultations');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (consultationId: string, newStatus: string) => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5b6f216/consultations/${consultationId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Update local state
        setConsultations(prev => 
          prev.map(c => c.id === consultationId ? result.consultation : c)
        );
        if (selectedConsultation?.id === consultationId) {
          setSelectedConsultation(result.consultation);
        }
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteConsultation = async (consultationId: string) => {
    setDeleting(consultationId);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-e5b6f216/consultations/${consultationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Remove from local state
        setConsultations(prev => prev.filter(c => c.id !== consultationId));
        // Clear selection if deleted item was selected
        if (selectedConsultation?.id === consultationId) {
          setSelectedConsultation(null);
        }
      } else {
        console.error('Delete failed:', result.error);
        setError('Failed to delete consultation request');
      }
    } catch (error) {
      console.error('Error deleting consultation:', error);
      setError('Network error occurred while deleting consultation');
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'contacted': return 'bg-yellow-500';
      case 'in_progress': return 'bg-purple-500';
      case 'completed': return 'bg-green-500';
      case 'declined': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'new': return 'New';
      case 'contacted': return 'Contacted';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'declined': return 'Declined';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const generateMailtoLink = (consultation: ConsultationData) => {
    const subject = `Re: Your Consultation Request - ${consultation.serviceType}`;
    const body = `Hi ${consultation.firstName},

Thank you for your consultation request submitted on ${formatDate(consultation.submittedAt)}.

I'd like to schedule a call to discuss your ${consultation.serviceType} project in more detail.

Best regards,
Cee Jay IT Solutions`;

    return `mailto:${consultation.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading consultations...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 mb-4">
              Consultation <span className="text-emerald-600">Requests</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Manage and track all consultation requests from potential clients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {consultations.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl text-gray-900 mb-2">No Consultation Requests</h3>
                <p className="text-gray-600">
                  When clients submit consultation requests, they will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consultations List */}
              <div className="space-y-4">
                <h2 className="text-2xl text-gray-900 mb-4">
                  All Requests ({consultations.length})
                </h2>
                {consultations.map((consultation) => (
                  <Card 
                    key={consultation.id} 
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedConsultation?.id === consultation.id ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    onClick={() => setSelectedConsultation(consultation)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg text-gray-900 mb-1">
                            {consultation.firstName} {consultation.lastName}
                          </h3>
                          <p className="text-emerald-600 text-sm">{consultation.serviceType}</p>
                        </div>
                        <Badge className={`${getStatusColor(consultation.status)} text-white`}>
                          {getStatusLabel(consultation.status)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {consultation.email}
                        </span>
                        {consultation.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {consultation.phone}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {formatDate(consultation.submittedAt)}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Consultation Details */}
              <div className="lg:sticky lg:top-24">
                {selectedConsultation ? (
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">
                            {selectedConsultation.firstName} {selectedConsultation.lastName}
                          </CardTitle>
                          <CardDescription className="text-emerald-600 text-base mt-1">
                            {selectedConsultation.serviceType}
                          </CardDescription>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Select 
                            value={selectedConsultation.status} 
                            onValueChange={(value) => updateStatus(selectedConsultation.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="declined">Declined</SelectItem>
                            </SelectContent>
                          </Select>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              className="bg-emerald-600 hover:bg-emerald-700 flex-1"
                              onClick={() => window.open(generateMailtoLink(selectedConsultation))}
                            >
                              <Mail className="w-4 h-4 mr-1" />
                              Reply
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300"
                                  disabled={deleting === selectedConsultation.id}
                                >
                                  {deleting === selectedConsultation.id ? (
                                    <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <Trash2 className="w-4 h-4" />
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="flex items-center gap-2">
                                    <AlertTriangle className="w-5 h-5 text-red-600" />
                                    Delete Consultation Request
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete the consultation request from{' '}
                                    <strong>{selectedConsultation.firstName} {selectedConsultation.lastName}</strong>?
                                    <br /><br />
                                    This action cannot be undone and will permanently remove all data associated with this request.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteConsultation(selectedConsultation.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete Request
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Contact Info */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <User className="w-4 h-4 text-emerald-600" />
                          Contact Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a href={`mailto:${selectedConsultation.email}`} className="text-emerald-600 hover:underline">
                              {selectedConsultation.email}
                            </a>
                          </div>
                          {selectedConsultation.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <a href={`tel:${selectedConsultation.phone}`} className="text-emerald-600 hover:underline">
                                {selectedConsultation.phone}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {(selectedConsultation.company || selectedConsultation.website) && (
                        <>
                          <Separator />
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                              <Building className="w-4 h-4 text-emerald-600" />
                              Company Information
                            </h4>
                            <div className="space-y-2 text-sm">
                              {selectedConsultation.company && (
                                <p><strong>Company:</strong> {selectedConsultation.company}</p>
                              )}
                              {selectedConsultation.website && (
                                <div className="flex items-center gap-2">
                                  <Globe className="w-4 h-4 text-gray-400" />
                                  <a 
                                    href={selectedConsultation.website} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-emerald-600 hover:underline flex items-center gap-1"
                                  >
                                    {selectedConsultation.website}
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator />
                      
                      {/* Project Details */}
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-emerald-600" />
                          Project Details
                        </h4>
                        <div className="space-y-3 text-sm">
                          {selectedConsultation.budget && (
                            <p><strong>Budget:</strong> {selectedConsultation.budget}</p>
                          )}
                          {selectedConsultation.timeline && (
                            <p><strong>Timeline:</strong> {selectedConsultation.timeline}</p>
                          )}
                          <div>
                            <strong>Description:</strong>
                            <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                              {selectedConsultation.projectDescription}
                            </p>
                          </div>
                          {selectedConsultation.additionalInfo && (
                            <div>
                              <strong>Additional Information:</strong>
                              <p className="mt-1 text-gray-700 whitespace-pre-wrap">
                                {selectedConsultation.additionalInfo}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Timestamps */}
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Submitted: {formatDate(selectedConsultation.submittedAt)}
                        </div>
                        {selectedConsultation.updatedAt && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Updated: {formatDate(selectedConsultation.updatedAt)}
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Eye className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl text-gray-900 mb-2">Select a Consultation</h3>
                      <p className="text-gray-600">
                        Click on a consultation request to view details and manage status.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}