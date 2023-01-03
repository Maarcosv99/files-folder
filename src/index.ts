import { readdirSync, statSync } from 'fs'
import { cwd } from 'process'

export interface ErrnoException extends Error {
	errno?: number | undefined;
	code?: string | undefined;
	path?: string | undefined;
	syscall?: string | undefined;
}

function foldersFromFolder(shortPath: string): string[] {
	const path = `${cwd()}/${shortPath}`
	return readdirSync(path)
		.filter((file) => statSync(`${path}/${file}`).isDirectory())
		.map((folder) => `${shortPath}/${folder}`)
}

function getFilesFromFolder(shortPath: string): string[] {
	const path = `${cwd()}/${shortPath}`
	return readdirSync(path)
		.filter((file) => statSync(`${path}/${file}`).isFile())
		.map((file) => `${shortPath}/${file}`);
}

function filesFromFolder(shortPath: string): string[] {
	try {
		let all_files = [...getFilesFromFolder(shortPath)]
		let all_folders = [...foldersFromFolder(shortPath)]

		let index = 0
		while (index < all_folders.length) {
			const folder = all_folders[index]

			let folders = foldersFromFolder(folder)
			all_folders = all_folders.concat(folders)

			let files = getFilesFromFolder(folder)
			all_files = all_files.concat(files)

			index++
		}

		return all_files
	} catch (error: any) {
		const errorDetail = error as ErrnoException
		if (errorDetail.code === 'ENOENT', errorDetail.syscall === 'scandir') {
			throw new Error('Directory not exist')
		}
		return []
	}
}

export { filesFromFolder, foldersFromFolder }
