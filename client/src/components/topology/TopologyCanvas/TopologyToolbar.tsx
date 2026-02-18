
interface Props {
    onSearch: (v: string) => void;
    onStatusFilter: (v: string) => void;
    onAddDevice: () => void;
}

const TopologyToolbar = ({
    onAddDevice,
}: Props) => {
    return (
        <div style={{ padding: 8, display: "flex", gap: 8 }}>

            <button
                style={{ padding: "8px 12px" }}
                onClick={onAddDevice}
            >
                Add Device
            </button>
        </div>
    );
};

export default TopologyToolbar;
