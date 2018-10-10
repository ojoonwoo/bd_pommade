<?
/*
*
*	php function
*
*/
class mnv_function extends mnv_dbi
{
	var $winner_flag;

	var $script; //-- 페이지관련 자바스크립트

	
	public function InsertTrackingInfo($gubun)
	{
		global $my_db;
		$log_query	= "INSERT INTO tracking_info(tracking_media, tracking_refferer, tracking_ipaddr, tracking_date, tracking_gubun) values('".$_SESSION['ss_media']."','".$_SERVER['HTTP_REFERER']."','".$_SERVER['REMOTE_ADDR']."',now(),'".$gubun."')";
		$q_result 	= mysqli_query($my_db, $log_query);

		return $log_query;
	}

	public function MobileCheck()
	{
		$mobile_agent = array("iPhone","iPod","iPad","Android","Blackberry","SymbianOS|SCH-M\d+","Opera Mini", "Windows ce", "Nokia", "sony" );
		$check_mobile = "PC";

		for($i=0; $i<sizeof($mobile_agent); $i++){
			if(stripos( $_SERVER['HTTP_USER_AGENT'], $mobile_agent[$i] )){
				$check_mobile = "MOBILE";
				break;
			}
		}
		return $check_mobile;
	}

	public function IPhoneCheck()
	{
        if(stripos( $_SERVER['HTTP_USER_AGENT'], "iPhone" ))
        	$iPhone	    = "Y";
        else
        	$iPhone	= "N";
        return $iPhone;
	}
	public function BrowserCheck()
	{
        if(stripos( $_SERVER['HTTP_USER_AGENT'], "MSIE 8" ) || stripos( $_SERVER['HTTP_USER_AGENT'], "MSIE 9" ))
        	$OB	    = "Y";
        else
        	$OB	= "N";
        return $OB;
	}
	public function IECheck()
	{
        if(stripos( $_SERVER['HTTP_USER_AGENT'], "MSIE" ) || stripos( $_SERVER['HTTP_USER_AGENT'], "Trident" ))
        	$IE	    = "Y";
        else
        	$IE	= "N";
        return $IE;
	}
	public function SafariCheck()
	{
        if(stripos( $_SERVER['HTTP_USER_AGENT'], "MSIE" ) || stripos( $_SERVER['HTTP_USER_AGENT'], "Chrome" ) || stripos( $_SERVER['HTTP_USER_AGENT'], "Trident" ))
        	$Safari	    = "N";
        else
        	$Safari	= "Y";
        return $Safari;
	}

	public function SaveMedia()
	{
		$_SESSION['ss_media']		= $_REQUEST['media'];
	}
	public function mytory_asterisk($string) 
	{
		$string = trim($string);
		$length = mb_strlen($string, 'utf-8');
		$string_changed = $string;
		if ($length <= 2) {
			// 한두 글자면 그냥 뒤에 별표 붙여서 내보낸다.
			$string_changed = mb_substr($string, 0, 1, 'utf-8') . '○';
		}
		if ($length >= 3) {
			// 3으로 나눠서 앞뒤.
			$leave_length = floor($length/3); // 남겨 둘 길이. 반올림하니 너무 많이 남기게 돼, 내림으로 해서 남기는 걸 줄였다.
			$asterisk_length = $length - ($leave_length * 2);
			$offset = $leave_length + $asterisk_length;
			$head = mb_substr($string, 0, $leave_length, 'utf-8');
			$tail = mb_substr($string, $offset, $leave_length, 'utf-8');
			$string_changed = $head . implode('', array_fill(0, $asterisk_length, '○')) . $tail;
		}
		return $string_changed;
	}
	    

}
