// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { pool } from "./db";

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// //Devices APIs
// app.get("/api/devices", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM devices");
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch devices" });
//     }
// });


// app.post("/api/devices", async (req, res) => {
//     try {
//         const {
//             name,
//             type,
//             ip_address,
//             status,
//             position_x,
//             position_y,
//         } = req.body;

//         const result = await pool.query(
//             `INSERT INTO devices 
//        (name, type, ip_address, status, position_x, position_y)
//        VALUES ($1, $2, $3, $4, $5, $6)
//        RETURNING *`,
//             [name, type, ip_address, status, position_x, position_y]
//         );

//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to create device" });
//     }
// });


// app.delete("/api/devices/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         await pool.query("DELETE FROM devices WHERE id = $1", [id]);

//         res.json({ message: "Device deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to delete device" });
//     }
// });


// app.put("/api/devices/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         const {
//             name,
//             type,
//             ip_address,
//             status,
//             position_x,
//             position_y,
//         } = req.body;

//         const result = await pool.query(
//             `UPDATE devices
//        SET name = $1,
//            type = $2,
//            ip_address = $3,
//            status = $4,
//            position_x = $5,
//            position_y = $6,
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $7
//        RETURNING *`,
//             [name, type, ip_address, status, position_x, position_y, id]
//         );

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to update device" });
//     }
// });


// app.patch("/api/devices/:id/position", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { position_x, position_y } = req.body;

//         const result = await pool.query(
//             `UPDATE devices
//        SET position_x = $1,
//            position_y = $2,
//            updated_at = CURRENT_TIMESTAMP
//        WHERE id = $3
//        RETURNING *`,
//             [position_x, position_y, id]
//         );

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to update position" });
//     }
// });


// //Connections APIs

// app.get("/api/connections", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT * FROM connections");
//         res.json(result.rows);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch connections" });
//     }
// });

// app.post("/api/connections", async (req, res) => {
//     try {
//         const {
//             source_device_id,
//             target_device_id,
//             connection_type,
//             bandwidth,
//             label,
//         } = req.body;

//         const result = await pool.query(
//             `INSERT INTO connections 
//        (source_device_id, target_device_id, connection_type, bandwidth, label)
//        VALUES ($1, $2, $3, $4, $5)
//        RETURNING *`,
//             [
//                 source_device_id,
//                 target_device_id,
//                 connection_type || "ethernet",
//                 bandwidth,
//                 label,
//             ]
//         );

//         res.status(201).json(result.rows[0]);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to create connection" });
//     }
// });


// app.delete("/api/connections/:id", async (req, res) => {
//     try {
//         const { id } = req.params;

//         await pool.query("DELETE FROM connections WHERE id = $1", [id]);

//         res.json({ message: "Connection deleted successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to delete connection" });
//     }
// });

// app.get("/api/topology", async (req, res) => {
//     try {
//         const devices = await pool.query("SELECT * FROM devices");
//         const connections = await pool.query("SELECT * FROM connections");

//         res.json({
//             devices: devices.rows,
//             connections: connections.rows,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch topology" });
//     }
// });

// app.listen(process.env.PORT, () => {
//     console.log(`Server running on port ${process.env.PORT}`);
// });



import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
