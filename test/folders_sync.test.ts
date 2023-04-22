import { getFoldersSync } from "../dist";
import { resolve } from "path";
import { MessageError } from "../src/constants";

describe("Testing", () => {
	test("Return foldersname in directory", () => {
		const folders = getFoldersSync("test/fixtures");
		expect(folders).toStrictEqual([
			"test/fixtures/empty",
			"test/fixtures/on",
			"test/fixtures/on/mega",
			"test/fixtures/on/mega/use",
		]);
	});

	test("Return foldersname in directory - with full path", () => {
		const path = resolve(".");
		const folders = getFoldersSync("test/fixtures", { full_path: true });

		expect(folders).toStrictEqual(
			[
				"test/fixtures/empty",
				"test/fixtures/on",
				"test/fixtures/on/mega",
				"test/fixtures/on/mega/use",
			].map((folder) => `${path}/${folder}`)
		);
	});

	test("Return zero files when not found folders", () => {
		const files = getFoldersSync("test/fixtures/empty");
		expect(files).toStrictEqual([]);
	});

	test("Should return error when not found directory", () => {
		expect(() => getFoldersSync("/ok")).toThrowError(
			MessageError.DIRECTORY_NOT_EXIST
		);
	});
});
