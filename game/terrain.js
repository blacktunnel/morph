/* vim: set tabstop=4 softtabstop=4 shiftwidth=4 expandtab: */

Game.Entity.Terrain = Game.Entity.extend({
    type: 'Terrain',
    drawLayer: 1,
    portal: null, // portal to another level?
    init: function( x, y ) {
        this._super( x, y );
        this.ignoreGravity = true;
    }
});

Game.Entity.Terrain.Land = Game.Entity.Terrain.extend({
    type: 'Terrain.Land',
    initialSprite: 'land'
});

Game.Entity.Terrain.Wave = Game.Entity.Terrain.extend({
    type: 'Terrain.Wave',
    drawLayer: 4,
    initialSprite: 'wave-1',
    initialState: 'rolling',
    states: {
        'rolling': {
            animation: {
                delta: 400,
                sequence: [ 'wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5', 'wave-6', 'wave-7', 'wave-8', 'wave-9' ],
                times: 'infinite'
            }
        }
    }
});

Game.Entity.Terrain.Water = Game.Entity.Terrain.extend({
    type: 'Terrain.Water',
    drawLayer: 4,
    initialSprite: 'water'
});

Game.Entity.Terrain.Waterfall = Game.Entity.Terrain.extend({
    type: 'Terrain.Waterfall',
    drawLayer: 4,
    initialSprite: 'waterfall-1',
    initialState: 'falling',
    states: {
        'falling': {
            animation: {
                delta: 400,
                sequence: [ 'waterfall-1', 'waterfall-2', 'waterfall-3', 'waterfall-4', 'waterfall-5', 'waterfall-6', 'waterfall-7', 'waterfall-8', 'waterfall-9' ],
                times: 'infinite'
            }
        }
    }
});
