import path from 'path';
import webpack from 'webpack';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolver } from './buildResolver';
import { buildDevServer } from './buildDevServer';
import { BuildOptions } from './types/types';

export function buildWebpack(options: BuildOptions): webpack.Configuration {
    const { mode, paths } = options
    const isDev = mode === 'development';

    return {
        mode: options.mode ?? 'development',
        entry: paths.entry,
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolver(options),
        output: {
            path: paths.output,
            filename: '[name].[contenthash].js',
            clean: true
        },
        plugins: buildPlugins(options),
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev && 'inline-source-map',
    }
}