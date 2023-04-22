import { readdir, stat } from "fs/promises";
import { resolve, join } from "path";
import { type Options, DEFAULT_OPTIONS } from "@/options";
import { relative_path } from "@/utils";
import { validateTargetFolder } from "@/validations";

class Folders {
	constructor(
		private readonly target_folder: string,
		private readonly options: Options = DEFAULT_OPTIONS
	) {}

	private async getFolders(target_path: string): Promise<string[]> {
		const path = resolve(target_path);
		const files = await readdir(path);
		const foldersPromises = files.map(async (file) => {
			const fullPath = join(path, file);
			if ((await stat(fullPath)).isDirectory()) {
				if (this.options.full_path) return fullPath;
				return join(
					this.target_folder,
					relative_path(path, this.target_folder),
					file
				);
			}
		});
		return (await Promise.all(foldersPromises)).filter(Boolean) as string[];
	}

	public async getAllFolders(): Promise<string[]> {
		let all_folders = [...(await this.getFolders(this.target_folder))];
		for (let i = 0; i < all_folders.length; i++) {
			all_folders.push(...(await this.getFolders(all_folders[i])));
		}
		return all_folders;
	}
}

export const getFoldersAsync = async (
	target_folder: string,
	options: Options = DEFAULT_OPTIONS
): Promise<string[]> => {
	const { status, error } = validateTargetFolder(target_folder);
	if (!status) throw new Error(error);
	return await new Folders(target_folder, options).getAllFolders();
};
