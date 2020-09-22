# aws-lambda-libreoffice ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

> 85 MB LibreOffice to fit inside AWS Lambda compressed with Brotli

Inspired by [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)

:information_source: Compiled LibreOffice version: 6.4.0.1

## Install

```
$ yarn add @shelf/aws-lambda-libreoffice
```

**NOTE:** Since version 2.0.0 npm package no longer ships the 85 MB LibreOffice but relies upon [libreoffice-lambda-layer](https://github.com/shelfio/libreoffice-lambda-layer) instead.
Follow the instructions on how to add a lambda layer in [that repo](https://github.com/shelfio/libreoffice-lambda-layer).

## Custom lambda usage

In `app.js` we have written lambda function that converts incoming file. You can test it with this command in docker container:

```sh
./app.sh
```

## Usage

```js
const {convertTo, canBeConvertedToPDF} = require('@shelf/aws-lambda-libreoffice');

module.exports.handler = async () => {
  // assuming there is a document.docx file inside /tmp dir
  // original file will be deleted afterwards

  if (!canBeConvertedToPDF('document.docx')) {
    return false;
  }

  return convertTo('document.docx', 'pdf'); // returns /tmp/document.pdf
};
```

Or if you want more control:

```js
const {unpack, defaultArgs} = require('@shelf/aws-lambda-libreoffice');

await unpack(); // default path /tmp/instdir/program/soffice.bin

execSync(
  `/tmp/instdir/program/soffice.bin ${defaultArgs.join(
    ' '
  )} --convert-to pdf file.docx --outdir /tmp`
);
```

## Troubleshooting

- Please allocate at least **1536 MB** of RAM for your Lambda function.
- It works only in Amazon Linux 2, so it won't work locally on Linux or macOS. However, you could run it in Docker using `lambci/lambda:nodejs12.x` image
- If some file fails to be converted to PDF, try converting it to PDF on your computer first. This might be an issue with LibreOffice itself

## See Also

- [libreoffice-lambda-layer](https://github.com/shelfio/libreoffice-lambda-layer)
- [serverless-libreoffice](https://github.com/vladgolubev/serverless-libreoffice)
- [aws-lambda-tesseract](https://github.com/shelfio/aws-lambda-tesseract)
- [aws-lambda-brotli-unpacker](https://github.com/shelfio/aws-lambda-brotli-unpacker)
- [chrome-aws-lambda](https://github.com/alixaxel/chrome-aws-lambda)

### Test

Smoke test that it works: `./test.sh`.
Make sure to clone [libreoffice-lambda-layer](https://github.com/shelfio/libreoffice-lambda-layer) repo alongside

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master
```

## License

MIT © [Shelf](https://shelf.io)
