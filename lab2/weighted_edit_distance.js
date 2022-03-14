const { Levenshtein } = require("./levenshtein");
const confusing_matrix = require("./confusing_matrix.json");
const confusing_row = require("./confusing_row.json");
const confusing_column = require("./confusing_column.json");

class WeightedDistance extends Levenshtein {
	#confusing_matrix;
	#confusing_row;
	#confusing_column;

	constructor(str1, str2) {
		super(str1, str2);

		this.#confusing_matrix = confusing_matrix;
		this.#confusing_row = confusing_row;
		this.#confusing_column = confusing_column;
	}

	initialize(length_row, length_column) {
		this.result = new Array(length_row);

		this.result[0] = new Array(length_column);
		this.result[0][0] = 0;

		for (let i = 1; i < length_row; i++) {
			this.result[i] = new Array(length_column);

			this.result[i][0] =
				this.result[i - 1][0] + this.#confusing_row[this.str1[i - 1]];
		}

		for (let j = 1; j < length_column; j++) {
			this.result[0][j] =
				this.result[0][j - 1] + this.#confusing_column[this.str2[j - 1]];
		}
	}

	choose_next_step(i, j) {
		return Math.min(
			this.result[i - 1][j] + this.#confusing_row[this.str1[i - 1]],
			this.result[i][j - 1] + this.#confusing_column[this.str2[j - 1]],
			this.result[i - 1][j - 1] +
				this.#confusing_matrix[this.str1[i - 1]][this.str2[j - 1]]
		);
	}

	// backtrack --> choose remove, insert, switch or none
	choose_stat(i, j, min) {
		let choice;

		switch (min) {
			case this.str1[i - 1] === this.str2[j - 1] ? min : undefined:
				choice = "none";
				i--;
				j--;
				break;

			case this.result[i - 1][j - 1] +
				this.#confusing_matrix[this.str1[i - 1]][this.str2[j - 1]]:
				choice = "switch";
				i--;
				j--;
				break;

			case this.result[i][j - 1] + this.#confusing_column[this.str2[j - 1]]:
				choice = "insert";
				j--;
				break;

			case this.result[i - 1][j] + this.#confusing_row[this.str1[i - 1]]:
				choice = "remove";
				i--;
				break;
		}

		return [i, j, choice];
	}
}

module.exports = {
	WeightedDistance,
};
