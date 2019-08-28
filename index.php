<!DOCTYPE html>
<head>
	<!-- Credits For Used Assets
		Blank Album - BRRT at Pixabay <https://pixabay.com/photos/blank-vinyl-record-jacket-record-2924018/>
		getid3 Functionality - James Heinrigh <https://github.com/JamesHeinrich/getID3>
	-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Bootstrap CSS -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
	<!-- Font Awesome for Icons -->
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<!-- Google Fonts -->
	<link href="https://fonts.googleapis.com/css?family=Livvic&display=swap" rel="stylesheet"> 
	<!-- General Styling -->
	<link rel="stylesheet" href="css/main.css">
</head>
<body>
	
	<!-- Main app container -->
	<div class='container' id="vue-app">
		<div class='row'>
			<div class='player-quickinfo col-sm-12'>
				Currently playing: {{ nowPlayingSongName }}
			</div>
		</div>
		<div class='row'>
			<!-- Music selection menu -->
			<div class='player-musiclist col-sm-4'>
				<ul>
					<li class='musiclist-option' 
						v-for="song in songList"
						:key="song"
						v-on:click="loadSongDetails(song)">{{ song }} </li>
				</ul>
			</div>
			<!-- Song Information / Album Art -->
			<div class='player-songinfo col-sm-8'>
				<img class='songinfo-image' src='img/blank-album.jpg' title='Album Art'/>
				<span class='songinfo-detail'>File Name: {{ currentSongData.filename }}</span><br/>
				<span class='songinfo-detail'>Song Name: {{ (currentSongData.tags == undefined || currentSongData.tags.id3v2.title == undefined) ? 'N / A' : currentSongData.tags.id3v2.title[0] }}</span><br/>
				<span class='songinfo-detail'>Album Name: {{ (currentSongData.tags == undefined || currentSongData.tags.id3v2.album == undefined) ? 'N / A' : currentSongData.tags.id3v2.album[0] }}</span><br/>
				<span class='songinfo-detail'>File Size: {{ currentSongData.filesize / 1024 / 1024 - ((currentSongData.filesize / 1024 / 1024)%1) }} Mb</span><br/>
				<span class='songinfo-detail'>Duration: {{ currentSongData.playtime_string }}</span><br/>
				<em class='songinfo-detail button' v-on:click="playNewSong(currentSongData.filename)">Play Now</em>
			</div>
		</div>
		<div class='row'>
			<!-- Music Player functions -->
			<div class='player-functions col-sm-12'>
				<!-- Previous Button -->
				<i class='fa fa-step-backward button' v-on:click="playPreviousSong"></i>
				<!-- Play / Pause Button -->
				<i class='fa fa-play button' v-show='nowPlayingTimeRatio == 0 || nowPlaying.paused' v-on:click="continuePlaying"></i>
				<i class='fa fa-pause button' v-show='nowPlayingTimeRatio != 0 && !nowPlaying.paused' v-on:click="pauseCurrentSong"></i>
				<!-- Next Button -->
				<i class='fa fa-step-forward button' v-on:click="playNextSong"></i>
				<!-- Volume Control -->
				<input class='volume-slider' type="range" min="0" max="100" value="50" v-model="preferredVolume">
				<!-- Seeker -->
				<input class='player-seeker-bar' type="range" min="0" :max="nowPlaying.duration" value="0" v-model="nowPlaying.currentTime">
				<i class='player-seeker-endpoint fa fa-circle-o' :style="{ left: (nowPlayingTimeRatio) + '%' }"></i>
			</div>
		</div>
	</div>
	
	<!-- Load our scripts at the end -->
	<!-- Vue JS -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
	<!-- Logic.. -->
	<script src="js/main.js"></script>
</body>