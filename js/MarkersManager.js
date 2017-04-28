class MarkersManager {
	constructor( media, svgManager, svgContainer ) {
		this._markers = [];
		this._media = media;
		this._svgManager = svgManager;
		this._svgContainer = svgContainer;
		this._refresh = false;
		this._currentMarker = 0;
		return;
	}

	set markers( markers ) {
		this._markers = markers;
	}

	get markers() {
		return this._markers;
	}

	get isRunning() {
		return this._refresh;
	}

	set media( media ) {
		this._media = media;
	}

	get media() {
		return this._media;
	}

	startMarker() {
		logger.debug( "Markers Manager", "start refreshing. " );

		let complete = Q.defer();
		var shouldAttachToPrevious = false;
		this._refresh = true;

		if ( this._markers.length > 0 && !this._recordingMarker ) {


			var currentEndTime = this._media.currentTime - this._markers[
				this._markers.length - 1 ].end;

			var shouldAttachToPrevious = currentEndTime < 0.5 &&
				currentEndTime >= 0;

			if ( shouldAttachToPrevious ) {
				logger.debug( "Markers Manager", "attaching to previous marker." );
			}


		}

		if ( !this._recordingMarker && !shouldAttachToPrevious ) {

			logger.debug( "Markers Manager", "creating new marker. " );

			this._currentMarker = this._markers.push(
				new Marker(
					this._media.currentTime,
					this._svgContainer,
					this._svgManager
				)
			) - 1;
			this._recordingMarker = true;
			complete.resolve();

		}
		window.requestAnimationFrame( this.update.bind( this ) );
		complete.resolve();


		return complete.promise;
	}

	stopMarker() {

		logger.debug( "Markers Manager", "stop refreshing. " );
		let complete = Q.defer();
		this._recordingMarker = false;
		this._refresh = false;
		this._markers[ this._currentMarker ].end = this._media.currentTime;

		complete.resolve();

		return complete.promise;

	}

	createMarker() {

	}


	update() {

		// logger.debug( "Markers Manager", "state of refresh: " + this._refresh );
		this._markers[ this._currentMarker ].end = this._media.currentTime;

		if ( this._refresh ) {

			window.requestAnimationFrame( this.update.bind( this ) );

		}


	}





}
