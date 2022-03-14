const fs = require("fs");

const confusing_matrix = require("./confusing_matrix_data.json");

let output = "  ";

const row = {};
const column = {};
const matrix = {};

for (const i of Object.keys(confusing_matrix)) {
	output += "  " + i + " ";
}

output += "\n";

let sum = 0;
let row_sum = 0;
let column_sum = 0;

for (const i of Object.keys(confusing_matrix)) {
	output += i + " ";

	let temp_row_sum = 0;
	let temp_column_sum = 0;

	for (const j of Object.keys(confusing_matrix[i])) {
		output +=
			(99 < confusing_matrix[i][j]
				? ""
				: 9 < confusing_matrix[i][j]
				? " "
				: "  ") +
			confusing_matrix[i][j] +
			" ";

		temp_row_sum += confusing_matrix[i][j];
		temp_column_sum += confusing_matrix[j][i];

		sum += confusing_matrix[i][j];
	}

	row[i] = temp_row_sum;
	column[i] = temp_column_sum;

	row_sum += temp_row_sum;
	column_sum += temp_column_sum;

	output += "\n";
}

for (const i of Object.keys(confusing_matrix)) {
	matrix[i] = {};
	for (const j of Object.keys(confusing_matrix[i])) {
		matrix[i][j] = confusing_matrix[i][j] / sum;
	}
}

for (const i of Object.keys(row)) {
	row[i] = row[i] / row_sum;
}

for (const i of Object.keys(column)) {
	column[i] = column[i] / row_sum;
}

try {
	fs.writeFileSync("confusing_row.json", JSON.stringify(row));
	fs.writeFileSync("confusing_column.json", JSON.stringify(column));
	fs.writeFileSync("confusing_matrix.json", JSON.stringify(matrix));
} catch (err) {
	console.log(err);
}

console.log(output);

console.log("Row:");
console.log(row);

console.log("Column:");
console.log(column);
