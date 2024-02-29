import { House } from "../objects/House";

export class Cityscape {
  private _houses: House[];
  private numberOfHouses: number;

  constructor(numberOfHouses: number) {
    this._houses = [];
    this.numberOfHouses = numberOfHouses;
    this.distributeHouses();
  }

  private distributeHouses(): void {
    const third = Math.floor(this.numberOfHouses / 3);

    for (let i = 0; i < this.numberOfHouses; i++) {
      const house = new House(i >= third && i < 2 * third);
      this._houses.push(house);
    }
  }

  get houses(): House[] {
    return this._houses;
  }
}
