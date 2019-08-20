
var c_updateTimer = undefined;

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
		},
		// Keep track of local confiruation settings. 
		config: {
			musicDir: undefined,
			autoPlay: true
		},
		
		nowPlaying: undefined,
		nowPlayingTimeRatio: 0,
		
		preferredVolume: 50.0,
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
		},
		
		playNewSong(a_songname) {
			if(this.nowPlaying != undefined) {
				this.nowPlaying.pause();
			}
			this.nowPlaying = new Audio(this.config.musicDir + a_songname);
			this.nowPlaying.load();
			
			this.updateVolume();
			
			this.nowPlaying.play();
		},
		continuePlaying() {
			this.nowPlaying.play();
		},
		pauseCurrentSong() {
			this.nowPlaying.pause();
		},
		
		playPreviousSong() {
			let t_newIndex = this.songList.indexOf(this.nowPlaying.src.substr(this.nowPlaying.src.lastIndexOf('/') + 1)) - 1;
			if(t_newIndex < 0)
				t_newIndex = this.songList.length - 1;
			this.playNewSong(this.songList[t_newIndex]);
		},
		
		playNextSong() {
			let t_newIndex = this.songList.indexOf(this.nowPlaying.src.substr(this.nowPlaying.src.lastIndexOf('/') + 1)) + 1;
			if(t_newIndex >= this.songList.length)
				t_newIndex = 0;
			this.playNewSong(this.songList[t_newIndex]);
		},
		
		updateTimeRatio(){
			if(this.nowPlaying == undefined)
				this.nowPlayingTimeRatio = 0;
			else {
				this.nowPlayingTimeRatio = (this.nowPlaying.currentTime / this.nowPlaying.duration) * 100;
				
				if(this.nowPlaying.ended && this.config.autoPlay) {
					this.playNextSong();
				}
			}
		},
		
		updateVolume() {
			if(this.nowPlaying != undefined)
				this.nowPlaying.volume = this.preferredVolume / 100;
		}
	},
	
	watch: {
		'preferredVolume': function(val){
			this.updateVolume();
		}
	},
	
	beforeMount(){
		getSongList(this.updateSongs);
		
		callAPI('config&o=musicDir', (a_d) => {
			this.config.musicDir = a_d['data'];
		});
		callAPI('config&o=autoPlay', (a_d) => {
			this.config.autoPlay = a_d['data'] == 'true';
		});
		
		c_updateTimer = setInterval(this.updateTimeRatio, 500);
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