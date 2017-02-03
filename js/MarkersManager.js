class MarkersManager {
	constructor( media, svgManager, svgContainer ) {
		this._markers = [];
		this._media = media;
		this._svgManager = svgManager;
		this._svgContainer = svgContainer;
		this._recordingMedia = false;
		this._currentMarker = 0;
		return;
	}

	set markers( markers ) {
		this._markers = markers;
	}

	get markers() {
		return this._markers;
	}

	set media( media ) {
		this._media = media;
	}

	get media() {
		return this._media;
	}

	startMarker() {

		let complete = Q.defer();
		var shouldAttachToPrevious = false;

		if ( this._markers.length > 0 && !this._recordingMarker ) {

			console.log( this._media.currentTime - this._markers[
				this._markers.length - 1 ].end )
			var shouldAttachToPrevious = this._markers.length > 0 && this._media
				.currentTime - this._markers[
					this._markers.length - 1 ].end < 0.5;
		}

		if ( !this._recordingMarker && !shouldAttachToPrevious ) {

			this._currentMarker = this._markers.push(
				new Marker(
					this._media.currentTime,
					this._svgContainer,
					this._svgManager
				)
			) - 1;
			this._recordingMarker = true;
			complete.resolve();

		} else {
			this._markers[ this._currentMarker ].end = this._media.currentTime;
		}

		complete.resolve();


		return complete.promise;
	}

	stopMarker() {

		let complete = Q.defer();
		this._recordingMarker = false;
		this._markers[ this._currentMarker ].end = this._media.currentTime;
		complete.resolve();

		return complete.promise;

	}

	update() {

	}





}
