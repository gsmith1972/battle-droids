<script type="text/javascript">
document.addEventListener("DOMContentLoaded", function(event) {
	 canvasApp();
});

let canvasApp = () => {
	// let canvas = document.getElementById("ship");
	// let context = canvas.getContext("2d");

	let rotation = 0;
	let x = 50;
	let y = 50;
	let facingX = 0;
	let facingY = 0;
	let movingX = 0;a
	let movingY = 0;
	let width = 30;
	let height = 30;
	let W = width/2;
	let H = height/2;
	let rotationalVelocity = 5; //how many degrees to turn the ship
	let thrust = .03;
	let map = [];
	let canvasWidth = canvas.width;
	let canvasHeight = canvas.height;

	let shipState = 0; //0 = static, 1 = thrust

	let drawCanvas = () => {
		// background
		context.fillStyle = '#000000';
		context.fillRect(0, 0, canvasWidth, canvasHeight);
		context.fillStyle = '#ffffff';

		//  transform
		let radians = convertToRadians(rotation);
		context.save();    // save the current stack
		context.setTransform(1,0,0,1,0,0); //  reset to identity

		//  canvas origin Player center
		context.translate(x+W,y+H);
		context.rotate(radians);

		//drawShip
		context.strokeStyle = '#ffffff';
		context.beginPath();

		// draw the ship
		// set rotation to image center
		context.moveTo(-15,-15);
		context.lineTo(15,0);
		context.moveTo(15,1);
		context.lineTo(-15,15);
		context.lineTo(1,1);
		context.moveTo(1,-1);
		context.lineTo(-15,-15);

		context.lineWidth=2;
		context.stroke();
		context.closePath();

		//  restore context
		context.restore();

		//update the shipState
		shipState++;
		if (shipState==1) {
			//draw thrust
			context.moveTo(8,13);
			context.lineTo(11,13);
			context.moveTo(9,14);
			context.lineTo(9,18);
			context.moveTo(10,14);
			context.lineTo(10,18);
		}
		if (shipState >1) {
			 shipState=0;
		}
	}

	let incrementAngle = () => {
		angle += 5;
		if(angle > 360){
			angle = 0;
		}
	}
	let decrementAngle = () => {
		angle -= 5;
		if(angle > 360){
			angle = 0;
		}
	}

	let convertToRadians = (degree) => {
		return degree*(Math.PI/180);
	}

	// let boundry = () => {
	// 	if (x<=0) x=0;
	// 	if (y<=0) y=0;
	// 	if (x >= canvas.width - width*2)
	// 		x = canvas.width - width*2;
	// 	if (y >= canvas.height - height*2)
	// 		y = canvas.height - height*2;
	// }

	//  create game loop
	// const FRAMES_PER_SECOND = 40;
	// let frameTime = 1000/FRAMES_PER_SECOND;
	setInterval(function () {
		drawCanvas();
		boundry();
		keyPress();
	}, frameTime );

	document.onkeydown = (e) => {
		e = e?e:window.event;
		map[e.keyCode] = true;
	}

	document.onkeyup = (e) => {
		e = e?e:window.event;
		map[e.keyCode] = false;
	};

	let keyPress = () => {
	 if (map[38] == true) {
		 let radians = rotation * Math.PI/180;
		 facingX = Math.cos(radians);
		 facingY = Math.sin(radians);

		 movingX = movingX + thrust*facingX;
		 movingY = movingY + thrust*facingY;
	 }

	 if (map[37]==true) {
		 //  decrementAngle
		 rotation -= rotationalVelocity;
	 }

	 if (map[39]==true) {
			// incrementAngle
		rotation += rotationalVelocity;
		}

	 x = x + movingX;
	 y = y + movingY;
	}
}
// requestAnim shim layer by Paul Irish
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		window.oRequestAnimationFrame      ||
		window.msRequestAnimationFrame     ||
		function(/* function */ callback, /* DOMElement */ element){
			window.setTimeout(callback, 1000 / 250);
		};
})();

</script>
