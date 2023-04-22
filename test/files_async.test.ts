import { getFilesAsync } from "../dist";
import { MessageError } from "../src/constants";
import { resolve } from "path";

describe("Testing", () => {
	test("Return path from all files in directory", async () => {
		const files = await getFilesAsync("test/fixtures");
		expect(files).toStrictEqual([
			"test/fixtures/lite.js",
			"test/fixtures/ma",
			"test/fixtures/speed.ts",
			"test/fixtures/on/line.ts",
			"test/fixtures/on/mega/blaster.yml",
			"test/fixtures/on/mega/use/power.json",
		]);
	});

	test("Return path from all files in directory - with full path", async () => {
		const path = resolve(".");
		const files = await getFilesAsync("test/fixtures", { full_path: true });

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
		const files = await getFilesAsync("test/fixtures/empty");
		expect(files).toStrictEqual([]);
	});

	test("Should return error when not found directory", async () => {
		await expect(getFilesAsync("/ok")).rejects.toThrow(
			MessageError.DIRECTORY_NOT_EXIST
		);
	});
});
