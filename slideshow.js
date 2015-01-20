/**
 * slideshow javascript
 *
 * @author Andrew Brown <browner12@gmail.com>
 * @version 1.0
 * @copyright Andrew Brown 2015
 */

$(document).ready(function(){

	//hover controls
	$(".overlay").hover(
	
		//mouseenter
		function(){
			
			//stop current animations and fade in
			$(".overlay").stop(true).fadeTo('fast', 1);
			
		},
		
		//mouseleave
		function(){
			
			//stop current animations and fade out
			$(".overlay").stop(true).delay(2000).fadeTo(1000, 0);
		}
	);
	
	//global variables
	var currentSecond = 0;
	var totalSeconds = 0;
	var currentSlide = 1;
	var totalSlides = $(".slide").length;
	var status = 'pause';
	var timerId = null;
	var defaultInterval = $("#slides").data('interval');
	
	//global objects
	var timingProfile = new Array();
	var firingProfile = new Array();
	
	//timing profile and total seconds
	$(".slide").each(function(){
	
		//get slide number and seconds
		var localSlide = $(this).data('slide');
		var localSeconds = $(this).data('seconds');
		
		//use default interval if no seconds set
		if(isNaN(localSeconds)){
			localSeconds = defaultInterval;
		}
		
		//add to timing profile
		timingProfile[totalSeconds] = localSlide;
		
		//check for any actions
		$(".action", this).each(function(){
		
			//get id
			var localActionId = $(this).attr('id');
			
			//get seconds
			var localActionSeconds = $(this).data('seconds');
			
			//get animation
			var localActionAnimation = $(this).data('animation');
			
			//calculate fire time
			var localActionFireTime = totalSeconds + localActionSeconds;
			
			//reset action
			action = null;
			action = new Array();
			
			//set action
			action['id'] = localActionId;
			action['animation'] = localActionAnimation;
			
			//set firing profile
			firingProfile[localActionFireTime] = action;
		});
		
		//add on to totalSeconds
		totalSeconds += localSeconds;
	});
	
	//initialize totals
	$("#totalTime").html(timeFromSeconds(totalSeconds));
	$("#totalSlides").html(totalSlides);
	
	//initialize currents
	updateTime();
	updateSlide();
	updateProgress();
	$("#slide1").addClass('active');
	
	//reset
	$("#reset").click(function(){
		pause();
		goToSlide(1);
	});
	
	//previous
	$("#previous").click(function(){
		pause();
		goToSlide(currentSlide - 1);
	});
	
	//keypress
	$(document).keydown(function(e){
	
		//left
		if(e.which == 37){
			console.log('left');
			goToSlide(currentSlide - 1);
			e.preventDefault();
		}
		
		//right
		else if(e.which == 39){
			console.log('right');
			goToSlide(currentSlide + 1);
			e.preventDefault();
		}
		
		//space
		else if(e.which == 32){
			console.log('space');
			toggle();
			e.preventDefault();
		}
		
	});
	
	//play/pause
	$("#play").click(function(){
		toggle();
	});
	
	//next
	$("#next").click(function(){
		pause();
		goToSlide(currentSlide + 1);
	});
	
	//progress bar click
	$("#progress").click(function(e){
	
		//get properties
		var position = $(this).offset();
		var width = $(this).width();
		var mouse = e.clientX;
		
		//calculate percentage
		var percentage = (mouse - position.left) / (width - 1);
		
		//calculate second we should go to
		newSecond = Math.round(percentage * totalSeconds);
		
		//go to new second
		goToSecond(newSecond);
	});
	
	//go to slide
	function goToSlide(newSlide){
	
		//log
		console.log('New Slide: ' + newSlide);
	
		//in range
		if(newSlide >= 1 && newSlide <= totalSlides){
		
			//hide current
			$("#slide" + currentSlide).removeClass('active');
			
			//set current slide
			currentSlide = newSlide;
			
			//show new
			$("#slide" + currentSlide).addClass('active');
			
			//update time, slide, and progress
			updateTimeBySlide(currentSlide);
			updateSlide();
			updateProgress();
		}
		
		//out of range
		else{
			
			//hmm.... should we do anything?
			console.log('New slide out of range.');
		}
		
		//rehide all actions
		$(".action").fadeTo(0,0);
	}
	
	//calculate slide from second
	function goToSecond(newSecond){
	
		//local placeholder	
		var temp;
		
		//determine new slide
		for(index in timingProfile){
			temp = newSecond - index;
			if(temp < 0){
				break;
			}
			newSlide = timingProfile[index];
		}
		
		//in range
		if(newSecond >= 0 && newSecond <= totalSeconds){
		
			//hide current
			$("#slide" + currentSlide).removeClass('active');
			
			//set current second
			currentSecond = newSecond;
			
			//set current slide
			currentSlide = newSlide;
			
			//show new
			$("#slide" + currentSlide).addClass('active');
			
			//update time, slide, and progress
			updateTime();
			updateSlide();
			updateProgress();
		}
		
		//out of range
		else{
			
			//hmm.... should we do anything?
			console.log('New slide out of range.');
		}
	}
	
	/**
	 * play/pause toggle
	 */
	function toggle(){
	
		//pause
		if(status == 'play'){
			pause();
		}
		
		//play
		else if(status == 'pause'){
			play();
		}
		
		//reset
		else if(status == 'end'){
			goToSlide(1);
			play();
		}
	}
	
	/**
	 * play
	 */
	function play(){
	
		//prevent calling this if status is already play. doing so will cause it to run at double speed.
		if(status != 'play'){
		
			//change status
			status = 'play';
			
			//change icon
			$("#play").html('<i class="fa fa-pause"></i>');
			
			//start timer
			timerId = setInterval(function(){
				
				//in range
				if(currentSecond >= 0 && currentSecond < totalSeconds){
				
					//increment
					currentSecond++;
					
					//log
					console.log('Timer: ' + currentSecond);
					
					//update progress
					updateProgress();
					
					//go to slide based on timing profile
					if(timingProfile[currentSecond] && timingProfile[currentSecond] != currentSlide){
						goToSlide(timingProfile[currentSecond]);
					}
					
					//fire action
					if(firingProfile[currentSecond]){
						fire(firingProfile[currentSecond].id, firingProfile[currentSecond].animation);
					}
				}
				
				//out of range
				else{
				
					//kill timer
					clearInterval(timerId);
					
					//change status and icon
					pause();
					status = 'end';
					
					//show overlay
					$(".overlay").delay(5000).fadeTo('fast', 1);
				}
				
				//update
				updateTime();
				
			}, 1000);
		}
		
		//log message
		else{
			console.log('Already playing. Do not call again.');
		}
	}
	
	/**
	 * pause
	 */
	function pause(){
	
		//log
		console.log('Status: pause');
		
		//change status
		status = 'pause';
		
		//change icon
		$("#play").html('<i class="fa fa-play"></i>');
		
		//stop timer
		clearInterval(timerId);
	}
	
	/**
	 * fire an action
	 *
	 * @param int $id
	 * @param string $animation
	 */
	function fire(id, animation){
	
		//log
		console.log('Fired: ' + id + ', Animation: ' + animation);
	
		//throw new animations in here
		if(animation == 'newAnimation'){
		}
		
		//default fade to
		else{
			$("#" + id).fadeTo('fast', 1);
		}
	}
	
	/**
	 * update progress based on time
	 *
	 * takes the currentSecond, calculates the percentage completed, and updates the display
	 */
	function updateProgress(){
	
		//determine percent
		progress = (currentSecond / totalSeconds) * 100;
		
		//update progress
		$("#bar").width(progress + '%');
	}
	
	/**
	 * update slides
	 *
	 * takes the slide we are on, and updates the display
	 *
	 * @param int globalVar
	 */
	function updateSlide(){
	
		//update
		$("#currentSlide").html(currentSlide);
	}
	
	/**
	 * update time by slide
	 *
	 * takes the slide/slide we are on, calculates the seconds, and updates the display
	 * this is mostly used for syncing the actual timer
	 *
	 * @param int $newSlide
	 */
	function updateTimeBySlide(newSlide){
	
		//in range
		if(newSlide > 0 && newSlide <= totalSlides){
			currentSecond = timingProfile.indexOf(newSlide);
		}
		
		//out of range
		else{
			currentSecond = 0;
		}
		
		console.log('Current Second: ' + currentSecond);
		
		updateTime();
	}
	
	/**
	 * update time
	 *
	 * takes the number of seconds we are at
	 *
	 * @param int globalVar
	 */
	function updateTime(){
		
		//update
		$("#currentTime").html(timeFromSeconds(currentSecond));
	}
	
	/**
	 * time from seconds
	 *
	 * returns formatted time from total seconds
	 *
	 * @param int $input
	 */
	function timeFromSeconds(input){
	
		//vars
		var hours = Math.floor(input / 3600);
		var minutes = Math.floor((input - (hours * 3600)) / 60);
		var seconds = input - (hours * 3600) - (minutes * 60);
		
		//hours
		if(hours < 10){
			hours = "0" + hours;
		}
		
		//minutes
		if(minutes < 10){
			minutes = "0" + minutes;
		}
		
		//seconds
		if(seconds < 10){
			seconds = "0" + seconds;
		}
		
		//return
		if(hours != 0){
			return hours + ":" + minutes + ":" + seconds;
		}
		else{
			return minutes + ":" + seconds;
		}
		
	}
});