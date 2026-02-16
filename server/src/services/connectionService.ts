import { pool } from "../db";

export const getAllConnections = async () => {
    const result = await pool.query("SELECT * FROM connections");
    return result.rows;
};

export const createConnection = async (data: any) => {
    const {
        source_device_id,
        target_device_id,
        connection_type,
        bandwidth,
        label,
    } = data;

    const result = await pool.query(
        `INSERT INTO connections 
     (source_device_id, target_device_id, connection_type, bandwidth, label)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
        [
            source_device_id,
            target_device_id,
            connection_type,
            bandwidth,
            label,
        ]
    );

    return result.rows[0];
};

export const deleteConnection = async (id: string) => {
    await pool.query("DELETE FROM connections WHERE id = $1", [id]);
};
