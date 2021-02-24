$(".sort-list").sortable({
	placeholder: "ui-state-highlight",
	tolerance: "pointer",
}).disableSelection();

const makeSortable = () => {
	$(".sort-task").sortable({
		connectWith: ".sort-connect",
		placeholder: "ui-state-highlight",
		tolerance: "pointer",
		update: ( event, ui ) => {
			console.log(event);
			console.log(ui);
		}
	}).disableSelection();

	return;
}