import { readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { getFoldersSync } from "@/folders/sync";
import { type Options, DEFAULT_OPTIONS } from "@/options";
import { relative_path } from "@/utils";
import { validateTargetFolder } from "@/validations";

class Files {
	constructor(
		private readonly target_folder: string,
		private readonly options: Options = DEFAULT_OPTIONS
	) {}

	private filter(path: string, file: string): boolean {
		if (!statSync(join(path, file)).isFile()) return false;
		if (!this.options.filter) return true;

		const { filter } = this.options;
		if (filter instanceof RegExp) return filter.test(file);
		return filter!(file);
	}

	private getFiles(target_path: string): string[] {
		const path = resolve(target_path);
		const files = readdirSync(path).map((file) => {
			if (!this.filter(path, file)) return;
			if (this.options.full_path) return join(path, file);
			return join(
				this.target_folder,
				relative_path(path, this.target_folder),
				file
			);
		});
		return files.filter(Boolean) as string[];
	}

	public getAllFiles(): string[] {
		let all_files = [...this.getFiles(this.target_folder)];
		getFoldersSync(this.target_folder).forEach((folder) => {
			all_files = all_files.concat(this.getFiles(folder));
		});
		return all_files;
	}
}

export const getFilesSync = (
	target_folder: string,
	options: Options = DEFAULT_OPTIONS
): string[] => {
	const { status, error } = validateTargetFolder(target_folder);
	if (!status) throw new Error(error);
	return new Files(target_folder, options).getAllFiles();
};
