const Levenshtein = class {
	constructor(str1 = undefined, str2 = undefined) {
		this.str1 = str1;
		this.str2 = str2;
		this.result = undefined;
		this.stat = undefined;
	}

	initialize(length_row, length_column) {
		this.result = new Array(length_row);

		for (let i = 0; i < length_row; i++) {
			this.result[i] = new Array(length_column);
			this.result[i][0] = i;
		}

		for (let j = 0; j < length_column; j++) {
			this.result[0][j] = j;
		}
	}

	calculate_distance() {
		// check str1, str2 is defined
		// if not, stop calculate;
		if (this.str1 === undefined || this.str2 === undefined) {
			console.log("str1 or str2 is not defined\n");

			return;
		}

		const [length_row, length_column] = [
			this.str1.length + 1,
			this.str2.length + 1,
		];

		// initialize first value
		this.initialize(length_row, length_column);

		let output =
			"Levenshtein distance matrix\n-----\n" +
			"Shape: " +
			length_row +
			" X " +
			length_column +
			"\n";

		output += "     ";
		for (let j = 1; j < length_column; j++) {
			output += " " + this.str2[j - 1] + " ";
		}
		output += "\n  ";

		for (let j = 0; j < length_column; j++) {
			output += (9 < this.result[0][j] ? "" : " ") + this.result[0][j] + " ";
		}
		output += "\n";

		//calculate each field
		for (let i = 1; i < length_row; i++) {
			output +=
				this.str1[i - 1] +
				" " +
				(9 < this.result[i][0] ? "" : " ") +
				this.result[i][0] +
				" ";

			for (let j = 1; j < length_column; j++) {
				this.result[i][j] = this.choose_next_step(i, j);

				output += (9 < this.result[i][j] ? "" : " ") + this.result[i][j] + " ";
			}
			output += "\n";
		}

		this.print_distance_matrix = () => {
			console.log(output);
		};
	}

	// next --> choose remove, insert, switch or none
	choose_next_step(i, j) {
		return Math.min(
			this.result[i - 1][j] + 1, // remove
			this.result[i][j - 1] + 1, // insert
			this.result[i - 1][j - 1] +
				(this.str1[i - 1] === this.str2[j - 1] ? 0 : 2) // none, switch
		);
	}

	// backtrack --> choose remove, insert, switch or none
	choose_stat(i, j, min) {
		let choice;

		switch (min) {
			case this.str1[i - 1] === this.str2[j - 1]
				? this.result[i][j]
				: undefined:
				choice = "none";
				i--;
				j--;
				break;

			case this.result[i - 1][j - 1] + 2:
				choice = "switch";
				i--;
				j--;
				break;

			case this.result[i][j - 1] + 1:
				choice = "insert";
				j--;
				break;

			case this.result[i - 1][j] + 1:
				choice = "remove";
				i--;
				break;
		}

		return [i, j, choice];
	}

	calculate_backtrack() {
		if (this.result === undefined) {
			console.log("first call calculate_distance, then call again\n");

			return;
		}

		this.stat = new Array();

		let i = this.str1.length,
			j = this.str2.length;

		while (i != 0 || j != 0) {
			if (i != 0 && j == 0) {
				while (i--) this.stat.push("remove");
				break;
			}

			if (j != 0 && i == 0) {
				while (j--) this.stat.push("insert");
				break;
			}

			const min = this.choose_next_step(i, j);

			let choice;
			[i, j, choice] = this.choose_stat(i, j, min);

			this.stat.push(choice);
		}

		this.stat.reverse();

		this.print_bactrack = () => {
			let output = "Backtrack\n-----\nLength: " + this.stat.length + "\n";
			for (const i of this.stat) {
				output += i + " ";
			}
			output += "\n";

			console.log(output);
		};
	}

	print_strs() {
		if (this.str1 === undefined || this.str2 === undefined) {
			console.log("Set str1 and str2, then call again\n");

			return;
		}

		let output =
			"Strings\n-----\n" +
			"1---> " +
			this.str1 +
			" " +
			this.str1.length +
			"\n2---> " +
			this.str2 +
			" " +
			this.str2.length +
			"\n";

		console.log(output);
	}

	print_bactrack() {
		console.log("first call calculate_backtrack, then call print_backtrack\n");
	}

	print_distance_matrix() {
		console.log(
			"first call calculate_distance, then call print_distance_matrix\n"
		);
	}

	print_levenshtein_distance() {
		if (this.result === undefined) {
			console.log("first call calculate_distance, then call again\n");

			return;
		}

		console.log(
			"Levenshtein distance\n-----\n",
			this.result[this.str1.length][this.str2.length]
		);
	}

	visualize() {
		if (this.stat === undefined) {
			console.log("first call calculate_backtrack, then call again\n");

			return;
		}

		let str1 = "";
		let str2 = "";
		let str3 = "";

		let i = 0,
			j = 0;

		for (const choice of this.stat) {
			switch (choice) {
				case "none":
					str1 += this.str1[i++];
					str2 += " ";
					str3 += this.str2[j++];
					break;

				case "switch":
					str1 += this.str1[i++];
					str2 += "|";
					str3 += this.str2[j++];
					break;

				case "insert":
					str1 += "+";
					str2 += " ";
					str3 += this.str2[j++];
					break;

				case "remove":
					str1 += this.str1[i++];
					str2 += " ";
					str3 += "*";
					break;
			}
		}

		console.log("Visualize\n-----\n" + str1 + "\n" + str2 + "\n" + str3 + "\n");
	}

	print() {
		this.print_strs();
		this.calculate_distance();
		this.calculate_backtrack();
		this.print_distance_matrix();
		this.print_bactrack();
		this.visualize();
		this.print_levenshtein_distance();
	}
};

module.exports = {
	Levenshtein,
};
