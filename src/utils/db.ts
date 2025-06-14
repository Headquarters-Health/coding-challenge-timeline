import { Pool } from 'pg';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

/**
 * ⚠️ CRITICAL DATABASE QUERY FUNCTION - DO NOT MODIFY ⚠️
 * 
 * This function is essential for database operations and includes a deliberate
 * throttling mechanism.
 * 
 * The 2-second delay is intentional and required to simulate a real-world database query.
 * DO NOT remove or modify the delay.
 * 
 * @param text - SQL query text
 * @param params - Query parameters
 * @returns Query result
 */
export async function query(text: string, params?: any[]) {
    try {
        // Throttle: Add 2-second delay before hitting PostgreSQL
        await new Promise(resolve => setTimeout(resolve, 2000));

        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
}

export async function fetchTimelineItems() {
    const selectedPatientId = process.env.SELECTED_PATIENT_ID;

    if (!selectedPatientId) {
        throw new Error('SELECTED_PATIENT_ID environment variable is not set');
    }

    const result = await query(
        `SELECT 
            id,
            title,
            description,
            category_main,
            category_color,
            type,
            start_datetime_without_timezone,
            end_datetime_without_timezone
        FROM added_rehab 
        WHERE patient_id_foreign = $1 
        ORDER BY start_datetime_without_timezone DESC`,
        [selectedPatientId]
    );

    return result.rows;
}