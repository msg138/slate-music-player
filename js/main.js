var g_app = new Vue({
	el: '#vue-app',
	data: {
		// Keep track of our songs that we have retrieved and parsed
		//  Each entry is the results of id3_get_tag for that specific file, with 'filename' appended.
		songList: [],
		// Uses filename as the index
		songData: {},
		// Keep track of current details
		currentSongData: {
			
		}
	},
	methods: {
		updateSongs(a_data) {
			if(a_data['error']) {
				alert('Error: ' + a_data['error']['message']);
			} else {
				this.songList = a_data['data'];
			}
		},
		loadSongDetails(a_songname) {
			if(typeof this.songData[a_songname] == 'undefined')
				getSongDetails(a_songname, this.updateSongDetails);
			else
				this.updateSongDetails(a_songname);
		},
		
		updateSongDetails(a_data) {
			if(typeof this.songData[a_data] != 'undefined') {
				this.currentSongData = this.songData[a_data];
				return;
			}
			if(a_data['error']) {
				alert('Error: ' + a_data['error']['message']);
			} else {
				this.songData[a_data['data']['filename']] = a_data['data'];
				this.currentSongData = this.songData[a_data['data']['filename']];
			}
		}
	},
	
	beforeMount(){
		getSongList(this.updateSongs)
	}
});

/**
 * Get the list of songs in the music directory as specified by config.ini
 */
function getSongList(a_callback) {
	callAPI("list", a_callback);
}

/**
 * Get the details about the song / filename.
 */
function getSongDetails(a_songname, a_callback) {
	callAPI('info&s=' + a_songname, a_callback);
}

/**
 * Used to call the api with whatever action we specify. 
 * Additional values should be appended such as "info&s=filename.mp3"
 */
function callAPI(a_action, a_callback) {
	var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
           if (req.status == 200) {
               a_callback(JSON.parse(req.responseText));
           }
        }
    };

    req.open("GET", "api.php?a=" + a_action, true);
    req.send();
}