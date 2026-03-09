
import ConnectionForm from "../../connections/ConnectionForm";
import ButtonComponent from "../Button/Button";

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


            <div className="flex gap-2">
                <ButtonComponent
                    title="Save"
                    onClick={() => onSave(edge)}
                    className="flex-1 rounded bg-blue-600  hover:bg-blue-700 px-3 py-2 text-sm text-white"

                />

                <ButtonComponent
                    title="Delete"
                    onClick={() => onDelete(edge.id)}
                    className="rounded bg-red-600 hover:bg-red-700 px-3 py-2 text-sm text-white"

                />
            </div>


        </div>
    );
};

export default ConnectionDrawer;

