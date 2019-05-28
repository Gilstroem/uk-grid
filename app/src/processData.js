const fs = require('fs');

const rawGridData = fs.readFileSync('./data/gridwatch.csv', 'utf8');

function get_processed_data() {
	const rows = isolate_rows(rawGridData);

	const distilledData = rows.reduce((data, row) => {
		const columns = isolate_columns(row);
		if(columns.year && data[columns.year]) {
			return {
				...data,
				[columns.year]: {
					coal: columns.data.coal + data[columns.year].coal,
					nuclear: columns.data.nuclear + data[columns.year].nuclear,
					wind: columns.data.wind + data[columns.year].wind,
					hydro: columns.data.hydro + data[columns.year].hydro,
					biomass: columns.data.biomass + data[columns.year].biomass,
					oil: columns.data.oil + data[columns.year].oil,
					solar: columns.data.solar + data[columns.year].solar
				}	
			}
		} else if(columns.year) {
			return {
				...data,
				[columns.year]: columns.data
			}
		} else {
			return data;
		}
	}, {});

	return distilledData;
}

function isolate_rows(data) {
	const rows = data.split('\n');
	return rows.slice(1);
}

function isolate_columns(row) {
	const columns = row.split(',');
	return {
		year: columns[1].substring(1, 5),
		data: {
			coal: Number(columns[2]),
			nuclear: Number(columns[3]),
			wind: Number(columns[5]),
			hydro: Number(columns[7]),
			biomass: Number(columns[8]),
			oil: Number(columns[9]),
			solar: Number(columns[10])
		}
	}
}

// coal: 2, nuclear: 3, wind: 5, hydro: 7, biomass: 8, oil: 9, solar: 10

module.exports = get_processed_data;