import { filesFromFolder } from '../src'

describe('Testing', () => {
    test('Should work', () => {
        const files = filesFromFolder('test/fixtures')
        expect(files).toStrictEqual([
			'test/fixtures/lite.js',
			'test/fixtures/ma',
			'test/fixtures/speed.ts',
			'test/fixtures/on/line.ts',
			'test/fixtures/on/mega/blaster.yml',
			'test/fixtures/on/mega/use/power.json'
		])
    })

	test('Should return zero items', () => {
		expect(() => filesFromFolder('/ok')).toThrowError('Directory not exist')
	})
})
