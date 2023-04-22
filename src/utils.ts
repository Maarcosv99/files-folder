import { resolve } from "path";

export const relative_path = (path: string, target: string): string => {
	return path.replace(resolve(target), "");
};
