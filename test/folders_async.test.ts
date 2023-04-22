import { getFoldersAsync } from "../dist";
import { resolve } from "path";
import { MessageError } from "../src/constants";

describe("Testing", () => {
	test("Return foldersname in directory", async () => {
		const folders = await getFoldersAsync("test/fixtures");
		expect(folders).toStrictEqual([
			"test/fixtures/empty",
			"test/fixtures/on",
			"test/fixtures/on/mega",
			"test/fixtures/on/mega/use",
		]);
	});

	test("Return foldersname in directory - with full path", async () => {
		const path = resolve(".");
		const folders = await getFoldersAsync("test/fixtures", {
			full_path: true,
		});

		expect(folders).toStrictEqual(
			[
				"test/fixtures/empty",
				"test/fixtures/on",
				"test/fixtures/on/mega",
				"test/fixtures/on/mega/use",
			].map((folder) => `${path}/${folder}`)
		);
	});

	test("Return zero files when not found folders", async () => {
		const files = await getFoldersAsync("test/fixtures/empty");
		expect(files).toStrictEqual([]);
	});

	test("Should return error when not found directory", async () => {
		await expect(getFoldersAsync("/ok")).rejects.toThrow(
			MessageError.DIRECTORY_NOT_EXIST
		);
	});
});
