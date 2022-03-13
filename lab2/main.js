const { read } = require("fs");
const { Levenshtein } = require("./levenshtein");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});

readline.question("Enter string 1: ", (str1) => {
	readline.question("Enter string 2: ", (str2) => {
		console.log();

		const levenshtein = new Levenshtein(str1, str2);
		levenshtein.print();

		readline.close();
	});
});

readline.on("close", () => {
	console.log("\tFinished...\n");
	process.exit(0);
});
