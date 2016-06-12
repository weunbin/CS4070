ig.module(
    'game.entities.loanboss'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityLoanboss = ig.Entity.extend({
        animSheet: new ig.AnimationSheet( 'media/loanboss.png', 64, 64 ),
        type: ig.Entity.TYPE.B,
        checkAgainst : ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,
        health: 300,
        size: {x: 64, y:64},
        offset: {x:2,y:2},
        flip: false,
        init: function(x,y, settings){
            this.parent(x,y,settings);
            this.addAnim('idle', .07,[0,1]);

        },

        check: function(other){
          other.receiveDamage(1500,this); 
        }
    });
});
