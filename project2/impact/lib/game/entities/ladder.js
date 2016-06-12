ig.module(
    'game.entities.ladder'
)

.requires(
    'impact.entity'
)

.defines(function(){
   EntityLadder = ig.Entity.extend({
       animSheet: new ig.AnimationSheet('media/ladder.png', 32,64),
       health: 10000000,
       size: {x: 32, y:64},
       offset: {x: 4, y:2},
       flip: false,
       type: ig.Entity.TYPE.NONE,
       checkAgainst : ig.Entity.TYPE.A,
       init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',.5,[0]);
       },
       check: function(other){
          ig.game.canClimb = true;
       }
       
   });
});