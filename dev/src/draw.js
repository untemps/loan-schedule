import './index.css'

const createTable = (rows) => {
	const table = document.createElement("table");
	rows.forEach((row) => {
		table.appendChild(row);
	});
	return table;
}

const createCol = (content) => {
	const col = document.createElement("td");
	const text = document.createTextNode(content);
	col.appendChild(text);
	return col;
}

const createRow = (cols) => {
	const row = document.createElement("tr");
	cols.forEach((col) => {
		row.appendChild(col);
	});
	return row;
}

export default (data) => {
	const appEl =
		document.querySelector("#root") || document.createElement("div");
	appEl.innerHTML = "";

	const rows = [];
	const headerCols = [
		createCol("Year"),
		...data[0].debitValues.map((item) => createCol(item.label)),
		...data[0].creditValues.map((item) => createCol(item.label)),
		createCol("Balance")
	];
	const headerRow = createRow(headerCols);
	rows.push(headerRow);

	data.forEach((yearItem) => {
		const cols = [
			createCol(yearItem.year.toString()),
			...yearItem.debitValues.map((item) =>
				createCol(item.value.toFixed(2))
			),
			...yearItem.creditValues.map((item) =>
				createCol(item.value.toFixed(2))
			),
			createCol(yearItem.balance.toFixed(2))
		];

		const row = createRow(cols);
		rows.push(row);
	});

	const tableEl = createTable(rows);
	appEl.appendChild(tableEl);
}