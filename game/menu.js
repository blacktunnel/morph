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
    MENU_TEXT_COLOR = Settings.menuTextColor,
    MENU_PADDING_LEFT = Settings.menuPaddingLeft,
    MENU_ROW_SIZE = Settings.menuRowSize,
    MENU_SELECTION_PADDING = Settings.menuSelectionPadding,
    MENU_LINE_WIDTH = Settings.menuLineWidth,
    MENU_ITEM_WIDTH = Settings.menuItemWidth,
    MENU_ITEM_HEIGHT = Settings.menuItemHeight,
    SIGN_FONT_SIZE = Settings.signFontSize,
    DIALOG_PROMPT_SIZE = Settings.dialogPromptSize,
    DIALOG_RESPONSE_SIZE = Settings.dialogResponseSize,
    QUESTLOG_FONT_SIZE = Settings.questlogFontSize,
    BLACK = Settings.blackColor,
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
    ENTER_KEY = Settings.enterKey,
    QUESTLOG_KEY = Settings.questlogKey,
    MAP_KEY = Settings.mapKey;

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
        this.selected = 0;
        this.timeToExit = true;
    },
    data: [],
    show: function() {
        var self = this;

        this.requestID = requestAnimationFrame(function() {
            self.loop();
        });
    },
    exit: function() {
        Game.paused = false;
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
        if ( ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' && this.timeToExit ) || ( JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) ) {
            if ( JUMP_KEY in Game.keysDown ) Game.keysDown[ JUMP_KEY ] = 'locked';
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
            x, y,
            j = 0;

        for ( var i = 0; i < this.data.length; i++ ) {
            item = this.data[i];
            x = this.x + this.paddingLeft + ( j % this.rowSize ) * spacing;
            y = this.y + this.paddingTop + spacing * Math.floor( j / this.rowSize );
            if ( this.selected == i ) {
                if ( item.sprite ) {

                    Game.drawRectangle( x - this.selectionPadding,
                                        y - this.selectionPadding,
                                        this.itemWidth + this.selectionPadding * 2 - 4,
                                        this.itemHeight + this.selectionPadding * 2 - 4,
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
            j++;
        }
    },
    title: function() {
        Game.ctx.font = 'normal ' + MENU_HEADER_FONT_SIZE + 'px uni05';
        Game.ctx.fillStyle = BLACK;
        Game.ctx.textAlign = 'center';
        Game.ctx.fillText( this.titleCopy || this.titleText, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP );
    },
    overlay: function() {
        Game.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        Game.ctx.fillRect( 0, 0, Game.viewportWidth, Game.viewportHeight );
    },
    container: function() {
        Game.ctx.fillStyle = BLACK;
        Game.ctx.fillRect( this.x, this.y, this.width, this.height );

        Game.drawRectangle( this.x, this.y, this.width, this.height, this.lineWidth, MENU_LINE_COLOR );
        // Header
        Game.ctx.fillRect( this.x + this.lineWidth, this.y + this.lineWidth, this.width - this.lineWidth, this.headerHeight );
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
    titleText: 'PAUSE',
    loop: function() {
        if ( PAUSE_KEY in Game.keysDown && Game.keysDown[ PAUSE_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    }
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
            questID: 'initial',
            sprite: 'block-double'
        },
        {
            className: Game.Entity.Hero.Man,
            questID: 'man',
            sprite: 'man-right-double'
        },
        {
            className: Game.Entity.Hero.Boat,
            questID: 'boat',
            sprite: 'boat-right-double'
        },
        {
            className: Game.Entity.Hero.Frog,
            questID: 'frog',
            sprite: 'frog-right-double'
        },
        {
            className: Game.Entity.Hero.Plane,
            questID: 'plane',
            sprite: 'plane-right-double'
        },
        {
            className: Game.Entity.Hero.Jellyfish,
            questID: 'jellyfish',
            sprite: 'jellyfish-double'
        },
        {
            className: Game.Entity.Hero.Clock,
            questID: 'clock',
            sprite: 'clock-double'
        },
        {
            className: Game.Entity.Hero.Flame,
            questID: 'flame',
            sprite: 'flame-double'
        }
    ],
    rowSize: TRANSFORM_MENU_ROW_SIZE,
    exit: function() {
        Game.keyUpListener( { keyCode: ACTION_KEY } );
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

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'center';
        Game.ctx.font = 'normal ' + SIGN_FONT_SIZE + 'px uni05';

        Game.wrapText( Game.ctx, this.body, Game.viewportWidth / 2, this.y + MENU_TITLE_TOP + MENU_PADDING * 2, MENU_WIDTH * TILESIZE - 2 * TILESIZE, SIGN_FONT_SIZE + ( SIGN_FONT_SIZE / 2.5 ) );
    }
});

Game.Menu.Dialog = Game.Menu.extend({
    init: function( left, top, width, height, lineWidth, content ) {
        this._super( left, top, width, height, lineWidth );
        this.face = content.face;
        this.titleCopy = content.name;
        this.content = content;
        this.timeToExit = false;
    },
    contents: function() {
        this.title();

        this.drawFace();

        this.currentDialog();
    },
    drawFace: function() {
        var sprite = Game.Sprites[ this.face + '-double' ],
            x = this.x + MENU_WIDTH * TILESIZE - MENU_ITEM_WIDTH - MENU_PADDING,
            y = this.y + MENU_HEADER_HEIGHT + MENU_PADDING;

        Game.ctx.drawImage( sprite, this.x + MENU_WIDTH * TILESIZE - MENU_ITEM_WIDTH - MENU_PADDING, this.y + MENU_HEADER_HEIGHT + MENU_PADDING );

        Game.drawRectangle( x - MENU_SELECTION_PADDING,
                            y - MENU_SELECTION_PADDING,
                            MENU_ITEM_WIDTH + MENU_SELECTION_PADDING * 2 - 2,
                            MENU_ITEM_HEIGHT + MENU_SELECTION_PADDING * 2 - 2,
                            MENU_LINE_WIDTH,
                            MENU_LINE_COLOR );
    },
    getDialog: function() {
        var dialogObj,
            found = false;

        this.activeDialog = this.activeDialog || 0;

        for ( var i in this.content.dialog ) {
            if ( Game.Questlog.inLog( i ) ) {
                dialogObj = this.content.dialog[ i ][ this.activeDialog ];
                found = true;
            }
        }

        if ( !found ) {
            dialogObj = this.content.dialog.default[ this.activeDialog ];
        }

        return dialogObj;
    },
    currentDialog: function() {
        var dialogObj = this.getDialog(),
            text = dialogObj.prompt,
            options = dialogObj.options,
            questlog = dialogObj.questlog,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING * 1.8;

        if ( questlog ) {
            Game.Questlog.push( questlog.questID, questlog.id );
        }

        // Draw prompt
        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + DIALOG_PROMPT_SIZE + 'px uni05';

        Game.wrapText( Game.ctx, text, left, top, MENU_WIDTH * TILESIZE - 4.5 * TILESIZE, DIALOG_PROMPT_SIZE + ( DIALOG_PROMPT_SIZE / 3 ) );

        // Draw options for response
        var fontSize = DIALOG_RESPONSE_SIZE;
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        var optionHeight = 0;
        for ( var i = 0, len = options.length; i < len; i++ ) {
            var top = optionHeight || top + TILESIZE * 3;

            Game.ctx.fillStyle = MENU_TEXT_COLOR;
            dimensions = Game.wrapText( Game.ctx, options[i].text, left, top, MENU_WIDTH * TILESIZE - 2 * TILESIZE, fontSize + (fontSize / 5) );
            optionHeight = dimensions.bottom;

            if ( i == this.selected ) {
                Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                    top - fontSize - 5,
                                    dimensions.width + MENU_SELECTION_PADDING * 2 - 2,
                                    dimensions.height + fontSize * 2 - 2,
                                    2,
                                    MENU_SELECTION_COLOR );
            }
        }
    },
    reply: function( response ) {
        var action = this.getDialog().options[ response ].action;

        if ( action != 'exit' ) {
            this.selected = 0;
        }

        if ( action == 'skip' ) {
            this.activeDialog += 2;
        } else if ( action == 'prev' ) {
            this.activeDialog--;
        } else if ( action == 'exit' ) {
            this.timeToExit = true;
            return true;
        } else {
            this.activeDialog++;
        }
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            var exit = this.reply( this.selected );

            if ( !exit ) {
                Game.keysDown[ ACTION_KEY ] = 'locked';
            }
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.selected + 1 < this.getDialog().options.length ) {
            this.selected++;
        }
    },
    left: function() {},
    right: function() {}
});

Game.Menu.Questlog = Game.Menu.extend({
    titleText: 'QUESTLOG',
    contents: function() {
        this.title();

        this.currentQuest = this.currentQuest || null;

        var quests = Game.Questlog.log,
            quest,
            dimensions,
            fontSize = QUESTLOG_FONT_SIZE,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING + TILESIZE * 0.7;

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        if ( this.currentQuest ) {
            // Quest is selected list journal entries
            quest = quests[ this.currentQuest ].entries;

            for ( var i = quest.length - 1; i >= 0; i-- ) {

                Game.ctx.fillStyle = MENU_TEXT_COLOR;
                dimensions = Game.wrapText( Game.ctx, quest[i].text, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING * 2, fontSize + ( fontSize / 5 ) );

                if ( i == ( quest.length - 1 - this.selected ) ) {
                    Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                        top - fontSize - 5,
                                        MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                        dimensions.height + fontSize * 2 - 2,
                                        2,
                                        MENU_SELECTION_COLOR );
                }

                top = dimensions.bottom;
            }
        } else {
            // List all quests
            var j = 0;
            for ( var i in quests ) {
                quest = quests[i];

                Game.ctx.fillStyle = MENU_TEXT_COLOR;
                dimensions = Game.wrapText( Game.ctx, quest.title, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING, fontSize + ( fontSize / 5 ) );

                if ( j == this.selected ) {
                    Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                        top - fontSize - 5,
                                        MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                        dimensions.height + fontSize * 2 - 2,
                                        2,
                                        MENU_SELECTION_COLOR );
                }

                top = dimensions.bottom;

                j++;
            }
        }
    },
    choose: function( selection ) {
        var quests = Game.Questlog.log;

        if ( this.currentQuest ) {
        } else {
            var j = 0;
            for ( var i in quests ) {
                if ( j == selection ) {
                    this.lastSelected = this.selected;
                    this.selected = 0;
                    this.currentQuest = i;
                    break;
                }
                j++;
            }
        }

    },
    back: function() {
        if ( this.currentQuest ) {
            this.currentQuest = false;
            this.selected = this.lastSelected;
            return false;
        }

        return true;
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.choose( this.selected );
            Game.keysDown[ ACTION_KEY ] = 'locked';
        }

        if ( JUMP_KEY in Game.keysDown && Game.keysDown[ JUMP_KEY ] != 'locked' ) {
            var exit = this.back();

            if ( !exit ) Game.keysDown[ JUMP_KEY ] = 'locked';
        }

        if ( QUESTLOG_KEY in Game.keysDown && Game.keysDown[ QUESTLOG_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.currentQuest ) {
            if ( this.selected + 1 < Game.Questlog.log[ this.currentQuest ].entries.length ) {
                this.selected++;
            }
        } else {
            var len = 0;
            for ( var i in Game.Questlog.log ) len++;
            if ( this.selected + 1 < len ) {
                this.selected++;
            }
        }
    },
});

