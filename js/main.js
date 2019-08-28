
var updateTimer = undefined;

var global_app = new Vue({
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
		
		nowPlaying: {currentTime: 0, duration: 100, temp: true, src: 'N A'},
		nowPlayingIndex: 0,
		nowPlayingTimeRatio: 0,
		
		preferredVolume: 50.0,
	},
	methods: {
		updateSongs(data) {
			if(data['error']) {
				alert('Error: ' + data['error']['message']);
			} else {
				this.songList = data['data'];
			}
		},
		loadSongDetails(songname) {
			if(typeof this.songData[songname] == 'undefined')
				getSongDetails(songname, this.updateSongDetails);
			else
				this.updateSongDetails(songname);
		},
		
		updateSongDetails(data) {
			if(typeof this.songData[data] != 'undefined') {
				this.currentSongData = this.songData[data];
				return;
			}
			if(data['error']) {
				alert('Error: ' + data['error']['message']);
			} else {
				this.songData[data['data']['filename']] = data['data'];
				this.currentSongData = this.songData[data['data']['filename']];
			}
		},
		
		playNewSong(songname) {
			if(this.nowPlaying !== undefined && !this.nowPlaying.temp) {
				this.nowPlaying.pause();
			}
			this.nowPlaying = new Audio(this.config.musicDir + songname);
			this.nowPlaying.load();
			
			this.nowPlayingIndex = this.songList.indexOf(songname);
			
			this.updateVolume();
			
			this.nowPlaying.play();
		},
		continuePlaying() {
			if(this.nowPlaying !== undefined && !this.nowPlaying.temp)
				this.nowPlaying.play();
			else if(this.currentSongData !== undefined)
				this.playNewSong(this.currentSongData.filename);
		},
		pauseCurrentSong() {
			if(this.nowPlaying !== undefined && !this.nowPlaying.temp)
				this.nowPlaying.pause();
		},
		
		playPreviousSong() {
			this.playNewSong(this.songList[this.previousSongIndex]);
		},
		
		playNextSong() {
			this.playNewSong(this.songList[this.nextSongIndex]);
		},
		
		updateTimeRatio(){
			if(this.nowPlaying === undefined)
				this.nowPlayingTimeRatio = 0;
			else {
				this.nowPlayingTimeRatio = (this.nowPlaying.currentTime / this.nowPlaying.duration) * 100;
				
				if(this.nowPlaying.ended && this.config.autoPlay) {
					this.playNextSong();
				}
			}
		},
		
		updateVolume() {
			if(this.nowPlaying !== undefined)
				this.nowPlaying.volume = this.preferredVolume / 100;
		}
	},
	computed: {
		previousSongIndex: function() {
			let newIndex = this.nowPlayingIndex - 1;
			if(newIndex < 0)
				newIndex = this.songList.length - 1;
			return newIndex;
		},
		nextSongIndex: function() {
			let newIndex = this.nowPlayingIndex + 1;
			if(newIndex >= this.songList.length)
				newIndex = 0;
		},
		nowPlayingSongName: function() {
			return this.nowPlaying === undefined ? 'N / A' : this.nowPlaying.src.substr(this.nowPlaying.src.lastIndexOf('/') + 1);
		}
	},
	watch: {
		'preferredVolume': function(val){
			this.updateVolume();
		}
	},
	
	beforeMount(){
		getSongList(this.updateSongs);
		
		callAPI('config&o=musicDir', (d) => {
			this.config.musicDir = d['data'];
		});
		callAPI('config&o=autoPlay', (d) => {
			this.config.autoPlay = d['data'] == 'true';
		});
		
		updateTimer = setInterval(this.updateTimeRatio, 500);
	}
});

/**
 * Get the list of songs in the music directory as specified by config.ini
 */
function getSongList(callback) {
	callAPI("list", callback);
}

/**
 * Get the details about the song / filename.
 */
function getSongDetails(songname, callback) {
	callAPI('info&s=' + songname, callback);
}

/**
 * Used to call the api with whatever action we specify. 
 * Additional values should be appended such as "info&s=filename.mp3"
 */
function callAPI(action, callback) {
	var req = new XMLHttpRequest();

    req.onreadystatechange = function() {
        if (req.readyState == XMLHttpRequest.DONE) {
           if (req.status == 200) {
               callback(JSON.parse(req.responseText));
           }
        }
    };

    req.open("GET", "api.php?a=" + action, true);
    req.send();
}