/* eslint-disable @typescript-eslint/no-var-requires */
const {writeFileSync, readFileSync} = require('fs');
const {convertTo} = require('./lib');

module.exports.handler = async event => {
  let {file_name} = event.payload;
  let file_content = event.payload.base64_content;

  writeFileSync(`/tmp/${file_name}`, Buffer.from(file_content, 'base64'));

  const extension_options = {extensions: ['test_extension.oxt']};

  let converted_file_path = await convertTo(
    file_name,
    `"pdf:writer_pdf_Export"`,
    extension_options
  );
  let buffer = readFileSync(converted_file_path);

  return buffer.toString('base64');
};
