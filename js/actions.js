/*******************************
Actions
*******************************/
const populateLists = (lists) => {
	lists.forEach((list, id) => {
		const lists = renderList(list, id);
		$('#lists-container').append(lists);
	});

	makeSortable();
}