<!DOCTYPE html>
<head>
	<!-- Credits For Used Assets
		Blank Album - BRRT at Pixabay <https://pixabay.com/photos/blank-vinyl-record-jacket-record-2924018/>
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
	<div class='container'>
		<div class='row'>
			<div class='player-quickinfo col-sm-12'>
				Currently playing: Test - Test
			</div>
		</div>
		<div class='row'>
			<!-- Music selection menu -->
			<div class='player-musiclist col-sm-4'>
				<ul>
					<li class='musiclist-option'>Test - Test</li>
					<li class='musiclist-option'>Test - Test</li>
					<li class='musiclist-option'>Test - Test</li>
				</ul>
			</div>
			<!-- Song Information / Album Art -->
			<div class='player-songinfo col-sm-8'>
				<img class='songinfo-image' src='img/blank-album.jpg' title='Album Art'/>
				<span class='songinfo-detail'>Song Name</span><br/>
				<span class='songinfo-detail'>Album Name</span><br/>
				<span class='songinfo-detail'>File Size</span><br/>
				<span class='songinfo-detail'>Duration</span><br/>
			</div>
		</div>
		<div class='row'>
			<!-- Music Player functions -->
			<div class='player-functions col-sm-12'>
				<!-- Previous Button -->
				<i class='fa fa-step-backward'></i>
				<!-- Play / Pause Button -->
				<i class='fa fa-play'></i>
				<!-- Next Button -->
				<i class='fa fa-step-forward'></i>
			</div>
		</div>
	</div>
	
	<!-- Load our scripts at the end -->
	<!-- Vue JS -->
	<script src="https://cdn.jsdelivr.net/npm/vue"></script>
	<!-- Logic.. -->
	<script src="js/main.js"></script>
</body>