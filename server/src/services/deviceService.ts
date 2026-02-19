import { pool } from "../db";

export const getAllDevices = async () => {
    const result = await pool.query("SELECT * FROM devices");
    return result.rows;
};


export const createDevice = async (data: any) => {
    const {
        name,
        type,
        status,
        ip_address,
        mac_address,
        manufacturer,
        model,
        location,
        description,
        position_x,
        position_y,
    } = data;

    const result = await pool.query(
        `
        INSERT INTO devices (
            name,
            type,
            status,
            ip_address,
            mac_address,
            manufacturer,
            model,
            location,
            description,
            position_x,
            position_y
        )
        VALUES (
            $1, $2, $3, $4, $5,
            $6, $7, $8, $9, $10, $11
        )
        RETURNING *
        `,
        [
            name,
            type,
            status,
            ip_address,
            mac_address,
            manufacturer,
            model,
            location,
            description,
            position_x,
            position_y,
        ]
    );

    return result.rows[0];
};



export const deleteDevice = async (id: string) => {
    await pool.query("DELETE FROM devices WHERE id = $1", [id]);
};


export const updateDevice = async (id: string, data: any) => {
    const {
        name,
        type,
        status,
        ip_address,
        mac_address,
        manufacturer,
        model,
        location,
        description,
        position_x,
        position_y,
    } = data;

    const result = await pool.query(
        `
        UPDATE devices
        SET
            name = $1,
            type = $2,
            status = $3,
            ip_address = $4,
            mac_address = $5,
            manufacturer = $6,
            model = $7,
            location = $8,
            description = $9,
            position_x = $10,
            position_y = $11,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $12
        RETURNING *
        `,
        [
            name,
            type,
            status,
            ip_address,
            mac_address,
            manufacturer,
            model,
            location,
            description,
            position_x,
            position_y,
            id,
        ]
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


export const getDeviceById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM devices WHERE id = $1",
        [id]
    );

    return result.rows[0];
};