Game.Menu.Map = Game.Menu.extend({
    titleText: 'MAP',
    init: function( left, top, width, height, lineWidth, content ) {
        this.content = content;
        this._super( left, top, width, height, lineWidth );
    },
    contents: function() {
        this.title();

        var places = this.content,
            dimensions,
            fontSize = QUESTLOG_FONT_SIZE,
            left = this.x + MENU_PADDING,
            top = this.y + MENU_TITLE_TOP + MENU_PADDING + TILESIZE * 0.7;

        Game.ctx.fillStyle = MENU_TEXT_COLOR;
        Game.ctx.textAlign = 'left';
        Game.ctx.font = 'normal ' + fontSize + 'px uni05';

        for ( var i = 0, len = places.length; i < len; i++ ) {
            var place = places[i];

            Game.ctx.fillStyle = MENU_TEXT_COLOR;
            dimensions = Game.wrapText( Game.ctx, place, left, top, MENU_WIDTH * TILESIZE - MENU_PADDING, fontSize );

            if ( i == this.selected ) {
                Game.drawRectangle( left - MENU_SELECTION_PADDING,
                                    top - fontSize - 5,
                                    MENU_WIDTH * TILESIZE - MENU_PADDING * 2,
                                    dimensions.height + fontSize * 2 - 2,
                                    2,
                                    MENU_SELECTION_COLOR );
            }

            top = dimensions.bottom;
        }
    },
    loop: function() {
        if ( ACTION_KEY in Game.keysDown && Game.keysDown[ ACTION_KEY ] != 'locked' ) {
            this.timeToExit = true;
        }

        if ( MAP_KEY in Game.keysDown && Game.keysDown[ MAP_KEY ] != 'locked' ) {
            Game.keysDown[ ACTION_KEY ] = true;
            this.timeToExit = true;
        }

        this._super();
    },
    up: function() {
        if ( this.selected - 1 >= 0 ) {
            this.selected--;
        }
    },
    down: function() {
        if ( this.selected + 1 < this.content.length ) {
            this.selected++;
        }
    },
    exit: function() {
        var place = this.content[ this.selected ].toLowerCase().replace( ' ', '-' );

        Game.switchToLevel = place;
        Game.performLevelSwitch();
        Game.paused = false;
    }
});

})( Game, Settings, window, document );
