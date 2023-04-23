import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";
import { getFoldersAsync } from "@/folders/async";
import { type Options, DEFAULT_OPTIONS } from "@/options";
import { relative_path } from "@/utils";
import { validateTargetFolder } from "@/validations";

class Files {
	constructor(
		private readonly target_folder: string,
		private readonly options: Options = DEFAULT_OPTIONS
	) {}

	// TODO: Allow them to add a custom filter to the files
	private async getFiles(target_path: string): Promise<string[]> {
		const path = resolve(target_path);
		const filesPromises = (await readdir(path)).map(async (file) => {
			if ((await stat(join(path, file))).isFile()) {
				if (this.options.full_path) return join(path, file);
				return join(
					this.target_folder,
					relative_path(path, this.target_folder),
					file
				);
			}
		});
		return (await Promise.all(filesPromises)).filter(Boolean) as string[];
	}

	public async getAllFiles(): Promise<string[]> {
		const initial_files = await this.getFiles(this.target_folder);
		let folders = await getFoldersAsync(this.target_folder);

		const files_in_folders_promises = folders.map(
			async (folder) => await this.getFiles(folder)
		);
		const files_in_folders = await Promise.all(files_in_folders_promises);

		return initial_files.concat(...files_in_folders);
	}
}

export const getFilesAsync = async (
	target_folder: string,
	options: Options = DEFAULT_OPTIONS
): Promise<string[]> => {
	const { status, error } = validateTargetFolder(target_folder);
	if (!status) throw new Error(error);
	return await new Files(target_folder, options).getAllFiles();
};
