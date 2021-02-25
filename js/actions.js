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