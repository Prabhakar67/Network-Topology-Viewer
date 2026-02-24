import { useState, useEffect } from "react";

interface Props {
    edge: any;
    onSave: (edge: any) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const ConnectionForm = ({ edge, onSave, onDelete }: Props) => {
    const [localEdge, setLocalEdge] = useState<any>(edge);

    useEffect(() => {
        setLocalEdge(edge);
    }, [edge]);

    if (!localEdge) return null;

    return (
        <>
            {/* Label */}
            <div className="mb-4">
                <label className="mb-1 block text-sm font-medium text-gray-600">
                    Label
                </label>
                <input
                    value={localEdge.label || ""}
                    onChange={(e) =>
                        setLocalEdge({ ...localEdge, label: e.target.value })
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
                <button
                    onClick={() => onSave(localEdge)}
                    className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                    Save
                </button>

                <button
                    onClick={() => onDelete(localEdge.id)}
                    className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                    Delete
                </button>
            </div>
        </>
    );
};

export default ConnectionForm;
