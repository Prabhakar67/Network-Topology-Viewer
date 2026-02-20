interface Props {
    title?: string;
    onToggleTheme?: () => void;
}

const Header = ({
    title = "Network Topology Viewer",
    onToggleTheme,
}: Props) => {
    return (
        <header className="flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4 shadow-sm">
            {/* Left */}
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 text-sm font-bold text-white">
                    NT
                </div>
                <h1 className="text-lg font-semibold text-gray-800">
                    {title}
                </h1>
            </div>
        </header>
    );
};

export default Header;
