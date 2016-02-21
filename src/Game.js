/**
 * Created by David on 14-Mar-15.
 */

define([
    "class",
    "pixi",
    "proton"],
    function(Class, PIXI) {

    var Game = Class({

        create: function (stage)
        {
            this.stage = stage;
            this.time = 0;

            /*this.background = new PIXI.Sprite(PIXI.Texture.fromImage("assets/img/bg.jpg"));
            this.background.width = window.innerWidth;
            this.background.height = window.innerHeight;
            this.background.x = this.background.y = 0;
            stage.addChild(this.background);*/

            this.spriteBatch = new PIXI.SpriteBatch();
            stage.addChild(this.spriteBatch);
        },

        emit: function(mouse)
        {
            var x = mouse.global.x;
            var y = mouse.global.y;
        },


        update: function(delta)
        {
            this.time += delta;
        },

        render: function()
        {

        }
    });


    return Game;
});