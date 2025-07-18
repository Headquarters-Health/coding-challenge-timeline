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
                'Horizontal saccades', // title
                '1. Hold two pencils shoulder width apart up at face leve.', // description
                selectedPatientId, // patient_id_foreign
                true, // active
                'Vestibular/Oculomotor', // category_main
                'E6E6FA', // category_color
                'Rehab', // type
                'Rapidly shifting your gaze between two objects improves eye movement control. This can reduce dizziness or headaches when looking around quickly, helping you feel more at ease during daily activities that require rapid eye movements.', // why_simple
                null, // next_step_rehab_bank_id
                14, // created_by_team_member_id_foreign
                new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0], // start_datetime_without_timezone
                new Date(Date.now() + 6 * 24 * 60 * 60 * 1000 + 23 * 60 * 60 * 1000 + 59 * 60 * 1000 + 59 * 1000).toISOString().replace('T', ' ').replace('Z', '').split('.')[0] // end_datetime_without_timezone (6 days later at 23:59:59)
            ]
        );

        return NextResponse.json(
            { data: result.rows[0], message: 'Rehab item added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding rehab item:', error);
        return NextResponse.json(
            { error: 'Failed to add rehab item' },
            { status: 500 }
        );
    }
} 