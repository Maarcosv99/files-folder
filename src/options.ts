type Options = {
	full_path?: boolean;
	filter?: RegExp | ((filename: string) => boolean);
};

const DEFAULT_OPTIONS: Options = {
	full_path: false,
};

export { Options, DEFAULT_OPTIONS };
