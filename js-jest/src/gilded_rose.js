class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      // applies -1 sellIn to everything except Sulfura
      if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn -= 1;
      }

      //applies -1 quality if not brie or BSP if quality is above 0
      if (this.items[i].name !== 'Aged Brie' && this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
            this.items[i].quality -= 1;
          }
      } else {
        //BSP increases in quality the closer to the sellIn date.
        if (this.items[i].quality < 50) {
          this.items[i].quality += 1;
          if (this.items[i].name === 'Backstage passes to a TAFKAL80ETC concert') {
                //increase in quality by 1 per day until 6 days left
                if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
                    this.items[i].quality += 1;
                }//increase in quality by 2 per day between 5 and  0 days left
                if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
                  this.items[i].quality += 1;
                }
          }
        }
      }
      //if sellin less than 0 and quality is greater than 0 decrease quality by 1, unless brie, BSP or Sulfuras
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name !== 'Aged Brie') {
          if (this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name !== 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality -= 1;
              }
            }
          } else {
            //quality stays at zero once it reaches 0
            this.items[i].quality = 0;
          }
        } else {//increase quality by 1 until 50 is reached for Brie and BSP
          if (this.items[i].quality < 50) {
            this.items[i].quality += 1;
          }
        }
      }

      //Sulfuras can have its own quality assignment
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros') {
        this.items[i].quality = 80;
      }

      //Conjured has an extra -1 quality.
      if (this.items[i].name.includes("Conjured")){
        this.items[i].quality -= 1;
      }


    }
    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
