<!DOCTYPE html>
<head>
</head>
<body>
	<div id="app">
	  <ol>
	    <li v-for="todo in todos">
	      {{ todo.name }} -> {{ todo.description }}
	    </li>
	  </ol>
	  <input v-model="message"> <button v-on:click="addTodo">Add</button>
	</div>
	
	
	<!-- Load our scripts at the end -->
	<!-- production version, optimized for size and speed -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
	<script src="js/main.js"></script>
</body>