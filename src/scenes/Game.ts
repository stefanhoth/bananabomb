import { Scene } from "phaser";
import { Background } from "../objects/Background";
import { Cityscape } from "../controllers/Cityscape";

export class Game extends Scene {
  readonly numberOfHouses: number;
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Background;
  cityscape: Cityscape;
  canvas: HTMLCanvasElement;

  constructor() {
    super("Game");
    this.numberOfHouses = 9; //TODO load from game prefs
  }

  preload() {
    this.canvas = this.sys.game.canvas;
  }

  create() {
    this.camera = this.cameras.main;
    this.camera.setBackgroundColor(0x56bbf1);

    this.background = new Background(0xcdf5fd, 0x00a9ff, 20);
    this.generateBackground();

    this.cityscape = new Cityscape(this.numberOfHouses);
    this.generateCityscape();

    this.input.once("pointerdown", () => {
      this.scene.start("GameOver");
    });
  }

  generateBackground() {
    const graphics = this.add.graphics();
    graphics.fillGradientStyle(
      this.background.colorFrom,
      this.background.colorFrom,
      this.background.colorTo,
      this.background.colorTo,
      1
    );
    graphics.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  generateCityscape() {
    const houseColors: number[] = generateHouseColors(this.numberOfHouses);

    const blockSize: number = this.canvas.width / (this.numberOfHouses * 3 + 1);

    for (let index = 0; index < this.cityscape.houses.length; index++) {
      const graphics = this.add.graphics();
      graphics.fillStyle(houseColors[index], 0.8);
      graphics.fillRect(
        blockSize * (index * 3 + 1),
        this.canvas.height,
        blockSize * 2,
        -(this.cityscape.houses[index].height / 100) *
          (this.canvas.height * 0.8)
      );
    }
  }
}
function generateHouseColors(max: number): number[] {
  const colors: number[] = [];

  let colorWheel: number[] = [
    0x6420aa, 0xff3ea5, 0xff7ed4, 0xffb5da, 0x000000, 0xf57d1f, 0xebf400,
    0xff004d, 0x45ffca, 0x900c3f, 0x16ff00, 0xf0ff42,
  ];
  for (let index = 0; index < max; index++) {
    //assign a random color from the wheel
    colors[index] = colorWheel[Phaser.Math.Between(0, colorWheel.length)];
    // pick each color only once, i.e. remove from future options
    colorWheel = colorWheel.filter((value) => value != colors[index]);
  }

  return colors;
}
