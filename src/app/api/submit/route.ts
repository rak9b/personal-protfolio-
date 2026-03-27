import { NextResponse } from 'next/server';
import { encrypt } from '@/lib/utils/encryption';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Encrypt all sensitive fields
    const encryptedData: Record<string, string> = {};
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string' && key !== 'submittedAt') {
        encryptedData[key] = encrypt(value);
      } else {
        encryptedData[key] = value as string;
      }
    }

    // Try to send to n8n webhook if configured
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl && webhookUrl !== 'https://your-n8n-instance.com/webhook/matchmaking') {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...encryptedData, submittedAt: new Date().toISOString() }),
        });
      } catch (webhookError) {
        console.error('Webhook failed:', webhookError);
      }
    }

    // Try MongoDB if configured
    try {
      const connectToDatabase = (await import('@/lib/db/mongodb')).default;
      const Submission = (await import('@/lib/db/submission')).default;
      await connectToDatabase();
      await Submission.create({ ...encryptedData, submittedAt: new Date() });
    } catch (dbError) {
      console.log('MongoDB not available, storing locally only');
    }

    return NextResponse.json({ success: true, message: 'Thank you for your submission!' });
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json({ success: false, error: 'Submission failed' }, { status: 500 });
  }
}
