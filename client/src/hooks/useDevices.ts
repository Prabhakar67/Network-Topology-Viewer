import { useEffect, useState, useMemo } from "react";
import deviceService from "../services/deviceService";
import type { Device } from "../types";

export const useDevices = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchDevices = async () => {
    setLoading(true);
    try {
      const data = await deviceService.getAll();
      setDevices(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  // Filtering logic
  const filteredDevices = useMemo(() => {
    return devices.filter((device) => {
      const matchesSearch = device.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || device.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [devices, search, statusFilter]);

  return {
    devices,
    filteredDevices,
    loading,
    refresh: fetchDevices,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
  };
};
