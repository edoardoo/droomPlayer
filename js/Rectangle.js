class Rectangle {
	constructor( container, color, start, width, htmlId ) {

		this.color = color;
		this._width = width;
		this._start = start;
		this._htmlId = htmlId;
		this._container = container;
		this.initSvgRectangle();
		return;
	}

	set svgElement( e ) {
		this._svgElement = e;
	}

	get svgElement() {
		return this._svgElement;
	}

	set color( color ) {
		this._color = color;
	}

	get color() {
		return this._color;
	}

	set width( width ) {

		this._width = width;
		this._svgElement.attr( "width", width );

	}

	get width() {
		return this._width;

	}

	set start( start ) {
		this._start = start;
	}

	get start() {
		return this._width;
	}

	set svgWidth( width ) {

		this._svgElement.attr( "width", width );

	}

	get svgWidth() {

		return this._svgElement.attr( "width" );

	}

	set container( container ) {
		this._container = container;
	}

	get container() {
		return this._container;
	}

	initSvgRectangle() {
		this.svgElement = this._container.append( "rect" )
			.attr( "id", this._htmlId )
			.attr( "x", this._start )
			.attr( "y", 0 )
			.attr( "width", this._width )
			.attr( "height", 25 )
			.attr( "style", "fill:" + this.color + ";" );
	}

}
