class Marker{

  constructor( startTime ){
      this._start = startTime;
      this._end = startTime;
      this._label = "";
  }

  set start( time ){
    this._start = time;
  }

  get start(){
    return this._start;
  }

  set end( time ){
    this._end = time;
  }

  get end(){
    return this._end;
  }

  set label( label ){
    this._label = label;
  }

  get label(){
    return this._label;
  }


}
