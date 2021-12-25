class particle{
  constructor(size, pos){
    this.size = size;
    this.pos=pos;
    this.velocity = createVector(this.getRandomNo(-0.5, 0.5), -2);
    let possibleColours = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
    let randomCol = Math.round(this.getRandomNo(0, 4));
    this.colour = possibleColours[randomCol];
  }
  
  draw(){
    fill(this.colour)
    circle(this.pos.x, this.pos.y, this.size);
    this.pos.y += this.velocity.y;
    this.velocity.y += 0.2;
    this.pos.x += this.velocity.x;
    if(this.velocity.x > 0){
      this.velocity.x - 0.2;
    }else{
      this.velocity.x + 0.2;
    }
  }
  
  getRandomNo(min, max) {
  return Math.random() * (max - min) + min;
}
}