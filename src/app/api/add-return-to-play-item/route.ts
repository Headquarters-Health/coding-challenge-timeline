import { NextResponse } from 'next/server';
import { query } from '@/utils/db';

export async function POST(request: Request) {
    try {
        const selectedPatientId = process.env.SELECTED_PATIENT_ID;

        if (!selectedPatientId) {
            return NextResponse.json(
                { error: 'SELECTED_PATIENT_ID environment variable is not set' },
                { status: 500 }
            );
        }

        const result = await query(
            `INSERT INTO added_rehab (
                rehab_id_foreign,
                parameters,
                title,
                description,
                patient_id_foreign,
                active,
                category_main,
                category_color,
                type,
                why_simple,
                next_step_rehab_bank_id,
                created_by_team_member_id_foreign,
                start_datetime_without_timezone,
                end_datetime_without_timezone
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [
                null, // rehab_id_foreign
                '{"comments": "", "test_parameter": "one"}', // parameters
                'Symptom-limited activity', // title
                '- Daily activities that do not exacerbate symptoms (e.g. walking).', // description
                selectedPatientId, // patient_id_foreign
                true, // active
                'Step 1', // category_main
                'FF8080', // category_color
                'Rehab', // type
                'Starting with light activities that don\'t worsen your symptoms helps your brain gradually adjust to increased activity levels. This gentle approach helps prevent setbacks while building your tolerance for more demanding activities.', // why_simple
                null, // next_step_rehab_bank_id
                14, // created_by_team_member_id_foreign
                new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0], // start_datetime_without_timezone
                new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000).toISOString().replace('T', ' ').replace('Z', '').split('.')[0] // end_datetime_without_timezone (6 days later at 23:59:59)
            ]
        );

        return NextResponse.json(
            { data: result.rows[0], message: 'Return to Play item added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding return to play item:', error);
        return NextResponse.json(
            { error: 'Failed to add return to play item' },
            { status: 500 }
        );
    }
} 