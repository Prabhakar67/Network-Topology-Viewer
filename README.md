# Network Topology Viewer

A full‑stack React + TypeScript application for visualising and managing
a network topology.  
The repository is split into a **client** (Vite/React) and a **server**
(Express/TypeScript + PostgreSQL).

## 📁 Repository structure

```
.
├── client/           # frontend
│   ├── src/
          ├── assets
          ├── components
          ├── contexts
          ├── features
          ├── hooks
          ├── services
          ├── store
          ├── types
          ├── utils
│   ├── public/
│   ├── package.json
│   ├── tsconfig.*.json
│   └── vite.config.ts
|       
|                      # backend
|
└── server/           
    ├── src/
    │   ├── controllers/
    │   ├── routes/
    │   ├── services/
    │   ├── db/
    │   └── index.ts
    ├── tsconfig.json
    └── package.json
```

## 🚀 Getting started

### Prerequisites

- Node.js 18+ / npm
- PostgreSQL database
- `server/.env` file with the usual variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=youruser
DB_PASSWORD=yourpass
DB_NAME=yourdb
```

### Server

```sh
cd server
npm install
npm run dev            # starts ts-node-dev on port 5000
```

The API endpoints are mounted under `/api`:

- `GET  /api/devices`
- `POST /api/devices`
- `PUT  /api/devices/:id`
- `PATCH /api/devices/:id/updateDevice`
- `DELETE /api/devices/:id`
- `GET  /api/connections`
- `POST /api/connections`
- `PUT  /api/connections/:id`
- `DELETE /api/connections/:id`

Services live in `server/src/services/*`, controllers in
`server/src/controllers/*` and routes in `server/src/routes/*`.

### Client

```sh
cd client
npm install
npm run dev            # starts Vite dev server on http://localhost:5173
```

The client talks to the server via the axios instance in
[`client/src/services/api.ts`](client/src/services/api.ts) with
`baseURL: "http://localhost:5000/api"`.

React hooks (`useDevices`, `useConnections`) fetch data from the backend
and components such as [`TopologyCanvas`](client/src/components/topology/TopologyCanvas/TopologyCanvas.tsx)
render the interactive topology using **reactflow**.

### Build & lint

```sh
# client
npm run build
npm run lint

# server
# (there is no build script; transpile with tsc yourself if needed)
```

## 🧱 Database

A PostgreSQL database with at least two tables: `devices` and
`connections`. The server uses `pg.Pool` (`server/src/db/index.ts`) to run
queries.

Example table definitions (not included in repo):

```sql
CREATE TABLE devices (
  id serial PRIMARY KEY,
  name text,
  type text,
  status text,
  ip_address text,
  mac_address text,
  manufacturer text,
  model text,
  location text,
  description text,
  position_x int,
  position_y int,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE connections (
  id serial PRIMARY KEY,
  source_device_id int REFERENCES devices(id),
  target_device_id int REFERENCES devices(id),
  connection_type text,
  bandwidth text,
  label text,
  status text,
  created_at timestamptz DEFAULT now()
);
```

## 🛠 Development notes

- Tailwind CSS with dark‑mode enabled by class (`client/tailwind.config.ts`).
- Theme context in `client/src/contexts/ThemeContext.tsx`.
- Drawer UI components for editing devices/connections.

## 📝 Contribution

Feel free to open issues or submit pull requests.  
This README can be extended with testing, deployment, etc.

---

