interface Props {
    onSearch: (v: string) => void;
    onStatusFilter: (v: string) => void;
    onAddDevice: () => void;
    title: string;
}

const ButtonComponent = ({ onAddDevice, title }: Props) => {
    return (
        <div className="mb-2 flex items-center gap-2 border-b border-gray-300 bg-white px-2 py-2">
            <button
                onClick={onAddDevice}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-800 hover:bg-gray-100"
            >
                {title}
            </button>
        </div>
    );
};

export default ButtonComponent;