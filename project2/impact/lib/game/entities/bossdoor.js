ig.module(
	'game.entities.bossdoor'
)
.requires(
	'impact.entity'
)
.defines(function(){

    EntityBossdoor = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(0, 0, 255, 0.7)',
        size: {x: 16, y: 16},
        level: null,
        checkAgainst: ig.Entity.TYPE.A,
        update: function(){},
        check: function(other) {
        	if (other instanceof EntityPlayer) {
        		ig.game.isBossLevel = true;
        	}
        }
    });
});
