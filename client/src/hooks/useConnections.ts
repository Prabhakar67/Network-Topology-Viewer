import { useEffect, useState } from "react";
import connectionService from "../services/connectionService";
import type { Connection } from "../types";

export const useConnections = () => {
    const [connections, setConnections] = useState<Connection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchConnections = async () => {
        try {
            setLoading(true);
            const data = await connectionService.getAll();
            setConnections(data);
        } catch (err) {
            setError("Failed to fetch connections");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return {
        connections,
        loading,
        error,
        refresh: fetchConnections,
    };
};
