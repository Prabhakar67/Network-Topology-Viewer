// /** @type {import('tailwindcss').Config} */
// export default {
//     darkMode: "class", // 🔥 important
//     content: [
//         "./index.html",
//         "./src/**/*.{js,ts,jsx,tsx}",
//     ],
//     theme: {
//         extend: {},
//     },
//     plugins: [],
// };

import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",   // 👈 THIS IS CRITICAL
    content: [
        "./index.html",
        "./src/**/*.{ts,tsx,js,jsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;

