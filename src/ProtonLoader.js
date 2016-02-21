/**
 * Created by David on 14-Mar-15.
 */

define([
        "class",
        "proton",
        "pixi"],
    function (Class, Proton, PIXI)
    {

        var ProtonLoader = Class({

            create: function ()
            {

            },

            generateEmitter: function(data)
            {
                var emitter = new Proton.Emitter();

                emitter.rate = this.getRate(data.rate);

                var initializers = this.getInitializers(data.initializers);

                initializers.forEach(function(initializer)
                {
                    emitter.addInitialize(initializer);
                });

                var behaviors = this.getBehaviors(data.behaviors);

                behaviors.forEach(function(behavior)
                {
                    emitter.addBehaviour(behavior);
                });

                return emitter;
            },

            getRate: function(data)
            {
                var numPan = this.getSpan(data.count);

                var timePan = this.getSpan(data.time);

                console.log("Rate:");

                console.log(" - Count: " + data.count.min + ", " + data.count.max);

                console.log(" - Time: " + data.time.min + ", " + data.time.max);

                return new Proton.Rate(numPan, timePan)
            },

            getInitializers: function(data)
            {
                console.log("Initializers:")

                var initializers = [];

                for(var name in data)
                {
                    switch(name)
                    {
                        case 'image':
                            var texture = PIXI.Texture.fromImage(data[name]);

                            initializers.push(new Proton.ImageTarget(texture));

                            break;

                        case 'life':
                            var params = this.getMinMax(data[name]);

                            initializers.push(new Proton.Life(params.min, params.max, params.start));

                            break;

                        case 'radius':
                            var params = this.getMinMax(data[name]);

                            initializers.push(new Proton.Radius(params.min, params.max, params.start));

                            break;

                        case 'velocity':
                            var angleSpan = this.getSpan(data[name].angle);

                            initializers.push(new Proton.Velocity(data[name].speed, angleSpan, 'polar'));

                            break;
                    }
                }

                return initializers;
            },

            getBehaviors: function(data)
            {
                console.log("Behaviors:");

                var behaviors = [];

                for(var name in data)
                {
                    switch(name)
                    {
                        case 'color':
                            var params = this.getStartEnd(data[name]);

                            behaviors.push(new Proton.Color(params.start, params.end));

                            break;

                        case 'alpha':
                            var params = this.getStartEnd(data[name]);

                            behaviors.push(new Proton.Alpha(params.start, params.end));

                            break;

                        case 'gravity':
                            behaviors.push(new Proton.Gravity(data[name].strength));

                            break;
                    }
                }

                return behaviors;
            },

            getStartEnd: function(data)
            {
                var start = data.start;
                var end = data.end;

                return { start: start, end: end };
            },

            getMinMax: function(data)
            {
                var min = data.min;
                var max = data.max;

                return { min: min, max: max };
            },

            getSpan: function(data)
            {
                var min = data.min;
                var max = data.max;
                var start = data.start || undefined;

                return Proton.getSpan(min, max, start);
            },

        });

        return ProtonLoader;

    });