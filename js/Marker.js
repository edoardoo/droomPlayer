class Marker {

	constructor( startTime, svgContainer, svgManager ) {
		this._start = startTime;
		this._end = startTime;
		this._label = "";
		this._rectangle = new Rectangle(
			svgContainer,
			"#80DEEA",
			svgManager.timeToPixelScale( this._start ),
			svgManager.timeToPixelScale( this._end - this._start )
		);

	}

	set start( time ) {
		this._start = time;
	}

	get start() {
		return this._start;
	}

	set end( time ) {
		this._end = time;
		this._rectangle.width = svgManager.timeToPixelScale( time - this._start );
	}

	get end() {
		return this._end;
	}

	set label( label ) {
		this._label = label;
	}

	get label() {
		return this._label;
	}

	set rectangle( rectangle ) {
		this._rectangle = rectangle;
	}

	get rectangle() {
		return this._rectangle;
	}


}
