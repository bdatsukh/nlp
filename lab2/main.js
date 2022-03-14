const { read } = require("fs");
const { Levenshtein } = require("./levenshtein");
const { WeightedDistance } = require("./weighted_edit_distance");

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("Enter string 1: ", (str1) => {
	readline.question("Enter string 2: ", (str2) => {
		readline.question(
			"Levenshtein Distance\t---> 1\nWeighted Distance\t---> 2\n> ",
			(mode) => {
				console.log();

				let levenshtein;
				switch (mode) {
					case "1":
						levenshtein = new Levenshtein(str1, str2);
						levenshtein.print();
						break;
					case "2":
						const weighted_edit_distance = new WeightedDistance(str1, str2);
						weighted_edit_distance.print();
						break;
					default:
						levenshtein = new Levenshtein(str1, str2);
						levenshtein.print();
						break;
				}

				readline.close();
			}
		);
	});
});

readline.on("close", () => {
	console.log("\tFinished...\n");
	process.exit(0);
});
