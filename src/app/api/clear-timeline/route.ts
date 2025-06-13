import { NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function DELETE(request: Request) {
    try {
        const selectedPatientId = process.env.SELECTED_PATIENT_ID;

        if (!selectedPatientId) {
            return NextResponse.json(
                { error: 'SELECTED_PATIENT_ID environment variable is not set' },
                { status: 500 }
            );
        }

        // Delete all added rehab items for the selected patient
        const result = await query(
            `DELETE FROM added_rehab WHERE patient_id_foreign = $1`,
            [selectedPatientId]
        );

        return NextResponse.json(
            {
                message: 'Timeline cleared successfully',
                deletedCount: result.rowCount || 0
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error clearing timeline:', error);
        return NextResponse.json(
            { error: 'Failed to clear timeline' },
            { status: 500 }
        );
    }
} 