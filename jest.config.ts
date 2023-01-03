import { pathsToModuleNameMapper } from 'ts-jest'
import { compilerOptions } from './tsconfig.json'
import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
	roots: ['<rootDir>'],
	modulePaths: [compilerOptions.baseUrl],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
	testMatch: ['**/test/**/*.test.ts'],
	preset: 'ts-jest',
	coverageProvider: 'babel',
	coverageDirectory: "src",
	coveragePathIgnorePatterns: ["/node_modules/"],
	transform: {
			"^.+\\.tsx?$": "ts-jest",
	},
	testEnvironment: 'node',
	verbose: true,
	useStderr: true,
	resetModules: true
}

export default jestConfig
