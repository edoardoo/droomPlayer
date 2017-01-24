class Seeker{

    constructor( player ){
        this.player = player;
        this.videoLength = 100;
        this.seconds = 0;
        this.width = 400;
        this.init();
        return;
    }
    // logger.debug('Seeker', ' video length:', this.videoLength);
    // logger.debug('Seeker', ' seeker width:', this.seekerWidth);

    init(){
        logger.debug('Seeker', ' Initializing. ');
        this.seekerTag = document.getElementById("seeker");
        this.seekerWidth = this.seekerTag.offsetWidth;
        this.width = 500;
        this.createSvg();
        // console.dir(this.player);
        this.updateLength( this.player.duration );
        this.updateTimeToPixelScale();
        this.updatePixelToTimeScale();
        this.createSeekerRectangle();
        this.setSeekerListeners();
        this.setPlayerListener();
    }

    createSvg(){

        this.svgContainer = d3.select("#seeker").append("svg")
        .attr("width", "100%")
        .attr("height", 50)
        .attr("style", "background-color: #999;");

        this.svg = d3.select("svg");

    }

    createSeekerRectangle(){

        this.rectangle = this.svgContainer.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.timeToPixelScale(this.seconds))
        .attr("height", 50)
        .attr("style", "fill: black;");

    }

    updateLength( length ){

        this.videoLength = length;
        this.updateTimeToPixelScale();
        this.updatePixelToTimeScale();

    }

    updateTimeToPixelScale(){
        this.timeToPixelScale = d3.scaleLinear()
        .domain([0, this.videoLength])
        .range([0, this.seekerWidth]);
    }

    updatePixelToTimeScale(){
        this.pixelToTimeScale = d3.scaleLinear()
        .domain([0, this.seekerWidth])
        .range([0, this.videoLength]);
    }

    update(){
        this.rectangle.attr( "width", this.timeToPixelScale( this.player.currentTime ) );

        if ( this.refresh ) {

            window.requestAnimationFrame(this.update.bind(this));

        }

    }

    startRefresh(){

        logger.debug('Seeker', ' started refreshing seeker. ');
        this.refresh = true;
        window.requestAnimationFrame(this.update.bind(this));
    }

    stopRefresh(){

        logger.debug('Seeker', ' stopped refreshing seeker. ');
        this.refresh = false;

    }

    seekTo(e){

        let timeInPixels = e.pageX - this.seekerTag.offsetLeft;
        player.currentTime = this.pixelToTimeScale( timeInPixels ) ;

    }

    setSeekerListeners(){
        this.seekerTag.addEventListener("mousedown", this.seekTo.bind(this));
        this.seekerTag.addEventListener("mouseup", function(){

        });

    }

    setPlayerListener(){

        var listenerCallback = ()=>{

            // console.dir(this);
            if( ! this.player.isPlaying() ){
                var bindedUpdate = this.update.bind(this);
                bindedUpdate();
            }
        }
        this.player.timeUpdateListener = listenerCallback;
    }
};



var playerManager = function( video ){
    logger.debug("droomPlayer", 'Starting up...');

    var pm = this;
    pm.player = video;
    pm.mappedShortKeys = {};

    pm.init = ()=>{

        pm.initSeeker();
        pm.setListeners();

    }

    pm.initSeeker = ()=>{

        // console.dir(typeof(pm.player))
        pm.seekerVideo = new Seeker(  pm.player );
        //
        // pm.player.addEventListener("timeupdate", function(){
        //     if( ! pm.isPlaying() ){
        //         pm.seekerVideo.update();
        //     }
        // });

    }

    pm.setCurrentTime = ( time )=>{
        pm.player.currentTime = time ;
    }

    pm.getCurrentTime = ()=>{
        return pm.player.currentTime;
    }

    pm.getDuration = ()=>{
        return pm.player.duration;
    }

    pm.loadVideo = ( url )=>{

        pm.player.source = url ;
        pm.seekerVideo.updateLength( pm.player.duration );

    }

    pm.play = ()=>{
        // console.dir(pm.isPlaying())
        if ( !pm.isPlaying() ) {

            pm.seekerVideo.startRefresh();
            pm.player.play();

        }

    };

    pm.pause = ()=>{
        if ( pm.isPlaying() ) {
            pm.seekerVideo.stopRefresh();
            pm.player.pause();
        }
    };

    pm.toggle = ()=>{

        if( pm.isPlaying() ){
            pm.pause();
        }else{
            pm.play();
        }

    };

    pm.isPlaying = ()=>{

        return pm.player.isPlaying();

    };

    pm.seekToTime = ( time, isRelative )=>{

        var newVideoTime = ( isRelative ) ? pm.player.currentTime + time : time;
        newVideoTime = ( newVideoTime < 0 ) ? 0 : ( newVideoTime > pm.player.duration ) ? pm.player.duration : newVideoTime;
        pm.player.currentTime = newVideoTime ;


    }

    pm.prepareMappedKeysObject = ()=>{
        pm.shortKeys.map(function( element ){

            let id =  element.keyId;
            pm.mappedShortKeys[id] = element;

        });
    }

    pm.setListeners = ()=>{

        pm.prepareMappedKeysObject();

        window.onkeydown = (e)=>{

            var key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key down: '+ e.keyCode);
            var shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyDown();

            }
        }

        window.onkeyup = (e)=>{

            var key = e.keyCode ? e.keyCode : e.which;
            e.preventDefault();
            logger.debug("Listeners", 'Received on key up: '+ e.keyCode);
            var shortKey = pm.mappedShortKeys[key];
            if( typeof(shortKey) !== 'undefined'){

                shortKey.keyUp();
            }
        }

    }

    pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress' , 'hold', [pm.play, pm.pause] ),
        new ShortKey( 80, 'p', 'playToggle'  , 'down', pm.toggle )
    ];


    pm.init();

    return pm;
}

var testPlayer = new HtmlPlayerWrapper();
