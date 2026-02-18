import { useEffect, useState } from "react";

interface Props {
    edge: any;
    onClose: () => void;
    onSave: (edge: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const ConnectionDrawer = ({
    edge,
    onClose,
    onSave,
    onDelete,
}: Props) => {
    const [localEdge, setLocalEdge] = useState<any>(null);

    useEffect(() => {
        if (edge) {
            setLocalEdge(edge);
        }
    }, [edge]);

    if (!localEdge) return null;

    return (
        <div style={{ padding: 20 }}>
            <h3>Edit Connection</h3>

            <input
                value={localEdge.label || ""}
                onChange={(e) =>
                    setLocalEdge({ ...localEdge, label: e.target.value })
                }
            />

            <button onClick={() => onSave(localEdge)}>
                Save
            </button>

            <button onClick={() => onDelete(localEdge.id)}>
                Delete
            </button>

            <button onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default ConnectionDrawer;
