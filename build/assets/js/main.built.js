
define('dom/utils/DomSniper',[],function() {
    var DomSniper = {};

    DomSniper.appendChild = function(base, target) {
        base.appendChild(target);
    };

    return DomSniper;
});

/**
 * @class
 * @name dom.utils.CssMixins
*/
define('dom/mixins/CssMixins',[],function() {
	var CssMixins = function() {};

	/**
     * @name dom.utils.CssMixins#transform
     * @function
     * @static
     * @param {} el
     * @param {} options
    */
	CssMixins.transform = function(options) {
		var formatted = (options.rotateX !== undefined ? ' rotateX(' + options.rotateX + 'deg)': '') + (options.rotateY !== undefined ? ' rotateY(' + options.rotateY + 'deg)': '') + (options.rotateZ !== undefined ? ' rotateZ(' + options.rotateZ + 'deg)': '') + (options.translateX !== undefined ? ' translateX(' + options.translateX + 'deg)': '') + (options.translateY !== undefined ? ' translateY(' + options.translateY + 'deg)': '') + (options.translateZ !== undefined ? ' translateZ(' + options.translateZ + 'deg)': '');

		return {
			mozTransform: formatted,
			OTransform: formatted,
			WebkitTransform: formatted,
			msTransform: formatted,
			transform: formatted
		}
	};

	/**
     * @name dom.utils.CssMixins#alpha
     * @function
     * @static
     * @param {} el
     * @param {} alpha
    */
	CssMixins.alpha = function(value) {
		return {
			opacity: value,
			filter: 'alpha(opacity=' + value * 100 + ')'
		}
	};

	CssMixins.rotate = function(value) {
		return {
			WebkitTransform: 'rotate(' + value + 'deg)',
			mozTransform: 'rotate(' + value + 'deg)',
			msTransform: 'rotate(' + value + 'deg)',
			OTransform: 'rotate(' + value + 'deg)',
			transform: 'rotate(' + value + 'deg)'
		}
	};

	return CssMixins;
});


/**
 * @class
 * @name dom.primitives.Elem
 * @param {} options
*/
define('dom/primitives/Elem',['dom/utils/DomSniper', 'dom/mixins/CssMixins'], function(DomSniper, CssMixins) {
    var Elem = function(options) {
        var self = this;
        options = options || {};

        // Element detection
        var getEl = function() {
            if (options.el) {
                return options.el;
            } else if (options.type) {
                return document.createElement(options.type);
            } else {
                return document.createElement('div');
            }
        };

        this.el = getEl();

        var setSpecial = function(key, value) {
            switch(key) {
                case 'x':
                    setCss({
                        left: value + 'px'
                    });
                    break;
                case 'y':
                    setCss({
                        top: value + 'px'
                    });
                    break;
                case 'width':
                    setCss({
                        width: value
                    });
                    break;
                case 'height':
                    setCss({
                        height: value
                    });
                    break;
                case 'rotation':
                    setCss(CssMixins.rotate(value));
                    break;
            }

            self[key] = value;
        };

        var setCss = function(options) {
            for (var css in options) {
                self.el.style[css] = options[css];
            }
        };

        this.appendChild = function(target) {
            DomSniper.appendChild(self.el, target);
        };

        this.appendTo = function(target) {
            target.appendChild(self.el);
        };
        
        this.set = function(options) {
            // Attributes
            if (options.attr) {
                for (var attr in options.attr) {
                    var prop = attr === 'className' ? 'class' : attr; // need className because 'class' is reserved
                    self.el.setAttribute(prop, options.attr[attr]);
                }
            }

            if (options.css) {
                setCss(options.css);
            }

            for (var o in options) {
                switch (o) {
                    case 'el':
                    case 'attr':
                    case 'css':
                        break;

                    default:
                        setSpecial(o, options[o]);
                        break;
                }
            }
        };

        this.set(options);

        // Appending
        this.insert = function(type, target) {
            switch (type) {
                case 'child':
                    DomSniper.appendChild(self.el, target);
                    break;
                case 'parent':
                    DomSniper.appendChild(target, self.el);
                    break;
            }
        };

        // Add this to init phase
        if (options.insert) {
            this.insert(options.insert.type, options.insert.target);
        }
    };

    return Elem;
});

