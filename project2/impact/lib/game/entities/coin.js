ig.module(
    'game.entities.coin'
)

.requires(
    'impact.entity'
)

.defines(function(){
   EntityCoin = ig.Entity.extend({
       animSheet: new ig.AnimationSheet('media/coin.png', 16,16),
       health: 10000,
       size: {x: 16, y:16},
       offset: {x: 4, y:2},
       flip: false,
       maxVel: {x: 0, y: 0},
       type: ig.Entity.TYPE.B,
       checkAgainst : ig.Entity.TYPE.A,
       collides: ig.Entity.COLLIDES.PASSIVE,
       init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',.5,[0,1,2,3]);
       },
       check: function(other){
          this.kill();
           ig.game.coins += 100;
       }
       
   });
});