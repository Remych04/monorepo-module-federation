import path from "path"
import { container, type Configuration } from "webpack";
import { buildWebpack } from "@packages/build-config";
import { BuildMode, BuildPaths, BuildPlatform } from "@packages/build-config";
import packageJson from "./package.json";

interface EnvVariables {
    mode?: BuildMode,
    port?: number,
    analyzer?: boolean
    platform?: BuildPlatform,
    SHOP_REMOTE_URL?: string,
    ADMIN_REMOTE_URL?: string
}

export default (env: EnvVariables) => {

    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:6781'
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:6782'

    const paths: BuildPaths = {
        output: path.resolve(__dirname, 'dist'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    }


    const config: Configuration = buildWebpack({
        port: env.port ?? 6780,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? "desktop"
    })

    config.plugins?.push(
        new container.ModuleFederationPlugin({
            name: 'host',
            filename: 'remoteEntry.js',

            remotes: {
                shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,
                admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
            },
            shared: {
                ...packageJson.dependencies,
                react: {
                    eager: true,
                    requiredVersion: packageJson.dependencies['react']
                },
                'react-router-dom': {
                    eager: true,
                    requiredVersion: packageJson.dependencies['react-router-dom']
                },
                'react-dom': {
                    eager: true,
                    requiredVersion: packageJson.dependencies['react-dom']
                }
            }
        }),
    )

    return config;
};
