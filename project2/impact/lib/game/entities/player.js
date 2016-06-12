ig.module(
    'game.entities.player'
)
.requires(
    'impact.entity'
)
.defines(function(){
    EntityPlayer = ig.Entity.extend({
        _wmDrawBox: true,
        _wmBoxColor: 'rgba(255,0,0,0.7)',
        weapon: 0,
        totalWeapons: 3,
        activeWeapon: "EntityTeardrop",
        startPosition: null,
        invincible: true,
        invincibleDelay: 2,
        invincibleTimer: null,
        animSheet: new ig.AnimationSheet( 'media/player.png', 32, 32 ),
        type: ig.Entity.TYPE.A,
        checkAgainst : ig.Entity.TYPE.NONE,
        collides: ig.Entity.COLLIDES.PASSIVE,
        size: {x: 24, y:30},
        offset: {x:2,y:2},
        flip: false,
        health: 10,
        maxVel: {x: 100, y: 150},
        friction: {x:600, y: 0},
        accelGround: 400,
        accelAir: 400,
        jump: 200,
        init: function(x,y, settings){
            this.startPosition = {x:x,y:y};
            this.parent(x,y,settings);
            this.setupAnimation(this.weapon);
            this.invincibleTimer = new ig.Timer();
            this.makeInvincible();

        },
        setupAnimation: function(offset){
            this.addAnim('idle',1,[0]);
            this.addAnim('run', .07,[4,5,6]);
            this.addAnim('jump', 1, [5]);
            this.addAnim('fall',0.4, [1,2]);
            this.addAnim('shoot', .00001, [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]);
            this.addAnim('climb', .05, [9,10,11,12]);
            this.addAnim('up', .05, [17,18,19,21]);
            this.addAnim('down', .05, [13,14,15,16]);
        },
        
        update: function(){
            var accel = this.standing ? this.accelGround : this.accelAir;
            if(ig.game.isBossLevel == false){
                if(ig.input.state('left')){
                    this.accel.x = -accel;
                    this.flip = true;
                }else if(ig.input.state('right')){
                    this.accel.x = accel;
                    this.flip = false;
                }else{
                    this.accel.x = 0;
                }
                if(this.standing && ig.input.pressed('jump')){
                    this.vel.y = -this.jump;
                }
                if(this.vel.y < 0)
                    this.currentAnim = this.anims.jump;
                else if(this.vel.y >0 )
                    this.currentAnim = this.anims.fall;
                else if(this.vel.x != 0)
                    this.currentAnim = this.anims.run;
                else
                    this.currentAnim = this.anims.idle;
            }
            if(ig.game.isBossLevel == true){
                ig.game.gravity = 0;
                this.friction.y = 600;
                if(ig.input.state('left')){
                    this.accel.x = -accel;
                    this.flip = true;
                }else if(ig.input.state('right')){
                    this.accel.x = accel;
                    this.flip = false;
                }else if(ig.input.state('up')){
                    this.accel.y = -accel;
                }else if(ig.input.state('down')){
                    this.accel.y = accel;
                }else{
                    this.accel.x = 0;
                    this.accel.y = 0;
                }

                if(this.vel.y > 0 )
                    this.currentAnim = this.anims.down;
                else if(this.vel.y < 0 )
                    this.currentAnim = this.anims.up;
                else if(this.vel.x != 0)
                    this.currentAnim = this.anims.run;
                else
                    this.currentAnim = this.anims.idle;
            }

       
            if(ig.input.pressed('shoot')) {
                this.currentAnim = this.anims.shoot;
                ig.game.spawnEntity(this.activeWeapon, this.pos.x, this.pos.y, {flip:this.flip});
                if(this.activeWeapon == "EntityDollar")
                    ig.game.coins -= 10;
                else if(this.activeWeapon == "EntityMoneybag")
                    ig.game.coins -= 100;
            }
            if(ig.input.pressed('switch')){
                this.weapon++;
                if(this.weapon >= this.totalWeapons)
                    this.weapon = 0;
                switch(this.weapon){
                    case(0):
                        this.activeWeapon = "EntityTeardrop";        
                        break;
                    case(1):
                        this.activeWeapon = "EntityDollar";
                        break;
                    case(2):
                        this.activeWeapon = "EntityMoneybag";
                        break;
                }
                this.setupAnimation(this.weapon);
            }
            this.currentAnim.flip.x = this.flip;
            if(this.invincibleTimer.delta() > this.invincibleDelay){
                this.invincible = false;
                this.currentAnim.alpha = 1;
            }
            this.parent();
        },
        makeInvincible: function(){
            this.invincible = true;
            this.invincibleTimer.reset();
        },
        receiveDamage: function(amount,from){
            if(this.invincible)
                return;
            ig.game.health -= amount;
            this.parent(amount,from);
        },
        draw: function(){
            if(this.invincible)
                this.currentAnim.alpha = this.invincibleTimer.delta()/this.invincibleDelay*1;
            this.parent();
        },
        kill: function(){
            this.parent();
            ig.game.lives --;
            ig.game.coins -= 50;
            ig.game.spawnEntity(EntityPlayer, this.startPosition.x,this.startPosition.y);
            ig.game.health = 10;
            if(ig.game.lives == 0){
                ig.game.loadLevel(LevelGameover);
            }
        }
    });
    
    EntityTeardrop = ig.Entity.extend({
        size: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/teardrop.png',16,16),
        maxVel: {x: 150, y:0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function(x,y,settings){
            this.parent(x + (settings.flip ? -4:8), y+8, settings);
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim('idle', 0.2,[0,1]);
        },
        
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x || res.collision.y){
                this.kill();
            }
        },
        
        check: function(other){
            other.receiveDamage(0,this);
            this.kill();
        }
    });
    
    EntityDollar = ig.Entity.extend({
        size: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/dollar.png',16,16),
        maxVel: {x: 150, y:0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function(x,y,settings){
            this.parent(x + (settings.flip ? -4:8), y+8, settings);
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim('idle', .2,[0,1,2,3]);
        },
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x || res.collision.y){
                this.kill();
            }
        },
        
        check: function(other){
            other.receiveDamage(4,this);
            this.kill();
        }
    });
    EntityMoneybag = ig.Entity.extend({
        size: {x: 16, y: 16},
        animSheet: new ig.AnimationSheet('media/moneybag.png',16,16),
        maxVel: {x: 100, y:0},
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.PASSIVE,
        init: function(x,y,settings){
            this.parent(x + (settings.flip ? -4:8), y+8, settings);
            this.vel.x = this.accel.x = (settings.flip ? -this.maxVel.x : this.maxVel.x);
            this.addAnim('idle', .7,[0,1,2,3]);
        },
        handleMovementTrace: function(res){
            this.parent(res);
            if(res.collision.x || res.collision.y){
                this.kill();
            }
        },
        
        check: function(other){
            other.receiveDamage(100,this);
            this.kill();
        }
    });
    
});
