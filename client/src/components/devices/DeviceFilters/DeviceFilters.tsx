import { useState } from "react";

interface Props {
    onSearch: (value: string) => void;
    onStatusFilter: (status: string) => void;
}

const DeviceFilters = ({ onSearch, onStatusFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div>
            <input
                type="text"
                placeholder="Search device..."
                value={search}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    onSearch(value);
                }}
            />

            <select
                value={status}
                onChange={(e) => {
                    const value = e.target.value;
                    setStatus(value);
                    onStatusFilter(value);
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
