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
      if (this.items[i].name !== 'Aged Brie'
          && this.items[i].name !== 'Backstage passes to a TAFKAL80ETC concert'
          && this.items[i].quality > 0)
      {
            this.items[i].quality -= 1;
      }

      //Aged Brie and BSP increase in quality each day
      if(this.items[i].name === "Aged Brie" || this.items[i].name === "Backstage passes to a TAFKAL80ETC concert")
      {
        this.items[i].quality += 1;
      }

        //BSP increases in quality the closer to the sellIn date.
      if (this.items[i].name === "Backstage passes to a TAFKAL80ETC concert")
      {
        switch (true)
        {
          case (this.items[i].sellIn > 5 && this.items[i].sellIn <= 10) :
            this.items[i].quality += 1;
            break;
          case this.items[i].sellIn <= 5:
            this.items[i].quality += 2;
        }
      }

      //when the item is normal and has passed it's sellIn date, quality degrades an extra step
      if(this.items[i].sellIn < 0 && this.items.name !== "Aged Brie"
          && this.items.name !== "Backstage passes to a TAFKAL80ETC concert")
      {
        this.items[i].quality -= 1;
      }

      //Backstage pass is worthless after the concert, as is any item that has reached quality zero
      if( (this.items[i].sellIn < 0
              && this.items[i].name === "Backstage passes to a TAFKAL80ETC concert")
                || this.items[i].quality <= 0) {
        this.items[i].quality = 0;
      }
      //Item quality can never reach above 50
      if( this.items[i].quality >= 50)
      {
        this.items[i].quality = 50;
      }

      //Sulfuras can have its own quality assignment
      if (this.items[i].name === 'Sulfuras, Hand of Ragnaros')
      {
        this.items[i].quality = 80;
      }
      //Conjured has an extra -1 quality.
      if (this.items[i].name.includes("Conjured"))
      {
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
