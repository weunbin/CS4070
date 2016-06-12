ig.module(
    'game.entities.loan'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityLoan = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/loan.png', 32, 32 ),
        type: ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        health: 10,
        size: {x: 24, y:24},
        offset: {x:2,y:2},
        flip: false,
        friction: {x:150,y:0},
        speed: 14,
        maxVel: {x: 75, y: 75},
        init: function(x,y, settings){
            this.parent(x,y,settings);
            this.addAnim('walk', .07,[0,1,2,3]);

        },
        
        update: function(){
            if(!ig.game.collisionMap.getTile(this.pos.x +(this.flip ? +4 : this.size.x -4), this.pos.y + this.size.y+1)){
                this.flip = !this.flip;
            }
            var xdir = this.flip ? -1 : 1;
            this.vel.x = this.speed * xdir;
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x){
                this.flip = !this.flip;
            }
        },
        check: function(other){
          other.receiveDamage(5,this);  
        },
    });
});