// stats.js r8 - http://github.com/mrdoob/stats.js
var Stats=function(){var h,a,n=0,o=0,i=Date.now(),u=i,p=i,l=0,q=1E3,r=0,e,j,f,b=[[16,16,48],[0,255,255]],m=0,s=1E3,t=0,d,k,g,c=[[16,48,16],[0,255,0]];h=document.createElement("div");h.style.cursor="pointer";h.style.width="80px";h.style.opacity="0.9";h.style.zIndex="10001";h.addEventListener("mousedown",function(a){a.preventDefault();n=(n+1)%2;n==0?(e.style.display="block",d.style.display="none"):(e.style.display="none",d.style.display="block")},!1);e=document.createElement("div");e.style.textAlign=
"left";e.style.lineHeight="1.2em";e.style.backgroundColor="rgb("+Math.floor(b[0][0]/2)+","+Math.floor(b[0][1]/2)+","+Math.floor(b[0][2]/2)+")";e.style.padding="0 0 3px 3px";h.appendChild(e);j=document.createElement("div");j.style.fontFamily="Helvetica, Arial, sans-serif";j.style.fontSize="9px";j.style.color="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";j.style.fontWeight="bold";j.innerHTML="FPS";e.appendChild(j);f=document.createElement("div");f.style.position="relative";f.style.width="74px";f.style.height=
"30px";f.style.backgroundColor="rgb("+b[1][0]+","+b[1][1]+","+b[1][2]+")";for(e.appendChild(f);f.children.length<74;)a=document.createElement("span"),a.style.width="1px",a.style.height="30px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+b[0][0]+","+b[0][1]+","+b[0][2]+")",f.appendChild(a);d=document.createElement("div");d.style.textAlign="left";d.style.lineHeight="1.2em";d.style.backgroundColor="rgb("+Math.floor(c[0][0]/2)+","+Math.floor(c[0][1]/2)+","+Math.floor(c[0][2]/2)+")";d.style.padding=
"0 0 3px 3px";d.style.display="none";h.appendChild(d);k=document.createElement("div");k.style.fontFamily="Helvetica, Arial, sans-serif";k.style.fontSize="9px";k.style.color="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";k.style.fontWeight="bold";k.innerHTML="MS";d.appendChild(k);g=document.createElement("div");g.style.position="relative";g.style.width="74px";g.style.height="30px";g.style.backgroundColor="rgb("+c[1][0]+","+c[1][1]+","+c[1][2]+")";for(d.appendChild(g);g.children.length<74;)a=document.createElement("span"),
a.style.width="1px",a.style.height=Math.random()*30+"px",a.style.cssFloat="left",a.style.backgroundColor="rgb("+c[0][0]+","+c[0][1]+","+c[0][2]+")",g.appendChild(a);return{domElement:h,update:function(){i=Date.now();m=i-u;s=Math.min(s,m);t=Math.max(t,m);k.textContent=m+" MS ("+s+"-"+t+")";var a=Math.min(30,30-m/200*30);g.appendChild(g.firstChild).style.height=a+"px";u=i;o++;if(i>p+1E3)l=Math.round(o*1E3/(i-p)),q=Math.min(q,l),r=Math.max(r,l),j.textContent=l+" FPS ("+q+"-"+r+")",a=Math.min(30,30-l/
100*30),f.appendChild(f.firstChild).style.height=a+"px",p=i,o=0}}};


define("libs/three.js/stats", function(){});

/**
 * @class
 * @name core.utils.FpsTracker
 * @requires stats.js
*/
define('core/utils/FpsTracker',['dom/primitives/Elem', 'dom/utils/DomSniper', 'libs/three.js/stats'], function(Elem, DomSniper) {
    var FpsTracker = function() {
        var self = this;
        Elem.call(this);

        // add Stats.js - https://github.com/mrdoob/stats.js
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.bottom = '0px';
        DomSniper.appendChild(document.body, this.stats.domElement);
    };

    FpsTracker.prototype.update = function() {
        this.stats.update();
    };

    return FpsTracker;
});

define('dom/primitives/Container',['dom/primitives/Elem', 'dom/utils/DomSniper'], function(Elem, DomSniper) {
	var Container = function(options) {
		Elem.call(this, options);
	};

	return Container;
});

define('dom/readers/MouseReader',[],function() {
	var MouseReader = function(el, options) {
		// Detect if the browser is IE or not.
		// If it is not IE, we assume that the browser is NS.
		var IE = document.all ? true: false

		// If NS -- that is, !IE -- then set up for mouse capture
		//if (!IE) document.captureEvents(Event.MOUSEMOVE)

		// Temporary variables to hold mouse x-y pos.s
		var tempX = 0
		var tempY = 0

		// Main function to retrieve mouse x-y pos.s
		this.getMouseXY = function(evt) {
			if (IE) { // grab the x-y pos.s if browser is IE
				tempX = evt.clientX + document.body.scrollLeft
				tempY = evt.clientY + document.body.scrollTop
			} else { // grab the x-y pos.s if browser is NS
				tempX = evt.pageX
				tempY = evt.pageY
			}
			// catch possible negative values in NS4
			if (tempX < 0) {
				tempX = 0
			}
			if (tempY < 0) {
				tempY = 0
			}

            if (options.callbacks.onMouseMove) {
                options.callbacks.onMouseMove(evt, tempX, tempY);
            }
		}

        var onMouseDownHandler = function(evt, x, y) {
            options.callbacks.onMouseDown(evt, tempX, tempY);
        };

        this.getX = function() {
            return tempX;
        };

        this.getY = function() {
            return tempY;
        };

        if (options.callbacks.onMouseDown) {
            el.onmousedown = onMouseDownHandler;
        }

		el.onmousemove = this.getMouseXY;
	};

	return MouseReader;
});


