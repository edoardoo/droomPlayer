class Seeker {

	constructor( container, player, svgManager ) {
		this.player = player;
		this.svgManager = svgManager;
		this.videoLength = 100;
		this.seconds = 0;
		this.width = 400;
		this.container = container;
		this.init();
		return;
	}

	init() {
		logger.debug( 'Seeker', ' Initializing. ' );

		this.createSvg();
		this.createSeekerRectangle();
		this.setSeekerListeners();
		this.setPlayerListener();

	}

	set container( container ) {
		this._container = container;
	}

	get container() {
		return this._container;
	}

	createSvg() {

		this.svgContainer = d3.select( "#seeker" )
			.append( "svg" )
			.attr( "width", "100%" )
			.attr( "height", 25 )
			.attr( "style", "background-color: #414141;" );

		this.svg = d3.select( "svg" );

	}

	createSeekerRectangle() {

		this.rectangle = new Rectangle(
			this.svgContainer,
			"#222",
			0,
			this.svgManager.timeToPixelScale( this.seconds ),
			"seeker"
		);

	}

	update() {

		this.rectangle.width = this.svgManager.timeToPixelScale(
			this.player.currentTime
		);

		if ( this.refresh ) {

			window.requestAnimationFrame( this.update.bind( this ) );

		}

	}

	startRefresh() {

		logger.debug( 'Seeker', ' started refreshing seeker. ' );
		this.refresh = true;
		window.requestAnimationFrame( this.update.bind( this ) );
	}

	stopRefresh() {

		logger.debug( 'Seeker', ' stopped refreshing seeker. ' );
		this.refresh = false;

	}

	seekTo( e ) {

		let timeInPixels = e.pageX - this.container.offsetLeft;
		player.currentTime = this.svgManager.pixelToTimeScale(
			timeInPixels
		);

	}

	setSeekerListeners() {

		this.container.addEventListener(
			"mousedown",
			this.seekTo.bind( this )
		);

	}

	setPlayerListener() {

		var listenerCallback = () => {

			if ( !this.player.isPlaying() ) {
				var bindedUpdate = this.update.bind( this );
				bindedUpdate();
			}
		}
		this.player.timeUpdateListener = listenerCallback;
	}
};
