import { useMemo } from "react";

export const useFilteredDevices = (
    devices: any[],
    searchTerm: string,
    statusFilter: string
) => {

    const filteredDevices = useMemo(() => {
        return devices.filter((device) => {

            const matchesSearch = device.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            const matchesStatus =
                !statusFilter || device.status === statusFilter;

            return matchesSearch && matchesStatus;

        });
    }, [devices, searchTerm, statusFilter]);

    return filteredDevices;
};