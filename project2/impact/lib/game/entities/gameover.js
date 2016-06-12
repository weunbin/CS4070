ig.module(
	'game.entities.gameover'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityGameover = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.A,
        animSheet: new ig.AnimationSheet('media/gameoverdoor.png', 32,32),
       size: {x: 32, y:32},
       flip: false,
       type: ig.Entity.TYPE.NONE,
       checkAgainst : ig.Entity.TYPE.A,
       collides: ig.Entity.COLLIDES.PASSIVE,
       init: function(x,y,settings){
            this.parent(x,y,settings);
            this.addAnim('idle',.5,[0]);
       },
        check: function(other) {
        	if (other instanceof EntityPlayer) {
        		ig.game.loadLevel(LevelGameover);
        	}
        }
    });
});
