require('dotenv').config();
const express = require('express');
const path = require('node:path');
const crypto = require('node:crypto');
const { initDatabase, requireDatabase } = require('./db');

const app = express();
const PORT = Number(process.env.PORT) || 4000;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));

const ALLOWED_STATUSES = new Set([
  'new',
  'contacted',
  'in_progress',
  'completed',
  'declined',
]);

function createConsultationId() {
  return `consultation_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
}

function toConsultation(row) {
  return {
    id: row.id,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone || '',
    company: row.company || '',
    website: row.website || '',
    serviceType: row.service_type,
    budget: row.budget || '',
    timeline: row.timeline || '',
    projectDescription: row.project_description,
    additionalInfo: row.additional_info || '',
    country: row.country || '',
    currency: row.currency || '',
    isNigerian: Boolean(row.is_nigerian),
    discountApplied: row.discount_applied || 'None',
    status: row.status,
    submittedAt: row.submitted_at instanceof Date ? row.submitted_at.toISOString() : row.submitted_at,
    updatedAt: row.updated_at
      ? row.updated_at instanceof Date
        ? row.updated_at.toISOString()
        : row.updated_at
      : undefined,
  };
}

async function sendWhatsAppNotification(formData, consultationId) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_WHATSAPP_NUMBER;
  const toNumber = 'whatsapp:+2348062103367';

  if (!accountSid || !authToken || !fromNumber) {
    console.log('WhatsApp notification skipped: Twilio credentials are not configured.');
    return;
  }

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

${formData.additionalInfo ? `Additional Info:
${formData.additionalInfo}` : ''}

⏰ Submitted: ${new Date().toLocaleString()}`;

  try {
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString('base64')}`,
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
      console.error('WhatsApp notification failed:', result);
      return;
    }

    console.log('WhatsApp notification sent:', result.sid);
  } catch (error) {
    console.error('WhatsApp notification error:', error);
  }
}

app.get('/api/health', async (_req, res) => {
  let database = 'unconfigured';

  try {
    if (requireDatabase()) {
      await requireDatabase().query('SELECT 1');
      database = 'connected';
    }
  } catch {
    database = 'error';
  }

  res.json({
    status: 'ok',
    service: 'Cee Jay Solutions API',
    database,
  });
});

app.post('/api/consultation', async (req, res) => {
  try {
    const formData = req.body ?? {};
    const requiredFields = [
      'firstName',
      'lastName',
      'email',
      'serviceType',
      'projectDescription',
    ];

    const missingFields = requiredFields.filter(
      (field) => !String(formData[field] ?? '').trim()
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    const email = String(formData.email).trim();
    if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const db = requireDatabase();
    const id = createConsultationId();
    const result = await db.query(
      `
        INSERT INTO consultations (
          id, first_name, last_name, email, phone, company, website,
          service_type, budget, timeline, project_description,
          additional_info, country, currency, is_nigerian,
          discount_applied, status
        )
        VALUES (
          $1, $2, $3, $4, $5, $6, $7,
          $8, $9, $10, $11,
          $12, $13, $14, $15,
          $16, 'new'
        )
        RETURNING *
      `,
      [
        id,
        String(formData.firstName).trim(),
        String(formData.lastName).trim(),
        email,
        String(formData.phone ?? '').trim() || null,
        String(formData.company ?? '').trim() || null,
        String(formData.website ?? '').trim() || null,
        String(formData.serviceType).trim(),
        String(formData.budget ?? '').trim() || null,
        String(formData.timeline ?? '').trim() || null,
        String(formData.projectDescription).trim(),
        String(formData.additionalInfo ?? '').trim() || null,
        String(formData.country ?? '').trim() || null,
        String(formData.currency ?? '').trim() || null,
        Boolean(formData.isNigerian),
        String(formData.discountApplied ?? 'None'),
      ]
    );

    sendWhatsAppNotification(formData, id).catch(() => {});

    return res.status(201).json({
      success: true,
      message: 'Consultation request submitted successfully. We will contact you within 24 hours.',
      consultationId: id,
      consultation: toConsultation(result.rows[0]),
    });
  } catch (error) {
    console.error('Consultation submission error:', error);
    return res.status(error.statusCode || 500).json({
      success: false,
      error:
        error.statusCode === 503
          ? 'Consultation service is temporarily unavailable.'
          : 'An unexpected error occurred. Please try again or contact support directly.',
    });
  }
});

app.get('/api/consultations', async (_req, res) => {
  try {
    const db = requireDatabase();
    const result = await db.query('SELECT * FROM consultations ORDER BY submitted_at DESC');

    res.json({
      success: true,
      consultations: result.rows.map(toConsultation),
    });
  } catch (error) {
    console.error('Fetch consultations error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: 'Failed to fetch consultation requests.',
    });
  }
});

app.put('/api/consultations/:id/status', async (req, res) => {
  try {
    const consultationId = req.params.id;
    const status = String(req.body?.status ?? '');

    if (!ALLOWED_STATUSES.has(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid consultation status.',
      });
    }

    const db = requireDatabase();
    const result = await db.query(
      `
        UPDATE consultations
        SET status = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING *
      `,
      [status, consultationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found.',
      });
    }

    res.json({
      success: true,
      consultation: toConsultation(result.rows[0]),
    });
  } catch (error) {
    console.error('Update consultation error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: 'Failed to update consultation status.',
    });
  }
});

app.delete('/api/consultations/:id', async (req, res) => {
  try {
    const db = requireDatabase();
    const result = await db.query(
      'DELETE FROM consultations WHERE id = $1 RETURNING id',
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found.',
      });
    }

    res.json({
      success: true,
      message: 'Consultation deleted successfully.',
    });
  } catch (error) {
    console.error('Delete consultation error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      error: 'Failed to delete consultation.',
    });
  }
});

const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Endpoint not found.' });
  }

  return res.sendFile(path.join(distPath, 'index.html'));
});

initDatabase()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Cee Jay Solutions server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });
