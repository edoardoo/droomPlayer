class Marker{
    
  constructor( startTime ){
      this.start = startTime;
      this.end = startTime;
      this.label = "";
  }

  set start( time ){
    this.start = time;
  }

  get start(){
    return this.start;
  }

  set end( time ){
    this.end = time;
  }

  get end(){
    return this.end;
  }

  set label( label ){
    this.label = label;
  }

  get label(){
    return this.label;
  }


}
