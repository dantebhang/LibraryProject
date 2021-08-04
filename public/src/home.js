function getTotalBooksCount(books) {
	return books.length;
}

function getTotalAccountsCount(accounts) {
	return accounts.length;
}

function getBooksBorrowedCount(books) {
	return books.reduce((acc, book) => {
		if (book.borrows[0].returned === false) return acc + 1;
		else {
			return acc;
		}
	}, 0);
}

function _sortObjectByValues(obj) {
	const keys = Object.keys(obj);
	return keys.sort((keyA, keyB) => {
		if (obj[keyA] > obj[keyB]) {
			return -1;
		} else if (obj[keyB] > obj[keyA]) {
			return 1;
		}
		return 0;
	});
}

function getMostCommonGenres(books) {
	let countObj = books.reduce((acc, { genre }) => {
		if (acc[genre]) {
			acc[genre] += 1;
		} else {
			acc[genre] = 1;
		}
		return acc;
	}, {});

	let sortedKeys = _sortObjectByValues(countObj);
	let sorted = sortedKeys
		.map((key) => ({ name: key, count: countObj[key] }))
		.slice(0, 5);

	return sorted;
}

// function getMostCommonGenres(books) {
// 	const tally = books.reduce((acc, book) => {
// 		let genre = book.genre;
// 		if (acc[genre] === undefined) {
// 			acc[genre] = 0;
// 		}
// 		acc[genre] += 1;
// 		return acc;
// 	}, {});
// 	const genres = Object.keys(tally)
// 		.map((key) => {
// 			return { name: key, count: tally[key] };
// 		})
// 		.sort((genreA, genreB) => {
// 			if (genreA.count > genreB.count) {
// 				return -1;
// 			} else {
// 				return 1;
// 			}
// 		})
// 		.slice(0, 5);
// 	return genres;
// }

function getMostPopularBooks(books) {
	const tally = books.reduce((acc, book) => {
		let borrowed = book.borrows.length;

		if (acc[book.title] === undefined) {
			acc[book.title] = 0;
		}
		acc[book.title] += borrowed;
		return acc;
	}, {});

	const popular = Object.keys(tally)
		.map((key) => {
			return { name: key, count: tally[key] };
		})
		.sort((bookA, bookB) => {
			if (bookA.count > bookB.count) {
				return -1;
			} else {
				return 1;
			}
		})
		.slice(0, 5);
	return popular;
}

function getMostPopularAuthors(books, authors) {
	const tally = books.reduce((acc, book) => {
		let borrowed = book.borrows.length;
		if (acc[book.authorId] === undefined) {
			acc[book.authorId] = 0;
		}
		acc[book.authorId] += borrowed;
		return acc;
	}, {});

	const popular = Object.keys(tally)
		.map((key) => {
			let author = authors.find((author) => author.id == key);
			return {
				name: `${author.name.first} ${author.name.last}`,
				count: tally[key],
			};
		})

		.sort((bookA, bookB) => {
			if (bookA.count > bookB.count) {
				return -1;
			} else {
				return 1;
			}
		})
		.slice(0, 5);
	return popular;
}

module.exports = {
	getTotalBooksCount,
	getTotalAccountsCount,
	getBooksBorrowedCount,
	getMostCommonGenres,
	getMostPopularBooks,
	getMostPopularAuthors,
};
