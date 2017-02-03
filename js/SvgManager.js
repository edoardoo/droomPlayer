class SvgManager {

	constructor( container, media ) {

		this.media = media;
		this.mediaLength = this.media.duration;
		this.svgTag = container;
		this.svgWidth = this.svgTag.offsetWidth;
		this.updateScales();
		// this.createSeekerRectangle();
		return;

	}

	updateScales( length ) {

		var dimensions = {
			svgWidth: this.svgWidth,
			videoLength: this.mediaLength
		}

		this.timeToPixelScale = dimensions;
		this.pixelToTimeScale = dimensions;

	}

	set mediaLength( length ) {
		this._mediaLength = length;
		this.updateScales();
	}

	get mediaLength() {
		return this._mediaLength;
	}

	set timeToPixelScale( dimensions ) {
		this._timeToPixelScale = d3.scaleLinear()
			.domain( [ 0, dimensions.videoLength ] )
			.range( [ 0, dimensions.svgWidth ] );
	}

	get timeToPixelScale() {
		return this._timeToPixelScale;
	}

	set pixelToTimeScale( dimensions ) {
		this._pixelToTimeScale = d3.scaleLinear()
			.domain( [ 0, dimensions.svgWidth ] )
			.range( [ 0, dimensions.videoLength ] );
	}

	get pixelToTimeScale() {
		return this._pixelToTimeScale;
	}

	// update( selector ) {
	//
	// 	if ( typeof ( selector ) !== 'undefined' ) {
	// 		//update a single rectangle
	// 	} else {
	// 		//update all the rectangles
	// 	}
	//
	// }

	// set svgTag( tag ){
	//     this._svgTag = tag;
	// }
	//
	// get svgTag(){
	//     return this._svgTag;
	// }


}
