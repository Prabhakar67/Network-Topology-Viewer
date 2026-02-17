import { useState } from "react";

interface Props {
    onSearch: (value: string) => void;
    onStatusFilter: (status: string) => void;
}

const DeviceFilters = ({ onSearch, onStatusFilter }: Props) => {
    const [search, setSearch] = useState("");

    return (
        <div style={{ marginBottom: 10, display: "flex", gap: 10 }}>
            <input
                type="text"
                placeholder="Search device..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    onSearch(e.target.value);
                }}
                style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                }}
            />

            <select
                onChange={(e) => onStatusFilter(e.target.value)}
                style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                }}
            >
                <option value="">All Status</option>
                <option value="online">Online</option>
                <option value="warning">Warning</option>
                <option value="offline">Offline</option>
                <option value="maintenance">Maintenance</option>
            </select>
        </div>
    );
};

export default DeviceFilters;
