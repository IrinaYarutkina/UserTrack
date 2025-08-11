import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",

  webpack(config) {
    config.resolve.alias['@components'] = path.resolve(__dirname, 'components');
    config.resolve.alias['@lib'] = path.resolve(__dirname, 'lib');
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig; 
