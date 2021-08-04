function findAuthorById(authors, id) {
	return authors.find((author) => id === author.id);
}

function findBookById(books, id) {
	return books.find((book) => id === book.id);
}

function partitionBooksByBorrowedStatus(books) {
	return books.reduce(
		(acc, book) => {
			for (let borrow of book.borrows) {
				if (!borrow.returned) {
					return [[...acc[0], book], acc[1]];
				}
			}
			return [acc[0], [...acc[1], book]];
		},
		[[], []],
	);
}

function getBorrowersForBook(book, accounts) {
	return book.borrows
		.map((borrow) => {
			const account = accounts.find((account) => account.id === borrow.id);
			account.returned = borrow.returned;
			return account;
		})
		.slice(0, 10);
}

module.exports = {
	findAuthorById,
	findBookById,
	partitionBooksByBorrowedStatus,
	getBorrowersForBook,
};
