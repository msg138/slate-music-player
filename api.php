<?php

	// Start by loading the INI configuration. This will contain information to control how the music player works.
	$config = parse_ini_file('config.ini', true);
	
	// Get our response ready.
	$response = 0;
	
	// Get our action from the supplied values
	$action = null;
	
	if(isset($_GET['a'])) {
		$action = $_GET['a'];
	}
	
	switch($action) {
		case 'list':
			// List the current files in our set music directory.
			$filesList = scandir($config['settings']['musicDir'], SCANDIR_SORT_DESCENDING);
			if(!$filesList) {
				// Something happened while attempting to scan directory.
				$response = ['error' => ['code' => 2, 'message' => 'Unable to get files in music directory.']];
			} else {
				$response = ['data' => array_diff($filesList, array('..', '.'))];
			}
			break;
		case 'info':
			// Get song information based on 's' being the song file name.
			if(!isset($_GET['s'])) 
				$response = ['error' => ['code' => 3, 'message' => 'No song / filename specified.']];
			else {
				// Use the getid3 library to obtain information.
				require_once('./getid3/getid3.php');
				$getID3 = new getID3;
				$response = ['data' => $getID3->analyze($config['settings']['musicDir'].$_GET['s'])];
			}
			break;
		case 'config':
			// Get a configuration option specified in config.ini
			if(!isset($_GET['o']))
				$response = ['error' => ['code' => 4, 'message' => 'No config option specified.']];
			else {
				$response = ['data' => $config['settings'][$_GET['o']]];
			}
			break;
		default:
			// Was not handled.
			break;
	}
	
	
	// At the end, if we have no response, means it was not handled properly. Invalid action.
	if($response == 0) {
		$response = [
			'error' => ['code' => -1, 'message' => 'Invalid action. Not handled.']
			];
	}
	
	// Output our response.
	echo json_encode($response);
?>