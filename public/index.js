const data = {"2011":{"coal":704880524,"nuclear":422182032,"wind":76468957,"hydro":29254849,"biomass":0,"oil":74257,"solar":0},"2012":{"coal":1645181427,"nuclear":790920607,"wind":151091986,"hydro":39240005,"biomass":25048736,"oil":242717,"solar":0},"2013":{"coal":1503454027,"nuclear":788236744,"wind":222769726,"hydro":34869253,"biomass":46016528,"oil":90780,"solar":0},"2014":{"coal":1156030581,"nuclear":715178867,"wind":253407457,"hydro":46954900,"biomass":89363933,"oil":60512,"solar":0},"2015":{"coal":892096639,"nuclear":786718376,"wind":280039180,"hydro":49021648,"biomass":135121724,"oil":31186,"solar":0},"2016":{"coal":333439832,"nuclear":796861230,"wind":252911795,"hydro":40313912,"biomass":169454616,"oil":0,"solar":7374983.31610699},"2017":{"coal":247084364,"nuclear":786055429,"wind":387554973,"hydro":48003718,"biomass":170876538,"oil":0,"solar":124463053.10336703},"2018":{"coal":184086684,"nuclear":726964962,"wind":472453950,"hydro":38424821,"biomass":193127079,"oil":462,"solar":130664476.8382529},"2019":{"coal":37769026,"nuclear":258945782,"wind":219739983,"hydro":17091311,"biomass":78141114,"oil":695,"solar":52234410.25081492}};

function renderPieCharts() {
	const string = Object.keys(data)
	.map(year => {
		const total = get_total(year);
		const gradientString = get_gradient(year, total);
		return `
		<div class="year">
			<div class="pie_wrapper">
				<div class="pie" style='background: ${gradientString}'></div>
				<div class="legend">
					<span>${year}</span>
					<ul class="legend-list">
						${get_legend(year, total)}
					</ul>
				</div>
			</div>
		</div>
		`
	})
	.join('');

	document.getElementById('root').innerHTML = string;
}

function get_total(key) {
	return Object.values(data[key])
	.reduce((total, value) => total + value, 0);
}

function get_gradient(year, total) {
	const gradients = Object.keys(data[year]).reduce((gradients, fuel) => {
		const gradient = {
			name: fuel,
			grads: {
				start: gradients.latestStop, 
				stop: gradients.latestStop + (data[year][fuel] / total) * 400
			},
			colour: get_fuel_colour(fuel)
		}

		return {
			latestStop: gradient.grads.stop,
			all: [...gradients.all, gradient]
		}
	}, {
		latestStop: 0,
		all: []
	}).all;

	const gradientsString = gradients
		.map(fuel => {
			return `${fuel.colour} ${fuel.grads.start}grad ${fuel.grads.stop}grad`;
		})
		.join(',');

	return `conic-gradient(${gradientsString})`;
}

function get_legend(year, total) {
	return Object.keys(data[year]).map(fuel => {
		const proportion = ((data[year][fuel] / total) * 100).toFixed(0)
		return `
			<li style="border-right: 22px solid ${get_fuel_colour(fuel)}">
				<span>${fuel}</span> <b>${proportion}%</b>
			</li>`
	}).join('')
}

function get_fuel_colour(fuel) {
	switch(fuel) {
		case 'coal': return '#696969'
		case 'nuclear': return '#F1C40F'
		case 'wind': return '#AED6F1'
		case 'hydro': return '#2E86C1'
		case 'biomass': return '#17A589'
		case 'oil': return '#2E4053'
		case 'solar': return '#F39C12'
	}
}