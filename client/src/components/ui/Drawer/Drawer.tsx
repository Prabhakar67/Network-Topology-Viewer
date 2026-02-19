

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
    return (
        <div
            className={`fixed inset-0 z-50 transition-all duration-300 ${open ? "visible opacity-100" : "invisible opacity-0"
                }`}
        >
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Drawer Panel */}
            <div
                className={`absolute top-0 right-0 h-full w-80 transform bg-white p-5 shadow-xl transition-transform duration-300
                    dark:bg-gray-900
                    ${open ? "translate-x-0" : "translate-x-full"}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Drawer;

