import { getFilesSync } from "../dist";
import { resolve } from "path";
import { MessageError } from "../src/constants";

describe("Testing", () => {
	test("Return path from all files in directory - not full path", () => {
		const files = getFilesSync("test/fixtures");
		expect(files).toStrictEqual([
			"test/fixtures/lite.js",
			"test/fixtures/ma",
			"test/fixtures/speed.ts",
			"test/fixtures/on/line.ts",
			"test/fixtures/on/mega/blaster.yml",
			"test/fixtures/on/mega/use/power.json",
		]);
	});

	test("Return path from all files in directory - with full path", () => {
		const path = resolve(".");
		const files = getFilesSync("test/fixtures", { full_path: true });

		expect(files).toStrictEqual(
			[
				"test/fixtures/lite.js",
				"test/fixtures/ma",
				"test/fixtures/speed.ts",
				"test/fixtures/on/line.ts",
				"test/fixtures/on/mega/blaster.yml",
				"test/fixtures/on/mega/use/power.json",
			].map((file) => `${path}/${file}`)
		);
	});

	test("Return zero files when not found files", async () => {
		const files = getFilesSync("test/fixtures/empty");
		expect(files).toStrictEqual([]);
	});

	test("Should return error when not found directory", () => {
		expect(() => getFilesSync("/ok")).toThrowError(
			MessageError.DIRECTORY_NOT_EXIST
		);
	});
});
