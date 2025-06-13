import { NextResponse } from 'next/server';
import { fetchTimelineItems } from '@/utils/db';

export async function GET() {
    try {
        const timelineData = await fetchTimelineItems();
        return NextResponse.json({ data: timelineData }, { status: 200 });
    } catch (error) {
        console.error('Error fetching timeline:', error);
        return NextResponse.json(
            {
                error: 'Failed to fetch timeline data',
                details: error instanceof Error ? error.message : 'Unknown error',
                stack: error instanceof Error ? error.stack : undefined
            },
            { status: 500 }
        );
    }
} 