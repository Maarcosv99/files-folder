import { readdirSync, statSync } from "fs";
import { resolve, join } from "path";
import { type Options, DEFAULT_OPTIONS } from "@/options";
import { relative_path } from "@/utils";
import { validateTargetFolder } from "@/validations";

class Folders {
	constructor(
		private readonly target_folder: string,
		private readonly options: Options = DEFAULT_OPTIONS
	) {}

	private getFolders(target_path: string): string[] {
		const path = resolve(target_path);
		return readdirSync(path)
			.filter((file) => statSync(join(path, file)).isDirectory())
			.map((folder) => {
				if (this.options.full_path) return join(path, folder);
				return join(
					this.target_folder,
					relative_path(path, this.target_folder),
					folder
				);
			});
	}

	public getAllFolders(): string[] {
		let all_folders = [...this.getFolders(this.target_folder)];
		for (let i = 0; i < all_folders.length; i++) {
			all_folders.push(...this.getFolders(all_folders[i]));
		}
		return all_folders;
	}
}

export const getFoldersSync = (
	target_folder: string,
	options: Options = DEFAULT_OPTIONS
): string[] => {
	const { status, error } = validateTargetFolder(target_folder);
	if (!status) throw new Error(error);
	return new Folders(target_folder, options).getAllFolders();
};
