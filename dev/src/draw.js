import './index.css'

const createTable = (rows) => {
	const table = document.createElement('table')
	rows.forEach((row) => {
		table.appendChild(row)
	})
	return table
}

const createCol = (content, className) => {
	const col = document.createElement('td')
	!!className && col.setAttribute('class', className)
	const text = document.createTextNode(content)
	col.appendChild(text)
	return col
}

const createRow = (cols, className) => {
	const row = document.createElement('tr')
	!!className && row.setAttribute('class', className)
	cols.forEach((col) => {
		row.appendChild(col)
	})
	return row
}

export default ({ headers, values }) => {
	const appEl = document.querySelector('#root') || document.createElement('div')
	appEl.innerHTML = ''

	const rows = []
	const headerCols = headers.map(({ label, type }) => createCol(label, `header${!!type && '-' + type}`))
	const headerRow = createRow(headerCols, 'header')
	rows.push(headerRow)

	values.forEach((column) => {
		const cols = column.map((value, i) => createCol(i === 0 ? value : value.toFixed(2), headers[i].type))
		const row = createRow(cols)
		rows.push(row)
	})

	const tableEl = createTable(rows)
	appEl.appendChild(tableEl)
}
