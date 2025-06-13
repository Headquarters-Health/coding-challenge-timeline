import { NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function PUT(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.id) {
            return NextResponse.json(
                { error: 'ID is required' },
                { status: 400 }
            );
        }

        // Update timeline item directly with SQL query
        const result = await query(
            `UPDATE added_rehab SET 
                title = $1, 
                description = $2,
                category_main = $3,
                category_color = $4,
                type = $5,
                start_datetime_without_timezone = $6,
                end_datetime_without_timezone = $7
            WHERE id = $8 RETURNING *`,
            [
                body.title,
                body.description,
                body.category_main,
                body.category_color,
                body.type,
                body.start_datetime_without_timezone,
                body.end_datetime_without_timezone,
                body.id
            ]
        );

        const updatedTimelineItem = result.rows[0];

        if (!updatedTimelineItem) {
            return NextResponse.json(
                { error: 'Timeline item not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { data: updatedTimelineItem, message: 'Timeline item updated successfully' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating timeline item:', error);
        return NextResponse.json(
            { error: 'Failed to update timeline item' },
            { status: 500 }
        );
    }
} 