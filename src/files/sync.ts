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

	private getFiles(target_path: string): string[] {
		const path = resolve(target_path);
		return readdirSync(path)
			.filter((file) => statSync(join(path, file)).isFile())
			.map((file) => {
				if (this.options.full_path) return join(path, file);
				return join(
					this.target_folder,
					relative_path(path, this.target_folder),
					file
				);
			});
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
