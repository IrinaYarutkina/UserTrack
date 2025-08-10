import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/pages/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                accent: "#171717",  
            },
        },
        },
    plugins: [],
};

export default config;
