export class House {
  private readonly isInCenter: boolean;
  private readonly _height: number;

  constructor(isInCenter: boolean) {
    this.isInCenter = isInCenter;
    this._height = this.calculateRandomHeight();
  }

  private calculateRandomHeight(): number {
    const maxHeight = this.isInCenter ? 100 : 40; // Maximum height constant
    const minHeight = this.isInCenter ? 50 : 20; // Minimum height constant

    return Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
  }

  public get height(): number {
    return this._height;
  }
}
