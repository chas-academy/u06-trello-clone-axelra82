// $(".sort-list").sortable({
// 	placeholder: "ui-state-highlight",
// 	tolerance: "pointer",
// }).disableSelection();

const makeSortable = () => {
	$(".sort-task, .sort-list").sortable({
		connectWith: ".sort-connect",
		placeholder: "ui-state-highlight",
		tolerance: "pointer",
		start:  (e, ui) => {
			const startPos = $(e.target).parents('.list').attr('id');
			ui.item.data('start', startPos);
		},
		stop: (e, ui) => {
			const stopPos = $(e.toElement).parents('.list').attr('id');
			const startPos = ui.item.data('start');
			if(startPos !== stopPos){
				// Change occurred
			}
		}
	}).disableSelection();
	return;
}