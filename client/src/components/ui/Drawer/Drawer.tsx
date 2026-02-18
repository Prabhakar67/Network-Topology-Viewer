// import type { ReactNode } from "react";
// import { useState } from "react"

// // interface DrawerProps {
// //     open: boolean;
// //     onClose: () => void;
// //     children: ReactNode;
// // }

// // const Drawer = ({ open, onClose, children }: DrawerProps) => {

// //     const [isDark, setIsDark] = useState(false);

// //     return (
// //         <>

// //             {open && (
// //                 <div
// //                     onClick={onClose}
// //                     style={{
// //                         position: "fixed",
// //                         inset: 0,
// //                         background: "rgba(0,0,0,0.4)",
// //                         zIndex: 100,
// //                     }}
// //                 />
// //             )}
// //             {/* Drawer */}
// //             <div>
// //                 {children}
// //             </div>
// //         </>
// //     );
// // };




// interface DrawerProps {
//     open: boolean;
//     onClose: () => void;
//     children: React.ReactNode;
// }

// const Drawer = ({ open, onClose, children }: DrawerProps) => {
//     if (!open) return null;

//     return (
//         <div
//             style={{
//                 position: "fixed",
//                 inset: 0,
//                 background: "rgba(0,0,0,0.4)",
//                 zIndex: 999,
//             }}
//             onClick={onClose}   // 👈 overlay click = close
//         >
//             <div
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     width: 320,
//                     height: "100vh",
//                     background: "white",
//                     padding: 20,
//                 }}
//                 onClick={(e) => e.stopPropagation()} // 🔥 KEY LINE
//             >
//                 {children}
//             </div>
//         </div>
//     );
// };

// export default Drawer;



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

