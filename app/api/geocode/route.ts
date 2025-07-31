import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');
  
  try {
    let url: string;
    
    if (q) {
      // Search endpoint - batasi hanya di Indonesia
      url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&countrycodes=id&addressdetails=1&limit=5`;
    } else if (lat && lon) {
      // Reverse geocode endpoint
      url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    } else {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }
    
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'LaundryKu-App/1.0'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Geocoding error:', error);
    return NextResponse.json({ error: 'Failed to fetch geocoding data' }, { status: 500 });
  }
} 