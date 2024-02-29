import { House } from "../objects/House";

export class Cityscape {
  private _houses: House[];
  private numberOfHouses: number;
  private _canvasWidth: number;
  private _canvasHeight: number;

  constructor(
    numberOfHouses: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this._houses = [];
    this.numberOfHouses = numberOfHouses;
    this._canvasWidth = canvasWidth;
    this._canvasHeight = canvasHeight;
    this.distributeHouses();
  }

  private distributeHouses(): void {
    const third = Math.floor(this.numberOfHouses / 3);

    for (let i = 0; i < this.numberOfHouses; i++) {
      const house = new House(i >= third && i < 2 * third);
      this._houses.push(house);
    }

    this.assignHouseColors();
    this.assignHousePositions();
  }

  private assignHouseColors(): void {
    let colorWheel: number[] = [
      0x6420aa, 0xff3ea5, 0xff7ed4, 0xffb5da, 0x000000, 0xf57d1f, 0xebf400,
      0xff004d, 0x45ffca, 0x900c3f, 0x16ff00, 0xf0ff42,
    ];
    for (let index = 0; index < this._houses.length; index++) {
      const houseItem: House = this._houses[index];
      //assign a random color from the wheel
      houseItem.color = colorWheel[Phaser.Math.Between(0, colorWheel.length)];
      // pick each color only once, i.e. remove from future options
      colorWheel = colorWheel.filter((value) => value != houseItem.color);
    }
  }

  assignHousePositions() {
    const blockSize: number = this._canvasWidth / (this.numberOfHouses * 3 + 1);

    const posY: number = this._canvasHeight;
    // only use max 80% of available height
    const heightCeiling = this._canvasHeight * 0.8;

    for (let index = 0; index < this._houses.length; index++) {

      this._houses[index].paintPosX = blockSize * (index * 3 + 1);
      this._houses[index].paintPosY = posY;
      this._houses[index].paintWidth = blockSize * 2;
      this._houses[index].paintHeight = 
        -1 * //paint from bottom upwards
        heightCeiling * // houses should not go over this to keep airspace available
        (this._houses[index].height / 100); // ratio of house relative to maximum
    }
  }

  get houses(): House[] {
    return this._houses;
  }
}
