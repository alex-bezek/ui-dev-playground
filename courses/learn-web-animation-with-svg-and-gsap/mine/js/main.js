/*  Autumn Greeting Card -- js */

(function($){
	'use strict';

	// declare actors here
	const backFallingLeaves = document.querySelectorAll(['#brownLeaf', '#orangeLeaf', '#redLeaf'])
	const textLine1 = document.querySelectorAll('.text-line-1');
	const textLine2 = document.querySelectorAll('.text-line-2');
	const textGreeting = document.querySelectorAll('.text-greeting');
	const treeLeaves = document.querySelectorAll('[id^=treeleaf]');
	const floorLeaves = document.querySelectorAll('[id^=floorleaf]');
	const bird = document.querySelectorAll('#Bird');
	const birdHat = document.querySelector('#BirdHat');
	const birdEyes = document.querySelector('#leftEye, #rightEye');
	const nest = document.querySelectorAll('#NestAndLeaves');
	const tree = document.querySelectorAll('#tree_trunk');
	const cardContainer = document.querySelector('.card.container');

	const showContainer = () => {
		cardContainer.style.display = 'block';
	}


	// clear stage
	const clearStage = () => (
		new TimelineMax()
			.set(backFallingLeaves, { autoAlpha: 0 })
			.set(textLine1, { autoAlpha: 0 })
			.set(textLine2, { autoAlpha: 0 })
			.set(textGreeting, { autoAlpha: 0 })
			.set(treeLeaves, { autoAlpha: 0 })
			.set(bird, { y: '+=65' })
			.set(nest, { autoAlpha: 0 })
			.set(tree, { autoAlpha: 0 })
			.set(floorLeaves, { y: '+=275', onComplete: showContainer })
	)

	// enter floor vegetation
	const enterFloorVegetation = () => (
		new TimelineMax()
			.staggerTo(floorLeaves, 1, { y: 0, ease: Back.easeOut }, 0.01)
			.fromTo(
				tree,
				1.1,
				{ scaleY: 0.2, autoAlpha: 0, transformOrigin: 'center bottom', ease: Back.easeInOut },
				{ scaleY: 1, autoAlpha: 1, transformOrigin: 'center bottom', ease: Back.easeInOut }
			)
			.fromTo(
				tree,
				0.9,
				{ scaleX: 0.2, autoAlpha: 0, transformOrigin: 'center bottom', ease: Back.easeInOut },
				{ scaleX: 1, autoAlpha: 1, transformOrigin: 'center bottom', ease: Back.easeInOut },
				'-=0.9'
			)
	)

	// enter tree

	// enter the greeting text

	// the GO function ...to kick things all off

	const go = () => (
		new TimelineMax()
			.add(clearStage(), 'scene-clear-stage')
			.add(enterFloorVegetation(), 'scene-floor-vegetatation')
	)

	go();

})(jQuery);


