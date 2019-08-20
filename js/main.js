var g_app = new Vue({
  el: '#app',
  data: {
  	message: '',
    todos: [
		{
			name: 'Dishes',
			description: 'Start the dishwasher'
		},
		{
			name: 'Litterbox',
			description: 'Clean the litterbox'
		},
		{
			name: 'Garbage',
			description: 'Take the garbage out.'
		}
	]
  },
  methods: {
  	addTodo: () => {
  		let name = g_app.message.split(' ')[0];
  		let desc = g_app.message.split(' ').splice(1, g_app.message.split(' ').length - 1).join(' ');
  		g_app.todos.push({name, description: desc});
  		
  		g_app.message = "";
  	}
  }
});