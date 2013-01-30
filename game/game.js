var Game = {
    unit: 18,
    init: function() {
        //Prepare canvas
        Game.canvas = document.createElement( 'canvas' );
        Game.canvas.width = 900;
        Game.canvas.height = 450;
        document.getElementById( 'game' ).appendChild( Game.canvas );
        Game.ctx = Game.canvas.getContext( '2d' );

        //Load level and sprites
        Game.currentLevel = Game.Levels[0];
        Game.loadLevel();
    },
    startLoop: function() {
        //Start event listeners and main loop
        addEventListener( 'keydown', Game.keyDownListener, false );
        addEventListener( 'keyup', Game.keyUpListener, false );
        Game.then = Date.now();
        setInterval(Game.loop, 1);

	Game.axisList = Game.currentLevel.entities;
    },
    loop: function() {
        var now = Date.now(),
        delta = now - Game.then;

        Game.update( delta / 1000 );
        Game.render();

        Game.then = now;
    },
    update: function() {
	
        if ( 37 in Game.keysDown && Game.keysDown[ 37 ] != 'locked' ) { //player holding left
            Game.hero.x -= 18;
            Game.keysDown[ 37 ] = 'locked';
        }
        if ( 39 in Game.keysDown && Game.keysDown[ 39 ] != 'locked' ) { //player holding right
            Game.hero.x += 18;
            Game.keysDown[ 39 ] = 'locked';
        }
        if ( 32 in Game.keysDown && Game.keysDown[ 32 ] != 'locked' ) { //player holding spacebar
            //action
            Game.keysDown[ 32 ] = 'locked';
        }
	//Broad-phase collision detection using sweep and prune algorithm. 
	var activeList = new Array(Game.axisList[0]));
	for (var i = 1; i < Game.axisList.length; i++) {
	    for (var j = 0; j < activeList.length; j++) {
		if (Game.axisList[i].x - (Game.unit / 4) > activeList[j].x - (Game.unit / 4)) {
		    activeList.pop();
		    continue;
		}
		//Narrow-phase collision detection.
		if (!( Abs(Game.axisList[i].x - activeList[j].x) > (Game.unit / 2)) &&
		    !( Abs(Game.axisList[i].y - activeList[j].y) > (Game.unit / 2))) {
		    //We have a collision between axisList[i] and activeList[j]
		}
	    }
	    activeList.push(Game.axisList[i]);
	}
			   
			
	    
	
    },
    render: function() {
        var i;

        //Background
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( 0, 0, 900, 450 );

        for ( i in Game.currentLevel.entities ) {
            Game.currentLevel.entities[ i ].render();
        }
    },
    loadLevel: function() {
        for ( i in Game.currentLevel.grid ) {
            for ( j in Game.currentLevel.grid[ i ] ) {
                entityString = Game.currentLevel.grid[ i ][ j ];
                if ( entityString != 'blank' ) {
                    entity = eval( 'new Game.Entity.' + entityString.capitalize( '.' ) + '( ' + j * Game.unit + ', ' + i * Game.unit + ' )' );
                    Game.currentLevel.entities.push( entity );
                    if ( entityString.indexOf( 'hero' ) != -1 ) {
                        Game.hero = entity
                    }
                }
            }
        }
    },
    keyDownListener: function( evt ) {
        evt.preventDefault();
        if ( Game.keysDown[ evt.keyCode ] != 'locked' ) {
            Game.keysDown[ evt.keyCode ] = true;
        }
    },
    keyUpListener: function( evt ) {
        delete Game.keysDown[ evt.keyCode ];
    },
    keysDown: {},
    imageCount: 1,
    imageLoaded: function( img ) {
        if ( Game.imageCount < Game.currentLevel.entityCount ) {
            Game.imageCount++;
            return;
        }
        Game.startLoop();
    }
};
window.Game = Game;

$(function() {
    Game.init();
});
