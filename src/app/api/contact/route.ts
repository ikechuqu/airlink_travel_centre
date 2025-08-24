import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const contactData = await request.json();

    if (!contactData.name || !contactData.email || !contactData.message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    
    await addDoc(collection(db, 'contacts'), {
      ...contactData,
      submittedAt: serverTimestamp(),
    });

    return NextResponse.json({ message: 'Contact message sent successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json({ message: 'Error sending message' }, { status: 500 });
  }
}
