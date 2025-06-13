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
                'Diagnosis', // title
                'Initial Symptoms: A B and C', // description
                selectedPatientId, // patient_id_foreign
                true, // active
                'Notes', // category_main
                'rgb(181, 181, 255)', // category_color
                'evaluation', // type
                'This evaluation helps track your progress and symptoms to ensure the best treatment plan for your recovery.', // why_simple
                null, // next_step_rehab_bank_id
                14, // created_by_team_member_id_foreign
                new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0], // start_datetime_without_timezone
                new Date().toISOString().replace('T', ' ').replace('Z', '').split('.')[0] // end_datetime_without_timezone
            ]
        );

        return NextResponse.json(
            { data: result.rows[0], message: 'Evaluation item added successfully' },
            { status: 201 }
        );
    } catch (error) {
        console.error('Error adding evaluation item:', error);
        return NextResponse.json(
            { error: 'Failed to add evaluation item' },
            { status: 500 }
        );
    }
} 