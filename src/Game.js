/**
 * Created by David on 14-Mar-15.
 */

define([
    "class",
    "proton",
    "jquery",
    "ProtonLoader",
    "pixi"],
    function(Class, Proton, $, ProtonLoader, PIXI) {

    var Game = Class({

        create: function (stage, proton)
        {
            this.stage = stage;

            this.time = 0;

            this.proton = proton;

            this.emitter = null;

            this.loader = new ProtonLoader();

            this.stage.interactionManager.onMouseDown = function(mouse)
            {
                this.emit(mouse)
            }.bind(this);

            $.getJSON("assets/particles/blast.json", function(json)
            {
                if (this.emitter)
                {
                    this.proton.removeEmitter(this.emitter);
                }

                this.emitter = this.loader.generateEmitter(json);

                //this.emitter.p.x = 200;

                //this.emitter.p.y = 500;

                //this.emitter.emit();

                this.proton.addEmitter(this.emitter);

            }.bind(this));

            //this.tempEmitter();
        },

        tempEmitter: function()
        {
            var texture = PIXI.Texture.fromImage('assets/img/cross.png');

            var emitter = new Proton.Emitter();

            this.proton.addEmitter(emitter);

            emitter.addInitialize(new Proton.ImageTarget(texture));
             //set Rate
             emitter.rate = new Proton.Rate(Proton.getSpan(10, 20), Proton.getSpan(0.1, 0.1));
             //add Initialize
             emitter.addInitialize(new Proton.Radius(1, 12));
             emitter.addInitialize(new Proton.Life(2, 4));
             emitter.addInitialize(new Proton.Velocity(3, Proton.getSpan(0, 360), 'polar'));
             //add Behaviour
             emitter.addBehaviour(new Proton.Color('ff0000', 'random'));
             emitter.addBehaviour(new Proton.Alpha(1, 0));
             //set emitter position
             emitter.p.x = 200;
             emitter.p.y = 200;
             emitter.emit();
             //add emitter to the proton

        },

        emit: function(mouse)
        {
            if (!this.emitter)
            {
                return;
            }

            var x = mouse.x;

            var y = mouse.y;

            this.emitter.p.x = x;

            this.emitter.p.y = y;

            this.emitter.emit();

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