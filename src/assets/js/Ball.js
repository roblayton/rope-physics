define(['dom/shapes/Circle'], function(Circle){
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
