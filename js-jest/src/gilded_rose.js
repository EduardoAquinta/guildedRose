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

    for (let item of this.items) {

      // applies -1 sellIn to everything except Sulfura
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }

      //applies -1 quality if not brie or BSP, and -2 if past the sellIn date
      if (item.name !== 'Aged Brie'
          && item.name !== 'Backstage passes to a TAFKAL80ETC concert') {
        switch (true) {
          case item.sellIn >=0:
            item.quality -= 1;
            break;
          case item.sellIn < 0:
            item.quality -=2;
        }
      }

      //Aged Brie and BSP increase in quality each day
      if (item.name === "Aged Brie" || item.name === "Backstage passes to a TAFKAL80ETC concert")
      {
        item.quality += 1;
      }

        //BSP increases in quality the closer to the sellIn date.
      if (item.name === "Backstage passes to a TAFKAL80ETC concert")
      {
        switch (true)
        {
          case (item.sellIn > 5 && item.sellIn <= 10) :
            item.quality += 1;
            break;
          case item.sellIn <= 5:
            item.quality += 2;
        }
      }

      //Backstage pass is worthless after the concert, as is any item that has reached quality zero
      if ( (item.sellIn < 0
              && item.name === "Backstage passes to a TAFKAL80ETC concert")
                || item.quality <= 0) {
        item.quality = 0;
      }

      //Item quality can never reach above 50
      if (item.quality >= 50)
      {
        item.quality = 50;
      }

      //Sulfuras can have its own quality assignment
      if (item.name === 'Sulfuras, Hand of Ragnaros')
      {
        item.quality = 80;
      }
      //Conjured has an extra -1 quality.
      if (item.name.includes("Conjured"))
      {
        item.quality -= 1;
      }
    }
    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
