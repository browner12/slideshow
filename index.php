<!DOCTYPE html>
<html>
<head>
<title>Awesome Slideshow Script</title>

<!--css-->
<link rel="stylesheet" type="text/css" href="slideshow.css" />
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
<link rel="stylesheet" type="text/css" href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css">

<!--javascript-->
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
<script type="text/javascript" src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script type="text/javascript" src="slideshow.js"></script>

</head>
<body>

<?php
function fireId(){

	static $a = 0;
	$a++;
	return "fire".$a;
}

function slideId($new = FALSE){
	static $b = 0;
	
	if($new){
		$b++;
	}
	return $b;
}
?>

<!--slides-->
<section id="slides" data-interval="<?php echo $interval; ?>">

	<!--starting slide-->
	<section class="slide" id="slide<?php echo slideId(1); ?>" data-seconds="10" data-slide="<?php echo slideId(); ?>">
	</section>
	
	<!--content-->
	<section class="slide" id="slide<?php echo slideId(1); ?>" data-seconds="10" data-slide="<?php echo slideId(); ?>">
	
		<div>Put any content you want in a slide. Style it any way you want. Just leave the &lt;section&gt; tags alone. The 'slide' class will handle all the stuff you should need there. </div>
		
		<div>How you get the data in is up to you. It could all be hard coded. I personally prefer PHP, which also makes keeping track of your unique IDs a little easier.</div>
		
		<div>Adding timed actions is easy. Simply add the 'action' class to the element, add a unique 'id', and a 'data-seconds' attribute. You can also add a 'data-animation' but I only have 'FADE IN' programmed right now, and it's the default, so don't worry about changing it now.</div>
		
		<div class="action" id="<?php echo fireId(); ?>" data-seconds="2" data-animation="">This action fires 2 seconds into the slide.</div>
		<div class="action" id="<?php echo fireId(); ?>" data-seconds="4" data-animation="">This action fires 4 seconds into the slide.</div>
		<div class="action" id="<?php echo fireId(); ?>" data-seconds="6" data-animation="">This action fires 6 seconds into the slide.</div>
		
	</section>
		
	<!--ending slide-->
	<section class="slide" id="slide<?php echo slideId(1); ?>" data-seconds="0" data-slide="<?php echo slideId(); ?>">
	</section>

</section>

<!--overlay-->
<div class="overlay">

	<!--back button-->
	<div class="backButton"><a href="#">Back</a></div>


	<!--bottom control-->
	<div class="bottomControl">
	
		<!--progress bar-->
		<div class="progress">
			<div class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width:0%;"></div>
		</div>
		
		<div class="progress progress-success" id="progress"><div class="bar" id="bar" style="width:0%; "></div></div>
	
		<!--controls-->
		<div class="controls" id="controls">
	
				<!--left stuff-->	
				<div class="left">
	
					<!--buttons-->
					<div class="btn-group">
					
						<!--reset-->
						<button class="btn" id="reset" title="First Slide"><i class="icon-fast-backward"></i></button>
						
						<!--previous-->
						<button class="btn" id="previous" title="Previous Slide"><i class="icon-backward"></i></button>
						
						<!--play/pause-->
						<button class="btn" id="play" title="Play/Pause"><i class="icon-play"></i></button>
						
						<!--next-->
						<button class="btn" id="next" title="Next Slide"><i class="icon-forward"></i></button>
						
					</div>
					
					<!--title-->
					<div style="display:inline-block; "><?php echo 'This is the title'; ?></div>
					
				</div><!--right stuff--><div class="right">
				
					<!--time-->
					<div style="display:inline-block; "><span id="currentTime"></span> | <span id="totalTime"></span></div>
					
					<!--slides-->
					<div style="display:inline-block; margin-left:10px; "><span id="currentSlide"></span> | <span id="totalSlides"></span></div>
					
				</div>
				
		</div>
		
	</div>
</div>

</body>
</html>