/*******************************
Actions
*******************************/
const populateLists = (lists) => {
	lists.forEach((list, id) => {
		const lists = renderList(list, id+1);
		$('#lists-container').append(lists);
	});

	makeSortable();
}