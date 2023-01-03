# files-folder

Lightweight library to grab all files in a directory..

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install files-folder.

```bash
npm i files-folder
```

## Usage

```typescript
import { filesFromFolder } from 'files-folder'

const files = filesFromFolder('src')
console.log(files) // return filenames as string[]
```

## Contributing

Pull requests are welcome. For major changes, [please open an issue](https://github.com/Maarcosv99/files-folder/issues) first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)