/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

Detector = {

	canvas : !! window.CanvasRenderingContext2D,
	webgl : ( function () { try { return !! window.WebGLRenderingContext && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); } catch( e ) { return false; } } )(),
	workers : !! window.Worker,
	fileapi : window.File && window.FileReader && window.FileList && window.Blob,

	getWebGLErrorMessage : function () {

		var domElement = document.createElement( 'div' );

		domElement.style.fontFamily = 'monospace';
		domElement.style.fontSize = '13px';
		domElement.style.textAlign = 'center';
		domElement.style.background = '#eee';
		domElement.style.color = '#000';
		domElement.style.padding = '1em';
		domElement.style.width = '475px';
		domElement.style.margin = '5em auto 0';

		if ( ! this.webgl ) {

			domElement.innerHTML = window.WebGLRenderingContext ? [
				'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br />',
				'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
			].join( '\n' ) : [
				'Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation">WebGL</a>.<br/>',
				'Find out how to get it <a href="http://get.webgl.org/">here</a>.'
			].join( '\n' );

		}

		return domElement;

	},

	addGetWebGLMessage : function ( parameters ) {

		var parent, id, domElement;

		parameters = parameters || {};

		parent = parameters.parent !== undefined ? parameters.parent : document.body;
		id = parameters.id !== undefined ? parameters.id : 'oldie';

		domElement = Detector.getWebGLErrorMessage();
		domElement.id = id;

		parent.appendChild( domElement );

	}

};

define("libs/three.js/Detector", function(){});

/**
 * @class
 * @name dom.utils.Detector
*/
define('dom/utils/Detector',['libs/three.js/Detector'], function() {
	var Detector = function() {};

	/**
     * @name dom.utils.Detector#topZIndex
     * @function
     * @static
     * @return {} top
    */
	Detector.topZIndex = function() {
		var top = 0;
		var pageEls = document.getElementsByTagName('*');

		for (var i = 0, len = pageEls.length; i < len; i++) {
			if (pageEls[i].style.zIndex && parseInt(pageEls[i].style.zIndex, 10) > top) {
				top = parseInt(pageEls[i].style.zIndex, 10);
			}
		}
		return top;
	};

	/**
     * @name dom.utils.Detector#isElement
     * @function
     * @static
     * @param {} obj
     * @return {} obj instanceof HTMLElement
    */
	Detector.isElement = function(obj) {
		try {
			//Using W3 DOM2 (works for FF, Opera and Chrom)
			return obj instanceof HTMLElement;
		} catch(e) {
			//Browsers not supporting W3 DOM2 don't have HTMLElement and
			//an exception is thrown and we end up here. Testing some
			//properties that all elements have. (works on IE7)
			return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
		}
	};

	/**
     * @name dom.utils.Detector#unit
     * @function
     * @static
     * @param {} value
     * @return {} unit
    */
	Detector.unit = function(value) {
		var map = { // list of all units and their identifying string
			pixel: "px",
			percent: "%",
			inch: "in",
			cm: "cm",
			mm: "mm",
			point: "pt",
			pica: "pc",
			em: "em",
			ex: "ex"
		};

		var unit = value.match(/\D+$/);
		unit = unit === null ? map.pixel: unit[0];
		return unit;
	};

	Detector.webgl = (function() {
		return Detector.webgl;
	})();

	Detector.getUserMedia = (function() {
		return navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	})();

	return Detector;
});


/**
 * @class
 * @name dom.shapes.Circle
 * @requires dom.primitives.Elem.js
 * @requires dom.utils.Detector.js
 * @param {} options
*/
define('dom/shapes/Circle',['dom/primitives/Elem', 'dom/utils/Detector'], function(Elem, Detector) {
    var Circle = function(options) {
        var self = this;

        Elem.call(this, options);

        if (options.radius === undefined) {
            throw new Error('Must define a radius');
        }

        this.unit = 'px';
        this.set({
            width: (options.radius * 2) + this.unit,
            height: (options.radius * 2) + this.unit
        });

        this.el.style.borderRadius = (parseInt(options.radius, 10) * 2) + this.unit;
        this.el.style.MoxBorderRadius = (parseInt(options.radius, 10) * 2) + this.unit;
    };

    return Circle;
});

define('proj/Ball',['dom/shapes/Circle'], function(Circle){
    var Ball = function(options) {
        var scope = this;

        this.vx = 0;
        this.vy = 0;

        Circle.call(this, options);

        this.update = function(bounds) {
        };
    };
    
    return Ball;    
});

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


define("assets/js/main", function(){});
