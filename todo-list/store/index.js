export const state = () => ({
	tasks: []
})
	//add
export const mutations = {
	ADD_TASK(state, task) {
		state.tasks = [{ content: task, done: false }, ...state.tasks];
	},
	//delete
	REMOVE_TASK(state, task) {
		state.tasks.splice(state.tasks.indexOf(task), 1);
	},
	//change
	TOGGLE_TASK(state, task) {
		task.done = !task.done;
	}
}
