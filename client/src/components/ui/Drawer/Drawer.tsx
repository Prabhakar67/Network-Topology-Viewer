import type { ReactNode } from "react";

interface DrawerProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Drawer = ({ open, onClose, children }: DrawerProps) => {
    return (
        <>
            {/* Overlay */}
            {open && (
                <div
                    onClick={onClose}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0,0,0,0.4)",
                        zIndex: 100,
                    }}
                />
            )}

            {/* Drawer */}
            <div
                style={{
                    position: "fixed",
                    top: 0,
                    right: open ? 0 : "-400px",
                    width: "400px",
                    height: "100vh",
                    background: "#1f2937",
                    color: "white",
                    padding: "20px",
                    transition: "right 0.3s ease",
                    zIndex: 200,
                    boxShadow: "-4px 0 10px rgba(0,0,0,0.5)",
                }}
            >

                {children}
            </div>
        </>
    );
};

export default Drawer;
