// import { useEffect, useState } from "react";

// interface Props {
//     edge: any;
//     onClose: () => void;
//     onSave: (edge: any) => Promise<void>;
//     onDelete: (id: number) => Promise<void>;
// }

// const ConnectionDrawer = ({
//     edge,
//     onClose,
//     onSave,
//     onDelete,
// }: Props) => {
//     const [localEdge, setLocalEdge] = useState<any>(null);

//     useEffect(() => {
//         if (edge) {
//             setLocalEdge(edge);
//         }
//     }, [edge]);

//     if (!localEdge) return null;

//     return (
//         <div className="fixed top-0 right-0 z-50 h-screen w-[320px] border-l border-gray-200 bg-white p-4 shadow-xl">
//             {/* Header */}
//             <div className="mb-4 flex items-center justify-between">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                     Edit Connection
//                 </h3>

//                 <button
//                     onClick={onClose}
//                     className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
//                 >
//                     ✕
//                 </button>
//             </div>

//             {/* Label */}
//             <div className="mb-4">
//                 <label className="mb-1 block text-sm font-medium text-gray-600">
//                     Label
//                 </label>
//                 <input
//                     value={localEdge.label || ""}
//                     onChange={(e) =>
//                         setLocalEdge({ ...localEdge, label: e.target.value })
//                     }
//                     className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
//                 />
//             </div>

//             {/* Actions */}
//             <div className="flex gap-2">
//                 <button
//                     onClick={() => onSave(localEdge)}
//                     className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
//                 >
//                     Save
//                 </button>

//                 <button
//                     onClick={() => onDelete(localEdge.id)}
//                     className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
//                 >
//                     Delete
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ConnectionDrawer;







import ConnectionForm from "../../connections/ConnectionForm";

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

    if (!edge) return null;

    return (
        <div className="fixed top-0 right-0 z-50 h-screen w-[320px] border-l border-gray-200 bg-white p-4 shadow-xl">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                    Edit Connection
                </h3>

                <button
                    onClick={onClose}
                    className="rounded-md px-2 py-1 text-sm text-gray-500 hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>

            <ConnectionForm
                edge={edge}
                onSave={onSave}
                onDelete={onDelete}
            />
        </div>
    );
};

export default ConnectionDrawer;

