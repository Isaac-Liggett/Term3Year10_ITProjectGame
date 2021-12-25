class suiteDeposit{
  constructor(dimensions, position, type){
    this.dimensions = createVector(dimensions.x / 100, dimensions.y / 100);
    this.pos = position;
    this.type = type;
    if(this.type == 'S' || this.type == 'C'){
      this.color = 'B';
    }else{
      this.color = 'R';
    }
    this.value = 0;
    this.prevValue = 0;
    this.currentDisplayedCard = null;
    this.mouseState = 'released';
    
    switch(this.type){
      case 'S':
        this.image = loadImage('cards/SpadesPlacement.png');
        break;
        
      case 'C':
        this.image = loadImage('cards/CloversPlacement.png');
        break;
        
      case 'H':
        this.image = loadImage('cards/HeartsPlacement.png');
        break;
        
      case 'D':
        this.image = loadImage('cards/DiamondsPlacement.png');
        break;
    }
  }
  
  changeSize(size){
    this.dimensions = createVector(size / 100, size / 100);
  }
  
  draw(){
    image(this.image, this.pos.x, this.pos.y, (91 * this.dimensions.x), (126 * this.dimensions.y));
    
    if(this.prevValue != this.value){
      switch(this.value){
        case 11:
          this.currentDisplayedCard = new Card(this.type + 'J', 'shown', createVector(this.pos.x, this.pos.y), createVector(this.dimensions.x * 100, this.dimensions.y * 100));
          break;
          
        case 12:
          this.currentDisplayedCard = new Card(this.type + 'Q', 'shown', createVector(this.pos.x, this.pos.y), createVector(this.dimensions.x * 100, this.dimensions.y * 100));
          break;
          
        case 13:
          this.currentDisplayedCard = new Card(this.type + 'K', 'shown', createVector(this.pos.x, this.pos.y), createVector(this.dimensions.x * 100, this.dimensions.y * 100));
          break;
          
        case 0:
          this.currentDisplayedCard = null;
          this.currentCard = null;
          break;
          
        default:
          this.currentDisplayedCard = new Card(this.type + this.value, 'shown', createVector(this.pos.x, this.pos.y), createVector(this.dimensions.x * 100, this.dimensions.y * 100));
          break;
      }
      
    }
    
    if(this.currentDisplayedCard != null){
      this.currentDisplayedCard.mouseState = this.mouseState;
      
      this.currentDisplayedCard.dimensions = this.dimensions;
      this.currentDisplayedCard.draw();
      
      if(this.mouseState == 'released'){
        this.currentDisplayedCard.pos = this.pos;
      }
    }
    
    this.prevValue = this.value;
  }
  
  moveCard(){
    if(this.currentDisplayedCard != null){
      this.currentDisplayedCard.move('set');
      
      if(this.currentDisplayedCard.move('get') == 'moving'){
        this.currentCard = this.currentDisplayedCard;
      }else{
        this.currentCard = null;
      }
    }
  }
  
  mouseOver(){
    if(mouseX > this.pos.x && mouseX < this.pos.x + (91 * (this.dimensions.x))){
      if(mouseY > this.pos.y && mouseY < this.pos.y + (126 * (this.dimensions.y))){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  
}