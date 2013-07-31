/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

(function( Game, Settings, window, document, undefined ) {

var TILESIZE = Settings.tileSize;
    MENU_WIDTH = Settings.menuWidth,
    MENU_HEIGHT = Settings.menuHeight,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    MENU_PADDING = Settings.menuPadding,
    MENU_HEADER_HEIGHT = Settings.menuHeaderHeight,
    MENU_HEADER_FONT_SIZE = Settings.menuHeaderFontSize,
    MENU_TITLE_TOP = Settings.menuTitleTop,
    MENU_SELECTION_COLOR = Settings.menuSelectionColor,
    MENU_LINE_COLOR = Settings.menuLineColor,
    MENU_PADDING_LEFT = Settings.menuPaddingLeft,
    MENU_ROW_SIZE = Settings.menuRowSize,
    MENU_SELECTION_PADDING = Settings.menuSelectionPadding,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    MENU_ITEM_WIDTH = Settings.menuItemWidth,
    MENU_ITEM_HEIGHT = Settings.menuItemHeight,
    GAME_OVER_MENU_PADDING_LEFT = Settings.gameOverMenuPaddingLeft,
    GAME_OVER_MENU_PADDING_TOP = Settings.gameOverMenuPaddingTop,
    TRANSFORM_MENU_ROW_SIZE = Settings.transformMenuRowSize,
    LEFT_KEY = Settings.leftKey,
    RIGHT_KEY = Settings.rightKey,
    DOWN_KEY = Settings.downKey,
    UP_KEY = Settings.upKey,
    ACTION_KEY = Settings.actionKey,
    JUMP_KEY = Settings.jumpKey,
    PAUSE_KEY = Settings.pauseKey,
    ENTER_KEY = Settings.enterKey;

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' '),
        line = '';

    for( var n = 0; n < words.length; n++ ) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText( testLine );
        var testWidth = metrics.width;
        if ( testWidth > maxWidth && n > 0 ) {
            context.fillText( line, x, y );
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

Game.Menu = Class.extend({
    titleText: 'MENU',
    init: function( left, top, width, height, lineWidth ) {
        this.x = left;
        this.y = top;
        this.padding = MENU_PADDING;
        this.paddingLeft = this.padding + MENU_PADDING_LEFT;
        this.headerHeight = MENU_HEADER_HEIGHT;
        this.paddingTop = this.headerHeight + this.padding;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth || 1;
    },
    data: [],
    show: function() {
        var self = this;

        this.requestID = requestAnimationFrame(function() {
            self.loop();
        });
    },
    exit: function() {
        Game.keyUpListener( { keyCode: ACTION_KEY } );
        Game.invalidateRect( 0, Game.viewportWidth, Game.viewportHeight, 0 );
        Game.requestID = requestAnimationFrame( Game.loop );
    },
    loop: function() {
        var self = this;

        // Left
        if ( LEFT_KEY in Game.keysDown && Game.keysDown[ LEFT_KEY ] != 'locked' ) {
            this.left();
            Game.keysDown[LEFT_KEY] = 'locked';
        }
        // Up
        if ( UP_KEY in Game.keysDown && Game.keysDown[ UP_KEY ] != 'locked' ) {
            this.up();
            Game.keysDown[UP_KEY] = 'locked';
        }
        // Right
        if ( RIGHT_KEY in Game.keysDown && Game.keysDown[ RIGHT_KEY ] != 'locked' ) {
            this.right();
            Game.keysDown[RIGHT_KEY] = 'locked';
        }
        // Down
        if ( DOWN_KEY in Game.keysDown && Game.keysDown[ DOWN_KEY ] != 'locked' ) {
            this.down();
            Game.keysDown[DOWN_KEY] = 'locked';
        }

        // Enter
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            // Choose and exit
            this.exit();
        } else {
            Game.invalidateRect( 0, Game.viewportWidth + Game.viewportOffset, Game.viewportHeight, Game.viewportOffset );
            Game.render();
            this.render();

            this.requestID = requestAnimationFrame(function() {
                self.loop();
            });
        }
    },
    render: function() {
        this.overlay();

        this.container();

        this.contents();
    },
    selected: 0,
    rowSize: MENU_ROW_SIZE,
    selectionPadding: MENU_SELECTION_PADDING,
    selectionLineWidth: MENU_LINE_WIDTH,
    selectionColor: MENU_SELECTION_COLOR,
    itemWidth: MENU_ITEM_WIDTH,
    itemHeight: MENU_ITEM_HEIGHT,
    contents: function() {
        this.title();

        var item,
            spacing = 4 * TILESIZE,
            x, y;

        for ( var i = 0; i < this.data.length; i++ ) {
            item = this.data[i];
            x = this.x + this.paddingLeft + ( i % this.rowSize ) * spacing;
            y = this.y + this.paddingTop + spacing * Math.floor( i / this.rowSize );
            if ( this.selected == i ) {
                if ( item.sprite ) {

                    this.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        this.itemWidth + this.selectionPadding * 2 - 2,
                                        this.itemHeight + this.selectionPadding * 2 - 2,
                                        this.selectionLineWidth,
                                        this.selectionColor );

                } else {

                    this.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        Game.ctx.measureText( item.text ).width,
                                        30,
                                        this.selectionLineWidth,
                                        this.selectionColor );

                }

            }
            if ( item.sprite ) {
                Game.ctx.drawImage( Game.Sprites[ item.sprite ], x, y );
            } else if ( item.text ) {
                Game.ctx.textAlign = 'left';
                Game.ctx.fillText( item.text, x, y );
            }
        }
    },
    title: function() {
        Game.ctx.font = 'normal ' + Math.round( MENU_HEADER_FONT_SIZE ) + 'px uni05';
        Game.ctx.fillStyle = '#000';
        Game.ctx.textAlign = 'center';
        Game.ctx.fillText( this.titleCopy || this.titleText, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP );
    },
    overlay: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
    },
    container: function() {
        Game.ctx.fillStyle = '#000';
        Game.ctx.fillRect( this.x, this.y, this.width, this.height );

        this.drawRectangle( this.x, this.y, this.width, this.height, this.lineWidth, MENU_LINE_COLOR );
        // Header
        Game.ctx.fillRect( this.x + this.lineWidth, this.y + this.lineWidth, this.width - this.lineWidth, this.headerHeight );
    },
    //Draws four sides of a rectangle to make it hollow
    //path's stroke did not render colors well
    drawRectangle: function( left, top, width, height, lineWidth, color ) {
        var right = left + width,
            bottom = top + height;

        width += lineWidth;
        height += lineWidth;

        Game.ctx.fillStyle = color;
        // TL -> TR
        Game.ctx.fillRect( left, top, width, lineWidth );
        // TR -> BR
        Game.ctx.fillRect( right, top, lineWidth, height );
        // BL -> BR
        Game.ctx.fillRect( left, bottom, width, lineWidth );
        // TL -> BL
        Game.ctx.fillRect( left, top, lineWidth, height );
    },
    up: function() {
        if ( this.selected - this.rowSize >= 0 ) {
            this.selected -= this.rowSize;
        }
    },
    down: function() {
        if ( this.selected + this.rowSize < this.data.length ) {
            this.selected += this.rowSize;
        }
    },
    left: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    right: function() {
        if ( this.selected + 1 < this.data.length ) {
            this.selected++;
        }
    }
});

