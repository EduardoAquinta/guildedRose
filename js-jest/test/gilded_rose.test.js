const {Shop, Item} = require("../src/gilded_rose");

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });
  it("should return an item with -1 less sellIn", () =>{
    const gildedRose = new Shop([new Item("grapes", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
  })
  it("should return a quality level one less if a normal item", () => {
    const gildedRose = new Shop([new Item("grapes", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  })
  it("should return both quality and sellIn at one less if normal item", () => {
    const gildedRose = new Shop([ new Item("grapes", 10, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(4);
  })
  it("should return -2 for quality if sellIn is negative", () => {
    const gildedRose = new Shop([new Item("grapes", -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  })
  it("should not return a quality value below 0", () => {
    const gildedRose = new Shop([new Item("grapes", -1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })
  it("should return higher quality per day if item is Aged Brie", () => {
    const gildedRose = new Shop([new Item( "Aged Brie", 10, 5)]);
    const items = gildedRose.updateQuality();
  expect(items[0].quality).toBe(6);
  })
  it("should never return a higher quality than 50", () => {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  })
  it("should return equal quality if item is Sulfuras", () => {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  })
  it("should return one higher quality for Backstage Passes if sellin above 10", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(21);
  })
  it("should return 2 higher quality for Backstage Pasees if sellin is between 10 and 6 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  })
  it("should return 3 higher quality for Backstage Pasees if sellin is between 5 and 0 days", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 3, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(23);
  });
  it("should return 0 quality for Backstage Pasees if sellin is less than 0", () => {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
  it('should return +2 quality if an item if marked as Conjured', () =>{
    const gildedRose = new Shop([new Item("Grapes, Conjured", 10, 20)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(18);
  })
});
