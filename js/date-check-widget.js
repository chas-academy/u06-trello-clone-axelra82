// Widget to check if date is in the future
$.widget('custom.isFuture', {
	_create: function() {
		$(this.element).on('change', (e) => {
			const inputDate = $(e.target).val();
			const timestampInput = new Date(inputDate).getTime();
			const timestampNow = new Date().getTime();
			
			if (timestampInput < timestampNow) {
				$(e.target).val('');
				alert("Due date must be in the future. We can't travel back in time... yet.");
			}else{
				const uid = e.target.closest('.task-content').id;
				const listId = ids(uid).list;
				const taskId = ids(uid).task;
				store.update(
					{
						listId,
						taskId,
						date: inputDate,
					},
					'updateTaskDate'
				);
			}
		});
	},
});