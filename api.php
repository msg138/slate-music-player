<?php

	// Start by loading the INI configuration. This will contain information to control how the music player works.
	$g_config = parse_ini_file('config.ini', true);
	
	// Get our response ready.
	$r_response = 0;
	
	// Get our action from the supplied values
	$a_action = null;
	
	if(isset($_GET['a'])) {
		$a_action = $_GET['a'];
	}
	
	switch($a_action) {
		case 'list':
			// List the current files in our set music directory.
			$t_filesList = scandir($g_config['settings']['musicDir'], SCANDIR_SORT_DESCENDING);
			if(!$t_filesList) {
				// Something happened while attempting to scan directory.
				$r_response = ['error' => ['code' => 2, 'message' => 'Unable to get files in music directory.']];
			} else {
				$r_response = ['data' => array_diff($t_filesList, array('..', '.'))];
			}
			break;
		case 'info':
			// Get song information based on 's' being the song file name.
			if(!isset($_GET['s'])) 
				$r_response = ['error' => ['code' => 3, 'message' => 'No song / filename specified.']];
			else {
				// Use the getid3 library to obtain information.
				require_once('./getid3/getid3.php');
				$getID3 = new getID3;
				$r_response = ['data' => $getID3->analyze($g_config['settings']['musicDir'].$_GET['s'])];
			}
			break;
		default:
			// Was not handled.
			break;
	}
	
	
	// At the end, if we have no response, means it was not handled properly. Invalid action.
	if($r_response == 0) {
		$r_response = [
			'error' => ['code' => -1, 'message' => 'Invalid action. Not handled.']
			];
	}
	
	// Output our response.
	echo json_encode($r_response);
?>