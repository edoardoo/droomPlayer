var playerManager = function ( video ) {
	logger.debug( "droomPlayer", 'Starting up...' );

	var pm = this;
	pm.player = video;
	pm.mappedShortKeys = {};
	pm.svgContainer = document.getElementById( 'seeker' );
	pm.playStartedIndipendently = false;
	pm.shortKeyIsPressed = [];

	pm.init = () => {

		pm.initSvgManager();
		pm.initSeeker();
		pm.setListeners();
		pm.initMarkersManager();
		pm.recordingMarker = false;

	};

	pm.initSvgManager = () => {
		pm.svgManager = new SvgManager( pm.svgContainer, pm.player );
	};

	pm.initSeeker = () => {
		pm.seekerVideo = new Seeker( pm.svgContainer, pm.player, pm.svgManager );
	};

	pm.setCurrentTime = ( time ) => {
		pm.player.currentTime = time;
	};

	pm.getCurrentTime = () => {
		return pm.player.currentTime;
	};

	pm.getDuration = () => {
		return pm.player.duration;
	};

	pm.loadVideo = ( url ) => {

		pm.player.source = url;
		pm.seekerVideo.updateLength( pm.player.duration );

	};

	pm.playIndipendently = () => {
		pm.playStartedIndipendently = true;
		pm.play();
	}

	pm.play = () => {
		// console.dir(pm.isPlaying())
		if ( !pm.isPlaying() ) {

			pm.seekerVideo.startRefresh();
			pm.player.play();

		}

	};

	pm.pause = () => {
		if ( pm.isPlaying() ) {
			pm.seekerVideo.stopRefresh();
			pm.player.pause();
		}
	};

	pm.pauseIndipendently = () => {
		pm.playStartedIndipendently = false;
		pm.pause();
	}

	pm.toggle = () => {

		if ( pm.isPlaying() ) {
			pm.pause();
		} else {
			pm.play();
		}

	};

	pm.isPlaying = () => {

		return pm.player.isPlaying();

	};

	pm.seekToTime = ( time, isRelative ) => {

		var newVideoTime = ( isRelative ) ? pm.player.currentTime + time :
			time;
		newVideoTime = ( newVideoTime < 0 ) ? 0 : ( newVideoTime > pm.player
			.duration ) ? pm.player.duration : newVideoTime;
		pm.player.currentTime = newVideoTime;


	}

	pm.prepareMappedKeysObject = () => {
		pm.shortKeys.map( function ( element ) {

			let id = element.keyId;
			pm.mappedShortKeys[ id ] = element;

		} );
	};

	pm.setListeners = () => {

		pm.prepareMappedKeysObject();

		window.onkeydown = ( e ) => {

			var key = e.keyCode ? e.keyCode : e.which;
			// logger.debug( "Listeners", 'Received on key down: ' + e.keyCode );
			var shortKey = pm.mappedShortKeys[ key ];


			pm.shortKeyIsPressed[ key ] = typeof (
					pm.shortKeyIsPressed[ key ] ) === 'undefined' ?
				false : pm.shortKeyIsPressed[ key ];


			if ( typeof ( shortKey ) !== 'undefined' &&
				!pm.shortKeyIsPressed[ key ] ) {

				pm.shortKeyIsPressed[ key ] = true;
				e.preventDefault();

				shortKey.keyDown();

			}
		};

		window.onkeyup = ( e ) => {

			var key = e.keyCode ? e.keyCode : e.which;
			// logger.debug( "Listeners", 'Received on key up: ' + e.keyCode );

			var shortKey = pm.mappedShortKeys[ key ];
			if ( typeof ( shortKey ) !== 'undefined' &&
				pm.shortKeyIsPressed[ key ] ) {

				pm.shortKeyIsPressed[ key ] = false;


				e.preventDefault();

				shortKey.keyUp();
			};
		};

		window.onresize = ( e ) => {
			logger.debug( "Listeners", 'resizing.' );
			pm.svgManager.updateScales(); //ahahahah
		}

	}

	pm.markers = [];
	pm.startMarker = function () {

		pm.markersManager.startMarker()
			.then( () => {
				pm.play();
			} );

	};

	pm.stopMarker = function () {

		pm.markersManager.stopMarker()
			.then( () => {

				if ( !pm.playStartedIndipendently ) {

					pm.pause();
				}
			} );

	};

	pm.initMarkersManager = function () {
		pm.markersManager = new MarkersManager(
			pm.player,
			pm.svgManager,
			d3.select( "#markers" )
			.append( "svg" )
			.attr( "width", "100%" )
			.attr( "height", 25 )
			.attr( "style", "background-color: transparent;" )
		);
	};

	pm.shortKeys = [
        new ShortKey( 32, '[space]', 'playOnPress', 'hold', [
            pm.playIndipendently,
			pm.pauseIndipendently
        ] ),
        new ShortKey( 80, 'p', 'playToggle', 'down', pm.toggle ),
        new ShortKey( 77, 'm', 'marker', 'hold', [
            pm.startMarker,
            pm.stopMarker
        ] )
    ];


	pm.init();

	return pm;
};

var testPlayer = new HtmlPlayerWrapper();
