var g_app = new Vue({
  el: '#vue-app',
  data: {
  	// Keep track of our songs that we have retrieved and parsed
  	//  Each entry is the results of id3_get_tag for that specific file, with 'filename' appended.
  	songList: []
  },
  methods: {
  }
});