export class Background {
  private _colorFrom: number;
  private _colorTo: number;
  private _stepping: number;

  constructor(colorFrom: number, colorTo: number, stepping: number) {
    this._colorFrom = colorFrom;
    this._colorTo = colorTo;
    this._stepping = stepping;
  }

  get colorFrom(): number {
    return this._colorFrom;
  }

  get colorTo(): number {
    return this._colorTo;
  }

  get stepping(): number {
    return this._stepping;
  }
}
