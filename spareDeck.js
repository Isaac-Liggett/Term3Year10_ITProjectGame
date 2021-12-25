class spareDeck{
  constructor(cards, dimensions, position){
    this.dimensions = dimensions;
    this.pos = position; //Will be moved relative to other cards later...
    this.cards = cards;
    this.currentShown = 0;
    this.currentCard = null;
    this.mouseState = "released";
    this.deckImg = loadImage('cards/CloversImages_15.png');
    
    for(let i = 0; i < cards.length; i++){
      cards[i].pos = createVector(this.pos.x - (91 * (this.dimensions.x / 100)) - 10, this.pos.y);
    }
    
    this.click = true; //So that the card pile isn't moved through each frame
    
    this.cards.push('endDeck'); //Aesthetic no card shown state
    this.currentShown = this.cards.length-1;
  }
  
  changeCardSizes(size){
    for(let l = 0; l < this.cards.length - 1; l++){
      this.cards[l].dimensions = createVector(size / 100, size / 100);
    }
    this.dimensions = createVector(size, size);
    for(let i = 0; i < this.cards.length - 1; i++){
      this.cards[i].pos = createVector(this.pos.x - (91 * (this.dimensions.x / 100)) - 10, this.pos.y);
    }
  }
  
  draw(){
    image(this.deckImg, this.pos.x, this.pos.y, 91 * (this.dimensions.x / 100), 126 * (this.dimensions.y / 100));
    if(this.currentShown != this.cards.length - 1){
      if(this.cards[this.currentShown] != undefined){
        this.cards[this.currentShown].mouseState = this.mouseState;
      }
      
      //Main running mechanics
      
      if(this.currentShown < 0){
        this.currentShown = 1;
      }
      
      if(this.cards[this.currentShown] != 'endDeck' && this.currentShown != 0){
        //this.cards[this.currentShown - 1].pos.x = (this.pos.x - (91 * (this.dimensions.x / 100)) - (91 * (this.dimensions.x / 100)) * 0.4)
        if(this.currentShown - 1 != undefined && this.currentShown != undefined && this.cards.length > 2){
          this.cards[this.currentShown - 1].draw();
        }
      }
      
      if(this.currentShown != undefined && this.cards.length > 1){
        this.cards[this.currentShown].draw();
        this.cards[this.currentShown].move('set');
      }
    }
    this.flipCard();
    this.getCurrentCard();
  }
  
  flipCard(){
    if(this.mouseState == "released"){
      this.click = true;
      if(this.currentShown != this.cards.length - 1 && this.cards.length > 1){
        this.cards[this.currentShown].pos = createVector(this.pos.x - (91 * (this.dimensions.x / 100)) - 10, this.pos.y);
      }
      }
    if(this.mouseOver() && this.mouseState == "pressed" && this.click){
      //flip to next card
      this.currentShown++;
      if(this.currentShown > (this.cards.length - 1)){
        this.currentShown = 0;
      }
      scene.score --;
      this.click = false;
    }
  }
  
  getCurrentCard(){
    if(this.cards.length > 1){
      if(this.cards[this.currentShown] != 'endDeck'){
        if(this.cards[this.currentShown].move('get') == 'moving'){
          this.currentCard = this.cards[this.currentShown];
          //console.log(this.currentCard.value);
        }else{
          this.currentCard = null;
        }
      }else{
        this.currentCard = null;
      }
    }
  }
  
  mouseOver(){
    if(mouseX > this.pos.x && mouseX < this.pos.x + (91 * (this.dimensions.x/100))){
      if(mouseY > this.pos.y && mouseY < this.pos.y + (126 * (this.dimensions.y / 100))){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }
  
  
}