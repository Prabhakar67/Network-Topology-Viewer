import { useTheme } from "../../../contexts/ThemeContext";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="px-3 py-1 rounded border
                 bg-gray-200 text-black
                 dark:bg-gray-800 dark:text-white "
        >
            {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
        </button>
    );
};

export default ThemeToggle;
