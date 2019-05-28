const fs = require('fs');

function write_to_file(data) {
	fs.writeFileSync('./data/processed.json', JSON.stringify(data));
}

module.exports = write_to_file;