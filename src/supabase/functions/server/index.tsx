import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('*', logger(console.log));

// Health check endpoint
app.get('/make-server-e5b6f216/health', (c) => {
  return c.json({ status: 'OK', message: 'Cee Jay IT Solutions server is running' });
});

// Function to send WhatsApp notification via Twilio
async function sendWhatsAppNotification(formData: any, consultationId: string) {
  try {
    const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
    const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
    const fromNumber = Deno.env.get('TWILIO_WHATSAPP_NUMBER');
    const toNumber = 'whatsapp:+2348062103367'; // Your WhatsApp support number
    
    if (!accountSid || !authToken || !fromNumber) {
      console.log('WhatsApp notification skipped: Twilio credentials not configured');
      return;
    }

    // Format the message with consultation details
    const message = `🔔 New Consultation Request

📝 ID: ${consultationId}

👤 Client Information:
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}
Company: ${formData.company || 'Not provided'}

💼 Project Details:
Service: ${formData.serviceType}
Budget: ${formData.budget || 'Not specified'}
Timeline: ${formData.timeline || 'Not specified'}

📋 Description:
${formData.projectDescription}

${formData.additionalInfo ? `Additional Info:\n${formData.additionalInfo}` : ''}

⏰ Submitted: ${new Date().toLocaleString()}`;

    // Send WhatsApp message via Twilio API
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(`${accountSid}:${authToken}`),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: fromNumber,
          To: toNumber,
          Body: message,
        }),
      }
    );

    const result = await response.json();
    
    if (!response.ok) {
      console.log('WhatsApp notification error:', result);
    } else {
      console.log('WhatsApp notification sent successfully:', result.sid);
    }
  } catch (error) {
    console.log('Error sending WhatsApp notification:', error);
    // Don't throw error - notification failure shouldn't block consultation submission
  }
}

// Consultation form submission endpoint
app.post('/make-server-e5b6f216/consultation', async (c) => {
  try {
    const formData = await c.req.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'serviceType', 'projectDescription'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      console.log('Consultation form validation error: Missing required fields', missingFields);
      return c.json({ 
        success: false, 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      }, 400);
    }

    // Store consultation request in database
    const consultationId = `consultation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const consultationData = {
      id: consultationId,
      ...formData,
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    const kv = await import('./kv_store.tsx');
    await kv.set(consultationId, consultationData);
    
    console.log('Consultation request stored successfully:', consultationId);
    
    // Send WhatsApp notification (non-blocking)
    sendWhatsAppNotification(formData, consultationId).catch(error => {
      console.log('WhatsApp notification failed but consultation was saved:', error);
    });
    
    return c.json({ 
      success: true, 
      message: 'Consultation request submitted successfully. We will contact you within 24 hours.',
      consultationId: consultationId
    });

  } catch (error) {
    console.log('Consultation form submission error:', error);
    return c.json({ 
      success: false, 
      error: 'An unexpected error occurred. Please try again or contact support directly.' 
    }, 500);
  }
});

// Get all consultation requests (admin endpoint)
app.get('/make-server-e5b6f216/consultations', async (c) => {
  try {
    const kv = await import('./kv_store.tsx');
    const consultations = await kv.getByPrefix('consultation_');
    
    // Sort by submission date (newest first)
    const sortedConsultations = consultations.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );
    
    return c.json({ 
      success: true, 
      consultations: sortedConsultations 
    });
  } catch (error) {
    console.log('Error fetching consultations:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to fetch consultations' 
    }, 500);
  }
});

// Update consultation status (admin endpoint)
app.put('/make-server-e5b6f216/consultations/:id/status', async (c) => {
  try {
    const consultationId = c.req.param('id');
    const { status } = await c.req.json();
    
    const kv = await import('./kv_store.tsx');
    const consultation = await kv.get(consultationId);
    
    if (!consultation) {
      return c.json({ 
        success: false, 
        error: 'Consultation not found' 
      }, 404);
    }
    
    const updatedConsultation = {
      ...consultation,
      status: status,
      updatedAt: new Date().toISOString()
    };
    
    await kv.set(consultationId, updatedConsultation);
    
    return c.json({ 
      success: true, 
      consultation: updatedConsultation 
    });
  } catch (error) {
    console.log('Error updating consultation status:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to update consultation status' 
    }, 500);
  }
});

// Delete consultation (admin endpoint)
app.delete('/make-server-e5b6f216/consultations/:id', async (c) => {
  try {
    const consultationId = c.req.param('id');
    
    const kv = await import('./kv_store.tsx');
    const consultation = await kv.get(consultationId);
    
    if (!consultation) {
      return c.json({ 
        success: false, 
        error: 'Consultation not found' 
      }, 404);
    }
    
    await kv.del(consultationId);
    
    console.log('Consultation deleted successfully:', consultationId);
    
    return c.json({ 
      success: true, 
      message: 'Consultation deleted successfully' 
    });
  } catch (error) {
    console.log('Error deleting consultation:', error);
    return c.json({ 
      success: false, 
      error: 'Failed to delete consultation' 
    }, 500);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Start server
Deno.serve(app.fetch);