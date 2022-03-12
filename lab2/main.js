const { read } = require("fs");
const { Levenshtein } = require("./levenshtein");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("Enter string 1: ", (str1) => {
	readline.question("Enter string 2: ", (str2) => {
		const levenshtein = new Levenshtein(str1, str2);

		levenshtein.calculate_distance();
		levenshtein.calculate_backtrack();
		levenshtein.print_distance_matrix();
		levenshtein.print_bactrack();
		levenshtein.visualize();

		readline.close();
	});
});

readline.on("close", () => {
	console.log("\nFinished...\n");
	process.exit(0);
});
