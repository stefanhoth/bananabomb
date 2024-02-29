export class House {
  private readonly isInCenter: boolean;
  private readonly _height: number;
  private _color: number;
  private _paintPosX: number;
  private _paintPosY: number;
  private _paintWidth: number;
  private _paintHeight: number;

  constructor(isInCenter: boolean) {
    this.isInCenter = isInCenter;
    this._height = this.calculateRandomHeight();
    this._color = 0x333333;
  }

  private calculateRandomHeight(): number {
    const maxHeight = this.isInCenter ? 100 : 40; // Maximum height constant
    const minHeight = this.isInCenter ? 50 : 20; // Minimum height constant

    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  }

  public get height(): number {
    return this._height;
  }

  public get color(): number {
    return this._color;
  }
  public set color(value: number) {
    this._color = value;
  }
  public get paintPosX(): number {
    return this._paintPosX;
  }
  public set paintPosX(value: number) {
    this._paintPosX = value;
  }
  public get paintPosY(): number {
    return this._paintPosY;
  }
  public set paintPosY(value: number) {
    this._paintPosY = value;
  }  
  public set paintWidth(value: number) {
    this._paintWidth = value;
  }  
  public get paintWidth(): number {
    return this._paintWidth;
  }
  public get paintHeight(): number {
    return this._paintHeight;
  }
  public set paintHeight(value: number) {
    this._paintHeight = value;
  }
}
