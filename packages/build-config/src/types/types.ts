export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    public: string;
    src: string;
}

export type BuildMode = 'production' | 'development'
export type BuildPlatform = "desktop" | "mobile"

export interface BuildOptions {
    port: number;
    paths: BuildPaths;
    mode: BuildMode;
    analyzer?: boolean;
    platform: BuildPlatform
}