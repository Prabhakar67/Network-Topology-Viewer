interface Props {
    onAddDevice?: () => void;
    onAutoLayout?: () => void;
    onSaveTopology?: () => void;
    onLoadTopology?: (e: any) => void;

    searchTerm?: string;
    onSearch?: (value: string) => void;

    searchResults?: any[];
    onSelectDevice?: (device: any) => void;
}

const Header = ({
    onAddDevice,
    onAutoLayout,
    onSaveTopology,
    onLoadTopology,
    searchTerm,
    onSearch,
    searchResults = [],
    onSelectDevice
}: Props) => {

    return (
        <header className="flex h-14 w-full items-center justify-between border-b bg-white px-4">

            {/* Left */}
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-white font-bold">
                    NT
                </div>

                <h1 className="font-semibold">
                    Network Topology Viewer
                </h1>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-2">

                <button
                    onClick={onAddDevice}
                    className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                >
                    Add Device
                </button>

                <button
                    onClick={onAutoLayout}
                    className="bg-gray-700 text-white px-3 py-1 rounded text-sm hover:bg-gray-800"
                >
                    Auto Layout
                </button>

                <button
                    onClick={onSaveTopology}
                    className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                    Save
                </button>

                <label className="bg-blue-600 text-white px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-700">
                    Load
                    <input
                        type="file"
                        accept="application/json"
                        onChange={onLoadTopology}
                        className="hidden"
                    />
                </label>

                {/* Search */}
                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search device..."
                        value={searchTerm}
                        onChange={(e) => onSearch?.(e.target.value)}
                        className="border px-2 py-1 rounded text-sm w-40"
                    />

                    {searchResults.length > 0 && (
                        <div className="absolute top-full left-0 w-full bg-white border shadow rounded z-50">

                            {searchResults.map((device) => (
                                <div
                                    key={device.id}
                                    onClick={() => onSelectDevice?.(device)}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                    {device.name}
                                </div>
                            ))}

                        </div>
                    )}

                </div>

            </div>

        </header>
    );
};

export default Header;