const get_processed_data = require('./src/processData.js');
const write_to_file = require("./src/writeToFile.js");

const processed_data = get_processed_data();
write_to_file(processed_data);
