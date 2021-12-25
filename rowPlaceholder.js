class Placeholder{
  constructor(position=createVector(0, 0), size){
    this.pos = createVector(position.x, position.y);
    this.dimensions = createVector(size.x / 100, size.y / 100); //Size is in a % of the original image
    this.mouseState = "released";
    this.value = ['placeholder','14']
  }
  
  draw(){
    /*
    noFill();
    rect(this.pos.x, this.pos.y, 100 * this.dimensions.x, 131 * this.dimensions.y)
  */
  }
  
  move(returnType){
    if(returnType == "set"){
      if(this.mouseState == "pressed" && this.mouseOver() && this.state == "shown"){
        //this.pos = createVector(mouseX - this.offset.x, mouseY - this.offset.y);
      }
    }else{
      if(this.mouseState == "pressed" && this.mouseOver()){
        return "moving";
      }else{
        return "static";
      }
    }
    this.offset = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
  }
  
  mouseOver(){
    if(mouseX > this.pos.x && mouseX < this.pos.x + (100 * this.dimensions.x)){
        if(mouseY > this.pos.y && mouseY < this.pos.y + (131 * this.dimensions.y)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
  }
}






