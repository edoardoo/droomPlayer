class ShortKey {

    constructor( keyId, keyPressed, description, action, reaction){
        this.keyId = keyId;
        this.action = action;
        this.reaction = reaction;
        this.description = description;
        this.setListeners();
    }

    getKeyId(){
        return this.idkeyId;
    }

    getAction(){
        return this.action;
    }

    getReaction(){
        return this.reaction;
    }

    setListeners(){

        if( Array.isArray(this.reaction) ){

            this.keyUp = this.reaction[1];
            this.keyDown = this.reaction[0];

        }else if( this.action == 'down' ){

            this.keyUp = ()=>{};
            this.keyDown = this.reaction;

        }else{
            this.keyUp = this.reaction;
            this.keyDown = ()=>{};

        }
    }

}

let playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    let pm = this;
    pm.player = video;

    pm.setPlayer = function ( player ) {

        pm.player = player;

    };

    pm.play = ()=>{

        return pm.player.play();
    };

    pm.pause = ()=>{

        return pm.player.pause();
    };

    pm.toggle = ()=>{

        if( pm.isPlaying() ){
            pm.pause();
        }else{
            pm.play();
        }

    };

    pm.isPlaying = ()=>{

        return !pm.player.paused;

    };

    pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle )
    ];

    pm.mappedShortKeys = {};

    pm.prepareMappedKeysObject = ()=>{
        pm.shortKeys.map(function( element ){

            let id =  element.keyId;
            pm.mappedShortKeys[id] = element;

        });
    }

    pm.mappedShortKeys = {
        32: new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        80: new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle )

    }

    pm.setListeners = ()=>{

        pm.prepareMappedKeysObject();

        window.onkeydown = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            logger.debug("Listeners", 'Received on key down: ', e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            let key = e.keyCode ? e.keyCode : e.which;
            logger.debug("Listeners", 'Received on key up: ', e.keyCode);
            let shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyUp();
            }
        }

    }
    pm.setListeners();


    return pm;
}



// var spaceCircles = [30, 70, 110];
// var outerWidth  = 300;
// var outerHeight = 250;
//
// var margin = { left: 30, top: 30, right: 30, bottom: 30 };
//
// var innerWidth  = outerWidth  - margin.left - margin.right;
// var innerHeight = outerHeight - margin.top  - margin.bottom;
//
//
// var svg = d3.select("#seeker").append("svg")
// .attr("width",  outerWidth)
// .attr("height", outerHeight);
//
// var g = svg.append("g")
// .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//
// var xScale = d3.scale.linear().range([0, innerWidth]);
// var yScale = d3.scale.linear().range([innerHeight, 0]);
//
// function render(data){
//
// xScale.domain( d3.extent(data, function (d){ return d[xColumn]; }));
// yScale.domain( d3.extent(data, function (d){ return d[yColumn]; }));
//
// var circles = g.selectAll("circle").data(data);
// circles.enter().append("circle");
// circles
//  .attr("cx", function (d){ return xScale(d[xColumn]); })
//  .attr("cy", function (d){ return yScale(d[yColumn]); })
//  .attr("r",  function (d){ return rScale(d[rColumn]); });
// circles.exit().remove();
// }
//
// function type(d){
// d.population = +d.population;
// d.gdp        = +d.gdp;
// return d;
// }
//
// d3.csv("countries_population_GDP.csv", type, render);
