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

            if( ! this.player.isPlaying() ){
                var bindedUpdate = this.update.bind(this);
                bindedUpdate();
            }
        }
        this.player.timeUpdateListener = listenerCallback;
    }
};
