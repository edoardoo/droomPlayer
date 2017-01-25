class Rectangle{
    constructor( container, color, width ){

        this.color = color;
        this._width = width;
        this.container = container;
        this.initSvgRectangle();
        return;
    }

    set svgElement( e ){
        this._svgElement = e;
    }

    get svgElement(){
        return this._svgElement;
    }

    set color( color ){
        this._color = color;
    }

    get color(){
        return this._color;
    }

    set width( width ){

        this._width = width;
        this._svgElement.attr( "width", width );

    }

    get width(){
        return this._width;

    }

    set svgWidth( width ){

        this._svgElement.attr( "width", width );

    }

    get svgWidth(){

        return this._svgElement.attr( "width" );

    }

    set container( container ){
        this._container = container;
    }

    get container(){
        return this._container;
    }

    initSvgRectangle(){
        this.svgElement = this.container.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.width)
        .attr("height", 50)
        .attr("style", "fill:" + this.color +";");
    }



}
