function findAccountById(accounts, id) {
	return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
	return accounts.sort((account1, account2) =>
		account1.name.last < account2.name.last ? -1 : 1,
	);
}

function getTotalNumberOfBorrows(account, books) {
	return books.reduce((acc, book) => {
		for (let borrow of book.borrows) {
			if (borrow.id === account.id) {
				acc++;
			}
		}
		return acc;
	}, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
	let bookAccount = books
		.filter((book) => {
			for (let borrow of book.borrows) {
				if (!borrow.returned && account.id === borrow.id) {
					return borrow;
				}
			}
		})
		.map((book) => {
			book.author = authors.find((author) => book.authorId === author.id);
			return book;
		});
	return bookAccount;
}

module.exports = {
	findAccountById,
	sortAccountsByLastName,
	getTotalNumberOfBorrows,
	getBooksPossessedByAccount,
};
