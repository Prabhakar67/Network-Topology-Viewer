import { useState } from "react";

interface Props {
    onSearch: (value: string) => void;
    onStatusFilter: (status: string) => void;
}

const DeviceFilters = ({ onSearch, onStatusFilter }: Props) => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    return (
        <div className="w-full border-b border-gray-300 bg-white px-4 py-2 flex items-center gap-3">

            <input
                type="text"
                placeholder="Search device..."
                value={search}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    onSearch(value);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />

            <select
                value={status}
                onChange={(e) => {
                    const value = e.target.value;
                    setStatus(value);
                    onStatusFilter(value);
                }}
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
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