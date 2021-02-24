/*******************************
Actions
*******************************/
const populateLists = (lists) => {
	lists.forEach((list, i) => {
		const lists = renderList(list, i);
		$('#lists-container').append(lists);
	});

	makeSortable();
}

const deleteList = (list) => {
	const listId = list.attr('id');

	store.update(listId, 'remove');
	list.remove();
}
