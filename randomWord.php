<?php
    $dbhandle = new PDO("sqlite:scrabble.sqlite") or die("Failed to open DB");
    if (!$dbhandle) die ($error);
 
    
    $query = "SELECT rack,words FROM racks order by random() limit 0,1";
    
    $statement = $dbhandle->prepare($query);
    $statement->execute();
  
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    // header('HTTP/1.1 200 OK');
    // header('Content-Type: application/json');
    
    foreach($results as $rack){
        $random_rack = $rack['rack'];
        $random_words =  $rack['words'];
        //echo $random_rack.' '.$random_words."\n";
    }
    //this creates json and gives it back to the bro
    //echo json_encode($results);
    
    $myrack = $random_rack;
    $racks = [];
    for($i = 0; $i < pow(2, strlen($myrack)); $i++){
    	$ans = "";
    	for($j = 0; $j < strlen($myrack); $j++){
    		//if the jth digit of i is 1 then include letter
    		if (($i >> $j) % 2) {
    		  $ans .= $myrack[$j];
    		}
    	}
    	if (strlen($ans) > 1){
      	    $racks[] = $ans;
    	}
    }
    $racks = array_unique($racks);
    
    $all_racks = "";
    foreach($racks as $r){
        if(strlen($r) > 1){
            $all_racks = $all_racks . "rack='" .$r . "' OR ";
        }
    }
    $all_racks = substr($all_racks, 0, -3);
    $query  = "SELECT WORDS FROM RACKS WHERE ".$all_racks;
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    $legal_words="";
    foreach($results as $rack){
        echo "\n";
        $legal_words = $legal_words . $rack['words'] . "@@";
    }
    $legal_words = substr($legal_words, 0, -2);
    $array =array(
        $random_rack => $legal_words
    );
    echo json_encode($array);
?>
