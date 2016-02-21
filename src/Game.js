/**
 * Created by David on 14-Mar-15.
 */

define([
    "class",
    "proton",
    "jquery",
    "ProtonLoader",
    "pixi",
    "dat"],
    function(Class, Proton, $, ProtonLoader, PIXI, Dat) {

    var Game = Class({

        create: function (stage, proton)
        {
            this.stage = stage;

            this.time = 0;

            this.proton = proton;

            this.emitter = null;

            this.loader = new ProtonLoader();

            this.stage.interactionManager.onMouseDown
                = this.stage.interactionManager.onTouchStart
                = function(mouse)
            {
                this.emit(mouse)
            }.bind(this);

            $.getJSON("assets/particles/blast.json", function(json)
            {
                this.particleData = json;

                this.setupGui();

                this.jsonUpdated();

            }.bind(this));

            //this.tempEmitter();
        },

        jsonUpdated: function()
        {
            if (this.emitter)
            {
                this.proton.removeEmitter(this.emitter);
            }

            this.emitter = this.loader.generateEmitter(this.particleData);

            this.proton.addEmitter(this.emitter);
        },

        buildTree: function(node, folder)
        {
            for(var key in node)
            {
                if (typeof node[key] === 'object')
                {
                    var newFolder = folder.addFolder(key);

                    this.buildTree(node[key], newFolder);
                }
                else
                {
                    var controller = folder.add(node, key);

                    controller.onChange = function()
                    {
                        this.jsonUpdated();
                    }.bind(this);
                }
            }
        },

        setupGui: function()
        {
            var gui = new Dat.GUI();

            this.buildTree(this.particleData, gui);
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

            this.emitter.emit(this.particleData.emitTime);

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