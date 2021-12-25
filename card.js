class Card{
  constructor(type, state, position=createVector(0, 0), size){
    this.baseType = type;
    this.type = type.split('');
    if(this.type[2] == 0){
      this.type[1] = '10';
      this.type.splice(2, 1);
    }
    this.pos = createVector(position.x, position.y);
    this.offset = createVector(0, 0);
    this.state = state;
    this.hidden = loadImage("cards/CloversImages_15.png");
    this.dimensions = createVector(size.x / 100, size.y / 100); //Size is in a % of the original image
    this.mouseState = "released";
    this.locked = false;
    this.value = type.split("");
    if(this.value[2] == "0"){
      this.value[1] = "10";
      this.value.splice(2, 1);
    }
    switch(this.value[1]){
      case "J":
        this.value[1] = "11";
        break;
      case "Q":
        this.value[1] = "12";
        break;
      case "K":
        this.value[1] = "13";
        break;
    }
    if(this.value[0] == "C" || this.value[0] == "S"){
      this.value[0] = "B";
    }else{
      this.value[0] = "R";
    }
    
    this.loadImage(type);
  }
  
  loadImage(type){
    switch(type){ //Assigns face up image
      case 'C1':
        this.shown = loadImage("cards/CloversImages_01.png");
        break;
      case 'C2':
        this.shown = loadImage("cards/CloversImages_02.png");
        break;
      case 'C3':
        this.shown = loadImage("cards/CloversImages_03.png");
        break;
      case 'C4':
        this.shown = loadImage("cards/CloversImages_04.png");
        break;
      case 'C5':
        this.shown = loadImage("cards/CloversImages_05.png");
        break;
      case 'C6':
        this.shown = loadImage("cards/CloversImages_06.png");
        break;
      case 'C7':
        this.shown = loadImage("cards/CloversImages_07.png");
        break;
      case 'C8':
        this.shown = loadImage("cards/CloversImages_08.png");
        break;
      case 'C9':
        this.shown = loadImage("cards/CloversImages_09.png");
        break;
      case 'C10':
        this.shown = loadImage("cards/CloversImages_10.png");
        break;
      case 'CJ':
        this.shown = loadImage("cards/CloversImages_11.png");
        break;
      case 'CQ':
        this.shown = loadImage("cards/CloversImages_12.png");
        break;
      case 'CK':
        this.shown = loadImage("cards/CloversImages_13.png");
        break;
      //Start of Hearts
      case 'H1':
        this.shown = loadImage("cards/HeartsImages_01.png");
        break;
      case 'H2':
        this.shown = loadImage("cards/HeartsImages_02.png");
        break;
      case 'H3':
        this.shown = loadImage("cards/HeartsImages_03.png");
        break;
      case 'H4':
        this.shown = loadImage("cards/HeartsImages_04.png");
        break;
      case 'H5':
        this.shown = loadImage("cards/HeartsImages_05.png");
        break;
      case 'H6':
        this.shown = loadImage("cards/HeartsImages_06.png");
        break;
      case 'H7':
        this.shown = loadImage("cards/HeartsImages_07.png");
        break;
      case 'H8':
        this.shown = loadImage("cards/HeartsImages_08.png");
        break;
      case 'H9':
        this.shown = loadImage("cards/HeartsImages_09.png");
        break;
      case 'H10':
        this.shown = loadImage("cards/HeartsImages_10.png");
        break;
      case 'HJ':
        this.shown = loadImage("cards/HeartsImages_11.png");
        break;
      case 'HQ':
        this.shown = loadImage("cards/HeartsImages_12.png");
        break;
      case 'HK':
        this.shown = loadImage("cards/HeartsImages_13.png");
        break;
      //Start of Diamonds
      case 'D1':
        this.shown = loadImage("cards/DiamondsImages_01.png");
        break;
      case 'D2':
        this.shown = loadImage("cards/DiamondsImages_02.png");
        break;
      case 'D3':
        this.shown = loadImage("cards/DiamondsImages_03.png");
        break;
      case 'D4':
        this.shown = loadImage("cards/DiamondsImages_04.png");
        break;
      case 'D5':
        this.shown = loadImage("cards/DiamondsImages_05.png");
        break;
      case 'D6':
        this.shown = loadImage("cards/DiamondsImages_06.png");
        break;
      case 'D7':
        this.shown = loadImage("cards/DiamondsImages_07.png");
        break;
      case 'D8':
        this.shown = loadImage("cards/DiamondsImages_08.png");
        break;
      case 'D9':
        this.shown = loadImage("cards/DiamondsImages_09.png");
        break;
      case 'D10':
        this.shown = loadImage("cards/DiamondsImages_10.png");
        break;
      case 'DJ':
        this.shown = loadImage("cards/DiamondsImages_11.png");
        break;
      case 'DQ':
        this.shown = loadImage("cards/DiamondsImages_12.png");
        break;
      case 'DK':
        this.shown = loadImage("cards/DiamondsImages_13.png");
        break;
      //Start of Spades
      case 'S1':
        this.shown = loadImage("cards/SpadesImages_01.png");
        break;
      case 'S2':
        this.shown = loadImage("cards/SpadesImages_02.png");
        break;
      case 'S3':
        this.shown = loadImage("cards/SpadesImages_03.png");
        break;
      case 'S4':
        this.shown = loadImage("cards/SpadesImages_04.png");
        break;
      case 'S5':
        this.shown = loadImage("cards/SpadesImages_05.png");
        break;
      case 'S6':
        this.shown = loadImage("cards/SpadesImages_06.png");
        break;
      case 'S7':
        this.shown = loadImage("cards/SpadesImages_07.png");
        break;
      case 'S8':
        this.shown = loadImage("cards/SpadesImages_08.png");
        break;
      case 'S9':
        this.shown = loadImage("cards/SpadesImages_09.png");
        break;
      case 'S10':
        this.shown = loadImage("cards/SpadesImages_10.png");
        break;
      case 'SJ':
        this.shown = loadImage("cards/SpadesImages_11.png");
        break;
      case 'SQ':
        this.shown = loadImage("cards/SpadesImages_12.png");
        break;
      case 'SK':
        this.shown = loadImage("cards/SpadesImages_13.png");
        break;
    };
  }
  
  draw(){ //card image size is 91px x 126px
    if(this.state == "shown"){
      image(this.shown, this.pos.x, this.pos.y, 91 * this.dimensions.x, 126 * this.dimensions.y);
    }else{
      image(this.hidden, this.pos.x, this.pos.y, 91 * this.dimensions.x, 126 * this.dimensions.y)
    }
  }
  
  move(returnType){
    if(this.state == 'shown'){
      if(returnType == "set"){
        if(this.mouseState == 'pressed' && this.mouseOver() && this.state == "shown" && this.locked == false){
          this.offset = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
          this.locked = true;
        }
        if(this.mouseState == 'pressed' && this.locked){
          this.pos = createVector(mouseX - this.offset.x, mouseY - this.offset.y);
        }

        if(this.mouseState == 'released'){
          this.locked = false;
        }

      }else{
        if(this.mouseState == "pressed" && this.mouseOver()){
          return "moving";
        }else{
          return "static";
        }
      }
    }
  }
  
  mouseOver(){
    if(mouseX > this.pos.x && mouseX < this.pos.x + (91 * this.dimensions.x)){
        if(mouseY > this.pos.y && mouseY < this.pos.y + (126 * this.dimensions.y)){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
  }
}






