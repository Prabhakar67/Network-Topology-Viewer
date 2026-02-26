
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
        <div className="fixed top-0 right-0 z-50 h-screen w-[320px] border-l border-gray-200 bg-white dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 p-4 shadow-xl">

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

