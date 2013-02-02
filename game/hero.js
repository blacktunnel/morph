Game.Entity.Hero = Game.Entity.extend({
    type: 'Hero',
    move: {
        'right': function() {
            this.x += Game.unit;
        },
        'left': function() {
            this.x -= Game.unit;
        },
        'up': function() {
            //jump
        },
        'down': function() {
            //down for plane and jellyfish
        }
    },
    actions: [],
    transform: function() {
        //transform method
    }
});

Game.Entity.Hero.Man = Game.Entity.Hero.extend({
    type: 'Hero.Man',
    bitmaps: [
        [
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "#00ff00", "transparent" ],
            [ "transparent", "#00ff00", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "#00ff00", "transparent", "transparent" ],
            [ "#00ff00", "#00ff00", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "transparent" ],
            [ "#00ff00", "transparent", "transparent", "transparent", "transparent", "transparent", "#00ff00", "#00ff00", "#00ff00"  ]
        ]
    ],
       collideWith: function(entity) { 
	//as of now, handle land, rock, coin, monster
	if (entity instanceof Game.Entity.Interactable.Rock) {
	    //Switch to holding rock animation state.
	}
	if (entity instanceof Game.Entity.Interactable.Coin) {
	    //coins++;
	}
	if (entity instanceof Game.Entity.Terrain.Land) {
	    //if he's actually above the terrain, turn jumping off.
	    if (this.x <= entity.x + 4.5 && this.x >= entity.x - 4.5 && 
		this.y + 4.5 <= entity.y + 4.5) {
		//this.jumping = false;
	    }
	    //console.log("man collided with land");
	}
	if (entity instanceof Game.Entity.Enemy.Monster) {
	    //GAME OVER
	}
    },
    jumping: false,
    up: function() {
	this.jumping = true;
	this.time_jump_started = Date.now();
	this.initial_y = this.y;
    },
    update: function() {
	var GRAV = 0.002,
	    Y_VEL = .8;
	if (this.jumping) {
	    var t = Date.now() - this.time_jump_started;
	    this.y = this.initial_y - Y_VEL*t + .5*GRAV*t*t;
	}
    },
});
