ig.module(
    'game.entities.employer'
)

.requires(
    'impact.entity'
)

.defines(function(){
   EntityEmployer = ig.Entity.extend({
       animSheet: new ig.AnimationSheet('media/employer.png', 32,32),
       health: 10000,
       size: {x: 32, y:32},
       offset: {x: 2, y:2},
       flip: false,
       type: ig.Entity.TYPE.B,
       checkAgainst : ig.Entity.TYPE.A,
       collides: ig.Entity.COLLIDES.PASSIVE,
       init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',.5,[0,1]);
       },
       check: function(other){
           ig.game.coins += 1000;
           this.kill();
       }
       
   });
});