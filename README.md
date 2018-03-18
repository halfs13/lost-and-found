# Lost and Found

Generates MD5 hashes for one or more files with the option to output results
to a file. Can be used to validate a previously outputted hash file using the
--verify or -v option.

## Usage

```
lost-and-found [options] <files>
```

### Options
| Flag | Description |
|------|-------------|
| --files files | The input files for which to generate hashes or to validate hash contents |
| -d, --debug | Use trace logging |
| -q, --quiet | Limit logging to fatal errors |
| -w, --writefile | save a csv of filenames and hashes |
| -o, --outputfile | Optional filename to use for output |
| --help | Print this usage guide. |
| -v, --verify | Verify the hash csv files provided to the files flag against the file system files |
