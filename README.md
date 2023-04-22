# files-folder

Lightweight library to get all files or folders from any directory.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install files-folder.

```bash
npm i files-folder
```

## Usage

**Synchronous methods**

```typescript
import { getFilesSync, getFoldersSync } from "files-folder";

const folders = getFoldersSync("src");
console.log(folders); // string[]

const files = getFilesSync("src");
console.log(files); // string[]
```

**Asynchronous methods**

```typescript
import { getFilesAsync, getFoldersAsync } from "files-folder";

const folders = await getFoldersAsync("src");
console.log(folders); // string[]

const files = await getFilesAsync("src");
console.log(files); // string[]
```

**Get the relative or full path**

This parameter works for all functions.

```typescript
import {
    getFilesSync,
    getFilesAsync,
    getFoldersSync
    getFoldersAsync
} from "files-folder";

getFoldersSync("src", { full_path: true }); // src/**
await getFilesAsync("src", { full_path: true }); // home/**
```

## Contributing

Pull requests are welcome. For major changes, [please open an issue](https://github.com/Maarcosv99/files-folder/issues) first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
