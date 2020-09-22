/* eslint-disable @typescript-eslint/no-var-requires */
const {writeFileSync, readFileSync} = require('fs');
const {convertTo} = require('./lib');

/**
 * Expected payload format:
 *  {
 *    'payload': {
 *      'file_name': 'name of source file with extension, example: document.docx',
 *      'out_format': 'output format, example: pdf',
 *      'base64_content': 'content of source file, base64 encoded'
 *    }
 *  }
 *
 *  @param {*} event AWS lamdba event
 *  @returns converted file content, base64 encoded
 */
module.exports.handler = async event => {
  let {file_name} = event.payload;
  let {out_format} = event.payload;
  let file_content = event.payload.base64_content;

  writeFileSync(`/tmp/${file_name}`, Buffer.from(file_content, 'base64'));

  const extension_options = {extensions: ['test_extension.oxt']};

  let converted_file_path = await convertTo(file_name, out_format, extension_options);
  let buffer = readFileSync(converted_file_path);

  return buffer.toString('base64');
};