Game.Menu.Pause = Game.Menu.extend({
    titleText: 'PAUSE'
});

Game.Menu.GameOver = Game.Menu.extend({
    titleText: 'GAME OVER',
    init: function( left, top, width, height, lineWidth ) {
        this._super( left, top, width, height, lineWidth );
        this.paddingLeft = GAME_OVER_MENU_PADDING_LEFT;
        this.paddingTop = GAME_OVER_MENU_PADDING_TOP;
    },
    data: [
        { sprite: 'restart-double' },
        { sprite: 'exit-double' }
    ],
    exit: function() {
        if ( this.selected == 0 ) {
            Game.paused = false;
            Game.Inventory.health = Game.Inventory.maxHealth;
            Game.lastUpdate = null;
            Game.stop();
            Game.init( 'first' );
        }
    }
});

Game.Menu.Transform = Game.Menu.extend({
    titleText: 'MORPH',
    data: [
        {
            className: Game.Entity.Hero.Block,
            sprite: 'block-double'
        },
        {
            className: Game.Entity.Hero.Man,
            sprite: 'man-right-double'
        },
        {
            className: Game.Entity.Hero.Boat,
            sprite: 'boat-right-double'
        },
        {
            className: Game.Entity.Hero.Frog,
            sprite: 'frog-right-double'
        },
        {
            className: Game.Entity.Hero.Plane,
            sprite: 'plane-right-double'
        },
        {
            className: Game.Entity.Hero.Jellyfish,
            sprite: 'jellyfish-double'
        },
        {
            className: Game.Entity.Hero.Clock,
            sprite: 'clock-double'
        },
        {
            className: Game.Entity.Hero.Flame,
            sprite: 'flame-double'
        }
    ],
    rowSize: TRANSFORM_MENU_ROW_SIZE,
    exit: function() {
        Game.startTransformAnimation( this.data[ this.selected ].className );
    }
});

Game.Menu.Sign = Game.Menu.extend({
    init: function( left, top, width, height, lineWidth, content ) {
        this._super( left, top, width, height, lineWidth );
        this.titleCopy = content.title;
        this.body = content.body;
    },
    contents: function() {
        this.title();

        Game.ctx.fillStyle = '#0f0';
        Game.ctx.textAlign = 'center';
        Game.ctx.font = 'normal ' + 20 + 'px uni05';

        wrapText( Game.ctx, this.body, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP + MENU_PADDING * 2, MENU_WIDTH * TILESIZE - 2 * TILESIZE, 28 );
    }
});

Game.Menu.Dialog = Game.Menu.extend({
    init: function( left, top, width, height, lineWidth, content ) {
        this._super( left, top, width, height, lineWidth );
        this.titleCopy = content.name;
        this.content = content;
    },
    contents: function() {
        this.title();
    }
});

})( Game, Settings, window, document );
