require(['core/utils/FpsTracker', 'dom/primitives/Container', 'dom/readers/MouseReader', 'proj/Ball'], function(FpsTracker, Container, MouseReader, Ball) {
	var Master = function() {

		var init = function() {
            var spring = 0.2;
            var friction = 0.6;
            var gravity = 5;
            var balls = [];

            for (var i = 0; i < 15; i++) {
                var ball = new Ball({
                    radius: 20,
                    css: {
                        backgroundColor: '#FF0000',
                        position: 'absolute'
                    },
                    x: (window.innerWidth / 2),
                    y: (window.innerHeight / 2),
                    insert: {
                        type: 'parent',
                        target: document.body
                    }
                });

                balls.push(ball);
            }

			// Fps
			var fps = new FpsTracker();

			var container = new Container({
				css: {
					position: 'absolute',
					width: '100%',
					height: '100%'
				},
				insert: {
					type: 'parent',
					target: document.body
				}
			});

			var mr = new MouseReader(document.body, {
                callbacks: {
                    onMouseDown: function(){}
                }
            });

			var loop = function() {
				requestAnimationFrame(loop);
                var x = mr.getX();
                var y = mr.getY();
                var firstBall = balls[0];

                firstBall.vx += (x - firstBall.x) * spring;
                firstBall.vy += (y - firstBall.y) * spring;

                for (var i = 0, len = balls.length; i < len; i++) {
                    firstBall = balls[i];
                    if (i > 0) {
                        var nextBall = balls[i - 1];
                        firstBall.vx += (nextBall.x - firstBall.x) * spring;
                        firstBall.vy += (nextBall.y - firstBall.y) * spring;
                    }

                    firstBall.vy += gravity;
                    firstBall.vx *= friction;
                    firstBall.vy *= friction;
                    firstBall.set({
                        x: firstBall.x + firstBall.vx,
                        y: firstBall.y + firstBall.vy
                    });
                }

                fps.update();
			};

			requestAnimationFrame(loop);
		};

		init();

	}; // End
	var master = new Master();
});

