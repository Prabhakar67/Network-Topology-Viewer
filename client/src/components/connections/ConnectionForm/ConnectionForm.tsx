import React from "react";

interface Props {
    edge: any;
    setEdge: (edge: any) => void;
}

const ConnectionForm = ({ edge, setEdge }: Props) => {

    if (!edge) return null;

    return (
        <div className="mb-4">

            <label className="mb-1 block text-sm font-medium text-gray-600">
                Label
            </label>

            <input
                value={edge.label || ""}
                onChange={(e) =>
                    setEdge({
                        ...edge,
                        label: e.target.value
                    })
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />

        </div>
    );
};

export default ConnectionForm;