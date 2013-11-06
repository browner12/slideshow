slideshow
=========

html5 / jquery based slideshow that is simple and powerful

if you open up slideshow.php there are some instructions in there on configuration and such. should match most of whats below.

questions/comments feel free to drop me a line, and let me know if you end up using this anywhere, it’d be cool to see.

Files:
	slideshow.php
	slideshow.js
	slideshow.css

slideshow.php
	this is an example page. if you don’t have a php server you’ll have to remove all that code and simply use the HTML, which should work just fine.

	main points
	1.wrap everything in a class=‘slides’
		a. data-interval=‘x’ can be used to override default interval
	2.wrap individual slides in class=‘slide’
		a. id=‘x’ unique id needed for proper functioning.
		b. data-seconds=‘x’ determines how long we stay on this slide
		c. data-slide=‘x’ unique id needed for proper functioning, should match id
	3.any element can get a class=‘action’ which will cause it to appear after a set time
		a. data-seconds=‘x’ number of seconds it appears into current slide, not overall
		b. data-animation=‘x’ not working yet, but eventually will add new transitions. currently the default and fallback is ‘fade in’


slideshow.js
	most of the magic is in here. shouldn’t need to mess with much of it, unless you want to change some small things

slideshow.css
	i would suggest leaving any css that has to do with opacity alone.

	otherwise you’re free to mess with the look of anything. i’ve built a sleek set of controls, but definitely feel free to make them your own.

	there are some CSS transitions in here as well, so you can tweak timing with them as well.