import { pool } from "../db";

export const getAllDevices = async () => {
    const result = await pool.query("SELECT * FROM devices");
    return result.rows;
};

export const createDevice = async (data: any) => {
    const { name, type, ip_address, status, position_x, position_y } = data;

    const result = await pool.query(
        `INSERT INTO devices 
     (name, type, ip_address, status, position_x, position_y)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
        [name, type, ip_address, status, position_x, position_y]
    );

    return result.rows[0];
};

export const deleteDevice = async (id: string) => {
    await pool.query("DELETE FROM devices WHERE id = $1", [id]);
};

export const updateDevice = async (id: string, data: any) => {
    const { name, type, ip_address, status, position_x, position_y } = data;

    const result = await pool.query(
        `UPDATE devices
     SET name = $1,
         type = $2,
         ip_address = $3,
         status = $4,
         position_x = $5,
         position_y = $6,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7
     RETURNING *`,
        [name, type, ip_address, status, position_x, position_y, id]
    );

    return result.rows[0];
};

export const updateDevicePosition = async (
    id: string,
    position_x: number,
    position_y: number
) => {
    const result = await pool.query(
        `UPDATE devices
     SET position_x = $1,
         position_y = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3
     RETURNING *`,
        [position_x, position_y, id]
    );

    return result.rows[0];
};

