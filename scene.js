class Scene{
  constructor(){
    this.positions = [];
    this.spare = [];
    this.mouseState = "released";
    this.yOffset_mainCards = 140;
    this.movingCards = [];
    this.specdraw = null;
    this.prevCardType = null;
    this.suiteDeposits = [];
    this.score = 0;
    this.win = false;
    this.cardWidth = 91 * 0.75;
    this.cardHeight = 126 * 0.75;
    this.particles = [];
    this.spareDeck = null;
  }
  
  endGame(){
    for(let i = 0; i < this.suiteDeposits.length; i++){
      this.suiteDeposits[i].value = 13;
    }
    return 'ended game';
  }
  
  resizeCards(size){
    this.cardSize = size;
    this.cardWidth = 91 * (this.cardSize / 100);
    this.cardHeight = 126 * (this.cardSize / 100);
    
    for(let i = 0; i < this.positions.length - 1; i++){
      this.positions[i][0].pos.x = this.cardWidth * (i + 1) + ((windowWidth - (this.cardWidth * 7)) / 2);
      for(let a = 0; a < this.positions[i].length; a++){
        this.positions[i][a].dimensions = createVector(size / 100, size / 100);
      }
    }
    
    this.spareDeck.pos.x = this.cardWidth * 6;
    
    for(let i = 0; i < this.suiteDeposits.length; i++){
      this.suiteDeposits[i].changeSize(size);
      this.suiteDeposits[i].pos = createVector(this.suiteDepOffset.x + (i*(91 * (size / 100)) + ((windowWidth - (this.cardWidth * 7)) / 2)), this.suiteDepOffset.y)
    }
    this.spareDeck.pos.x = ((windowWidth - (this.cardWidth * 7)) / 2) + this.cardWidth * 6;
    this.spareDeck.changeCardSizes(size);
  }
  
  createSet(cardSize){
    this.cardSize = cardSize;
    this.deckOfCards = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK',
                        'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK',
                        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK',
                        'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK'];
    let ac = 1;
    this.cardWidth = 91 * (cardSize / 100);
    for(let i = 0; i <= 7; i++){
      this.positions[i] = [];
    }
    for(let i = 0; i < 7; i++){
      this.positions[i].push(new Placeholder(createVector(i * this.cardWidth, this.yOffset_mainCards), createVector(cardSize, cardSize)))
      for(let a = 0; a < ac; a++){
        this.card = Math.floor(Math.random() * this.deckOfCards.length);
        if(a==ac - 1){
          this.positions[i].push(new Card(this.deckOfCards[this.card], 'shown', createVector(i * this.cardWidth, this.yOffset_mainCards), createVector(cardSize, cardSize)));
        }else{
          this.positions[i].push(new Card(this.deckOfCards[this.card], 'hidden', createVector(i * this.cardWidth, this.yOffset_mainCards), createVector(cardSize, cardSize)));
        }
          this.deckOfCards.splice(this.card, 1);
      }
      ac++;
    }
    //Add remainding to Card Deck
    while(this.deckOfCards.length != 0){
      this.card = Math.floor(Math.random() * this.deckOfCards.length);
      this.spare.push(new Card(this.deckOfCards[this.card], 'shown', createVector(10, 10), createVector(cardSize, cardSize)));
      this.deckOfCards.splice(this.card, 1);    
    }
    this.spareDeck = new spareDeck(this.spare, createVector(cardSize, cardSize), createVector(480, 10));
    
    let suiteDepOffset = createVector(10, 10);
    this.suiteDepOffset = suiteDepOffset;
    this.suiteDeposits = [new suiteDeposit(createVector(cardSize, cardSize), createVector(suiteDepOffset.x + (0*(91 * (cardSize / 100))), suiteDepOffset.y), 'H'),
                          new suiteDeposit(createVector(cardSize, cardSize), createVector(suiteDepOffset.x + (1*(91 * (cardSize / 100))), suiteDepOffset.y), 'S'),
                          new suiteDeposit(createVector(cardSize, cardSize), createVector(suiteDepOffset.x + (2*(91 * (cardSize / 100))), suiteDepOffset.y), 'D'),
                          new suiteDeposit(createVector(cardSize, cardSize), createVector(suiteDepOffset.x + (3*(91 * (cardSize / 100))), suiteDepOffset.y), 'C')]
    this.resizeCards(cardSize);
  }
  
  displayScore(){
    document.getElementById('score').innerText = "Score: " + this.score;
  }
  
  drawAll(){
    this.displayScore();
    for(let k = 0; k < this.positions.length; k++){
      for(let j = 0; j < this.positions[k].length; j++){
        this.positions[k][j].draw();
      }
    }
    for(let i = 0; i <= this.suiteDeposits.length - 1; i++){
      this.suiteDeposits[i].draw();
    }
    this.spareDeck.draw();
    this.shareState();
    this.relocateCard();
    this.moveAll();
    
    if(this.suiteDeposits[0].value == 13 && this.suiteDeposits[1].value == 13 && this.suiteDeposits[2].value == 13 && this.suiteDeposits[3].value == 13){
      this.win = true;
    }
    
    if(this.win == true){
      fill('gold');
      textSize(100);
      text('WIN!!!', mouseX, mouseY);
      timePaused();
    }
    
    if(this.spareDeck.currentCard != null){
      this.spareDeck.currentCard.draw();
    }
  }//End drawAll
  
  
  moveAll(){
    if(this.suiteDeposits[0].currentCard == null && this.suiteDeposits[1].currentCard == null
      && this.suiteDeposits[2].currentCard == null && this.suiteDeposits[3].currentCard == null){
        for(let i = 0; i < this.positions.length; i++){
          for(let a = this.positions[i].length - 1; a > 0; a--){
            if(this.mouseState == "released"){
              this.positions[i][a].move("set");
              this.currentCard = null;
            }
            this.moveReturn = this.positions[i][a].move("get");
            if(this.moveReturn == "moving" && this.currentCard == null){
              this.currentCard = this.positions[i][a];
              this.currentCardPos = [i, a];
            }
          }
        }
    }
    
    if(this.currentCard != null && this.currentCardPos != null){
      for(let i = this.currentCardPos[1]; i < this.positions[this.currentCardPos[0]].length; i++){
        this.positions[this.currentCardPos[0]][i].draw();
      }
      this.currentCard.move("set");
    }else{
      for(let i = 0; i < this.suiteDeposits.length; i++){
        this.suiteDeposits[i].moveCard();
      }
    }
    this.resetPosition();
  }
  
  
  shareState(){
    for(let i = 0; i < this.positions.length; i++){
      for(let a = 0; a < this.positions[i].length; a++){
        this.positions[i][a].mouseState = this.mouseState;
      }
    }
    for(let i = 0; i < this.suiteDeposits.length; i++){
      this.suiteDeposits[i].mouseState = this.mouseState;
    }
    this.spareDeck.mouseState = this.mouseState;
  }
  
  
  resetPosition(){
    for(let i = 0; i < this.positions.length; i++){
      //Flip Card at end of pile
      if(this.positions[i].length != 0){
        this.positions[i][this.positions[i].length - 1].state = "shown";
      }
      //Move card back to respective pile
      for(let a = 0; a < this.positions[i].length; a++){
        if(this.positions[i][a] != this.currentCard){
          if(a == 0){
            this.positions[i][a].pos.x = i * this.cardWidth + ((windowWidth - (this.cardWidth * 7)) / 2);
            this.positions[i][a].pos.y = this.cardHeight + 2;
          }else if(a > 0){
            this.positions[i][a].pos.x = this.positions[i][a-1].pos.x;
            this.positions[i][a].pos.y = this.positions[i][a-1].pos.y + (this.cardHeight * 0.3);
          }
        }
      }
    }
  }
  
  
  relocateCard(){
    if(this.prevCardType == 'spare-deposit' && this.mouseState == 'released'){
      this.spareDeck.cards.splice(this.prevCurrentCardPos[1], 1);
      this.spareDeck.currentShown --;
      switch(this.cardBaseType){
        case 'C':
          this.suiteDeposits[3].value ++;
          break;
          
        case 'H':
          this.suiteDeposits[0].value ++;
          break;
          
        case 'S':
          this.suiteDeposits[1].value ++;
          break;
          
        case 'D':
          this.suiteDeposits[2].value ++;
          break;
      }
      
      this.score += 10;
      this.prevCurrentCardPos = null;
      this.prevCardType = null;
      this.cardBaseType = null;
    }
    if(this.prevCardType == 'deposit-main' && this.mouseState == 'released'){
      this.positions[this.hoverCardPos[0]].push(new Card(this.cardBaseType, 'shown', createVector(0, 0), createVector(this.cardSize, this.cardSize)));
      switch(this.cardBaseType[0]){
        case 'C':
          this.suiteDeposits[3].value --;
          break;
          
        case 'H':
          this.suiteDeposits[0].value --;
          break;
          
        case 'S':
          this.suiteDeposits[1].value --;
          break;
          
        case 'D':
          this.suiteDeposits[2].value --;
          break;
      }
      
      this.prevCurrentCard = null;
      this.prevCurrentCardPos = null;
      this.hoverCard = null;
      this.prevCardType = null;
    }
    if(this.prevCardType == 'placement' && this.mouseState == 'released'){
      this.movingCards = [];
      switch(this.hoverCard){
        case 'S':
          this.suiteDeposits[1].value ++;
          this.positions[this.prevCurrentCardPos[0]].splice(this.prevCurrentCardPos[1], 1);
          break;
          
        case 'C':
          this.suiteDeposits[3].value ++;
          this.positions[this.prevCurrentCardPos[0]].splice(this.prevCurrentCardPos[1], 1);
          break;
          
        case 'D':
          this.suiteDeposits[2].value ++;
          this.positions[this.prevCurrentCardPos[0]].splice(this.prevCurrentCardPos[1], 1);
          break;
          
        case 'H':
          this.suiteDeposits[0].value ++;
          this.positions[this.prevCurrentCardPos[0]].splice(this.prevCurrentCardPos[1], 1);
          break;
      }
      this.score += 10;
    }else{
      if(this.spareDeck.currentCard != null){
        this.currentCard = this.spareDeck.currentCard;
        this.currentCardType = 'spare';
      }else{
        this.currentCradType = 'main';
      }

      if(this.prevCurrentCard != null && this.mouseState == "released"){
        if(this.prevCardType == 'main'){
          if(this.hoverCard.mouseOver()){
            //put cards there
            for(let i = this.prevCurrentCardPos[1]; i < this.positions[this.prevCurrentCardPos[0]].length; i++){
              this.positions[this.hoverCardPos[0]].push(this.positions[this.prevCurrentCardPos[0]][i]);
            }
            //remove moved cards
            this.positions[this.prevCurrentCardPos[0]].splice(this.prevCurrentCardPos[1], this.positions[this.prevCurrentCardPos[0]].length - this.prevCurrentCardPos[1])
            this.score ++;
          }
        }else if(this.prevCardType == 'spare'){
          if(this.hoverCard.mouseOver()){
            this.positions[this.hoverCardPos[0]].push(this.spareDeck.cards[this.prevCurrentCardPos[1]]);
            this.spareDeck.cards.splice(this.prevCurrentCardPos[1], 1);
            this.spareDeck.currentShown --;
            this.score += 5;
          }
        }        
      }
    }
    
    this.prevCurrentCard = null;
    this.prevCurrentCardPos = null;
    this.hoverCard = null;
    
    //checking for hovering cards and whether they can go together etc
    this.suiteDepositsCurrent = null;
    for(let i = 0; i < this.suiteDeposits.length; i++){
      if(this.suiteDeposits[i].currentCard != null){
        this.suiteDepositsCurrent = this.suiteDeposits[i];
        this.suiteDepositsCurrentType = this.suiteDeposits[i].type;
        break;
      }
    }
    
    if(this.suiteDepositsCurrent != null){
      for(let i = 0; i < this.positions.length - 1; i++){
          if(this.positions[i][this.positions[i].length - 1].move('get') == 'moving'){
            this.hoverCard = this.positions[i][this.positions[i].length - 1];
            this.hoverCardPos = [i, this.positions[i].length - 1];
            //Next: check if card can be put in location
            if(this.suiteDepositsCurrent.currentCard.type != this.hoverCard.value[0]){
               if(parseInt(this.suiteDepositsCurrent.currentCard.value[1]) + 1 == parseInt(this.hoverCard.value[1])){
                 console.log('deposit card yes');
                 this.prevCurrentCardPos = ['deposit', this.suiteDepositsCurrentType];
                 this.prevCurrentCard = this.suiteDepositsCurrent;
                 this.prevCardType = 'deposit-main';
                 this.cardBaseType = this.suiteDepositsCurrent.currentCard.baseType;
               }
            }
          }
        }
    }else{
      if(this.spareDeck.currentCard != null){
        this.prevCardType = 'spare';
        for(let i = 0; i < this.positions.length - 1; i++){
          if(this.positions[i][this.positions[i].length - 1].move('get') == 'moving'){
            this.hoverCard = this.positions[i][this.positions[i].length - 1];
            this.hoverCardPos = [i, this.positions[i].length - 1];
            //Next: check if card can be put in location
            if(this.spareDeck.currentCard.value[0] != this.hoverCard.value[0]){
               if(parseInt(this.spareDeck.currentCard.value[1]) + 1 == parseInt(this.hoverCard.value[1])){
                 this.prevCurrentCardPos = ['spare', this.spareDeck.currentShown];
                 this.prevCurrentCard = this.spareDeck.currentCard;
               }
            }
          }
        }
        for(let i = 0; i < this.suiteDeposits.length; i++){
          if(this.suiteDeposits[i].mouseOver()){
            if(this.suiteDeposits[i].type == this.spareDeck.currentCard.type[0]){
              if(this.suiteDeposits[i].value + 1 == parseInt(this.spareDeck.currentCard.value[1])){
                this.prevCurrentCardPos = ['spare', this.spareDeck.currentShown];
                this.prevCurrentCard = this.spareDeck.currentCard;
                this.prevCardType = 'spare-deposit';
                this.cardBaseType = this.suiteDeposits[i].type;
              }
            }
          }
        }
      }else{
        if(this.currentCard != null){
          this.prevCardType = 'main';
          for(let i = 0; i < this.positions.length - 1; i++){
            if(this.positions[i][this.positions[i].length - 1].move('get') == "moving" && this.positions[i][this.positions[i].length - 1] != this.currentCard && this.positions[i][this.positions[i].length - 1].state == "shown"){
              //currentCard hovered over another card
              if(this.currentCard.value[0] != this.positions[i][this.positions[i].length - 1].value[0]){
                //currentCard is opposite colour
                if(parseInt(this.positions[i][this.positions[i].length - 1].value[1]) - 1 == parseInt(this.currentCard.value[1])){
                  this.prevCurrentCard = this.currentCard;
                  this.prevCurrentCardPos = this.currentCardPos;
                  this.hoverCard = this.positions[i][this.positions[i].length - 1];
                  this.hoverCardPos = [i, this.positions[i].length - 1];
                }
              }
            }
          }
          //testing for hovering over suiteDeposit
          for(let i = 0; i < this.suiteDeposits.length; i++){
            if(this.suiteDeposits[i].mouseOver()){
              if((this.positions[this.currentCardPos[0]].length - 1) - this.currentCardPos[1] == 0){
                if(this.currentCard.type[0] == this.suiteDeposits[i].type){
                  if(parseInt(this.currentCard.value[1]) == this.suiteDeposits[i].value + 1){
                    this.prevCurrentCard = this.currentCard;
                    this.prevCurrentCardPos = this.currentCardPos;
                    this.prevCardType = 'placement';
                    this.hoverCard = this.suiteDeposits[i].type;
                  }
                }
              }
            }
          }
        }
      }
    }
  }  
}