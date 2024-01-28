// sort array of string by length and alphabet, start from shortest
export const sort = (array: string[]): string[] => {
	return array.sort((a, b) => {
		if (a.length === b.length) {
			return a.localeCompare(b);
		}
		return a.length - b.length;
	});
};

// shuffling array
export const shuffle = <T>(array: T[]): T[] => {
	return array.sort(() => Math.random() - 0.5);
};
