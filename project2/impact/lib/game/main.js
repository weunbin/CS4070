ig.module( 
	'game.main'
)
.requires(
	'impact.game',
	'game.levels.dorm1',
    'game.levels.dorm2',
    'game.levels.dorm3',
    'game.levels.gameover',
    'impact.font',
    'impact.timer'
)
.defines(function(){

MyGame = ig.Game.extend({
	gravity: 300,
    instructText: new ig.Font( 'media/04b03.font.png' ),
    lifeSprite: new ig.Image('media/lifesprite.png'),
    lives: 3,
    coins: 0,
    health: 10,
    isBossLevel: false,
    canClimb: false,
    statText: new ig.Font( 'media/04b03.font.png' ),
    scoreText: new ig.Font( 'media/04b03.font.png' ),
    healthText: new ig.Font( 'media/04b03.font.png' ),
 
	
	init: function() {
        this.loadLevel(LevelDorm1);
        ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
        ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
        ig.input.bind(ig.KEY.X, 'jump');
        ig.input.bind(ig.KEY.C, 'shoot');
        ig.input.bind(ig.KEY.TAB, 'switch');
        ig.input.bind(ig.KEY.UP_ARROW, 'up');
        ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
        ig.input.bind(ig.KEY.Z, 'climb');
		
	},
	
	update: function() {
        var player = this.getEntitiesByType(EntityPlayer)[0];
        if(player){
            this.screen.x = player.pos.x - ig.system.width/2;
            this.screen.y = player.pos.y - ig.system.height/2;
            if(player.accel.x > 0 && this.instructText)
                this.instructText = null;
        }
		// Update all entities and backgroundMaps
		this.parent();
		
		// Add your own, additional update code here
	},
	
	draw: function() {
        this.parent();
        this.statText.draw("Lives: ", 5,15); 
        for(var i=0; i < this.lives; i++)
            this.lifeSprite.draw(((this.lifeSprite.width + 2) * i)+5, 15);
        this.scoreText.draw("Money: " + this.coins, 5,5);
        this.scoreText.draw("Health: " + this.health, 70,5);
        
        if(this.instructText){
            var x = ig.system.width/2,
                y = ig.system.height - 10;
            this.instructText.draw('X: jump, C: shoot, Tab: Switches weapons', x, y - 20, ig.Font.ALIGN.CENTER );
            this.instructText.draw('Left/Right/Up/Down: moves', x, y, ig.Font.ALIGN.CENTER );
        }
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 180, 2 );

});
