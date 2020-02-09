// declare actors here
const backFallingLeaves = document.querySelectorAll(['#brownLeaf', '#orangeLeaf', '#redLeaf'])
const textLine1 = document.querySelectorAll('.text-line-1');
const textLine2 = document.querySelectorAll('.text-line-2');
const textGreeting = document.querySelectorAll('.text-greeting');
const treeLeaves = document.querySelectorAll('[id^=treeleaf]');
const floorLeaves = document.querySelectorAll('[id^=floorleaf]');
const bird = document.querySelectorAll('#Bird');
const birdHat = document.querySelector('#BirdHat');
const birdEyes = document.querySelectorAll(['#leftEye', '#rightEye']);
const nest = document.querySelectorAll('#NestAndLeaves');
const tree = document.querySelectorAll('#tree_trunk');
const cardContainer = document.querySelector('.card.container');
const body = document.querySelector('body')

const showContainer = () => {
	cardContainer.style.display = 'block';
};

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
);

const startBlinking = () => {
	new TimelineMax({ repeat: -1, repeatDelay: 5 })
		.set(birdEyes, { autoAlpha: 0 })
		.set(birdEyes, { autoAlpha: 1 }, '+=0.2')
		.set(birdEyes, { autoAlpha: 0 }, '+=1.2')
		.set(birdEyes, { autoAlpha: 1 }, '+=0.2')
};

// enter tree
const enterTreeStuff = () => (
	new TimelineMax()
		.staggerFromTo(
			treeLeaves,
			0.5,
			{ scale: 0.2, autoAlpha: 0, transformOrigin: 'center bottom' },
			{ scale: 1, autoAlpha: 1, transformOrigin: 'center bottom' },
			0.02,
		)
		.fromTo(
			nest,
			1,
			{ y: 0, scale: 0.2, autoAlpha: 0, transformOrigin: 'bottom center' },
			{ y: '-=15', scale: 1, autoAlpha: 1, transformOrigin: 'bottom center', ease: Elastic.easeOut },
			'-=0.1'
		)
		.to(nest, 0.3, { y: '+=15', ease: Bounce.easeOut }, '-=0.1')
		.add('nest-pop-in')
		.set(birdHat, { rotation: 12, x: '+=6' })
		.to(bird, 1.4, { y: '-=39', autoAlpha: 1, ease: Power4.easeInOut }, 'nest-pop-in += 0.2')
		.add('bird-pop-in')
		.set(birdEyes, { autoAlpha: 0 })
		.set(birdEyes, { autoAlpha: 1 }, '+=0.2')
		.set(birdEyes, { autoAlpha: 0 }, '+=0.3')
		.set(birdEyes, { autoAlpha: 1 }, '+=0.2')
		.add('bird-blinks')
		.to(bird, 0.8, { y: '-=34', ease: Power4.easeInOut })
		.to(bird, 0.3, { y: '+=8', ease: Back.easeOut })
		.to(birdHat, 0.4, { y: '-=12' }, '-=0.6')
		.to(birdHat, 0.3, { y: 0, rotation: 0, x: 0, onComplete: startBlinking }, '-=0.2')
);

const startLoops = () => {
	const colors = ['#edcc93', '#f7e3ae', '#f3ebcc', '#edcc93'];
	new TimelineMax({ repeat:-1, repeatDelay:3, yoyo:true })
		.to(body, 3, { backgroundColor: colors[0]})
		.to(body, 3, { backgroundColor: colors[1]}, '+=3')
		.to(body, 3, { backgroundColor: colors[2]}, '+=3')
		.to(body, 3, { backgroundColor: colors[3] }, '+=3')


	const repeatFall = (leafID) => {
		const range = Math.random() * 800;
		const offSet = 400;
		const newXPos = range - offSet;
		TweenMax.set(leafID, { x: newXPos, y: -100, autoAlpha: 0.2, rotation: Math.random() * 360 })
		TweenMax.to(leafID, 10 + Math.random() * 10, { y: '+=1200', autoAlpha: 1, ease: Linear.easeNone, onComplete: repeatFall, onCompleteParams: [leafID] })
	};
	backFallingLeaves.forEach(leaf => repeatFall(`#${leaf.id}`));
};

// enter the greeting text
const enterGreeting = () => (
	new TimelineMax()
		.fromTo(textLine1, 1, { y: '-=50', autoAlpha: 0 }, { y: '0', autoAlpha: 1, onComplete: startLoops })
		.fromTo(textLine2, 1, { y: '-=25', autoAlpha: 0 }, { y: '0', autoAlpha: 1 })
		.staggerFromTo(
			textGreeting,
			0.5,
			{ scale: 2, autoAlpha: 0, transformOrigin: 'center center' },
			{ scale: 1, autoAlpha: 1, transformOrigin: 'center center' },
			0.1
		)
);

// the GO function ...to kick things all off

const go = () => (
	new TimelineMax()
		.add(clearStage(), 'scene-clear-stage')
		.add(enterFloorVegetation(), 'scene-floor-vegetatation')
		.add(enterTreeStuff(), 'scene-enter-treestuff')
		.add(enterGreeting(), 'scene-greeting')
)

go();
