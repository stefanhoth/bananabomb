import { Scene } from "phaser";
import { Background } from "../objects/Background";
import { Player } from "../objects/Player";
import { Cityscape } from "../controllers/Cityscape";
import { House } from "../objects/House";

export class Game extends Scene {
  readonly numberOfHouses: number;
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Background;
  cityscape: Cityscape;
  canvas: HTMLCanvasElement;
  player1: Player;

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

    this.cityscape = new Cityscape(
      this.numberOfHouses,
      this.canvas.width,
      this.canvas.height
    );
    this.generateCityscape();

    this.player1 = new Player();

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
    this.cityscape.houses.forEach((house: House) => {
      const graphics = this.add.graphics();
      graphics.fillStyle(house.color, 0.8);
      graphics.fillRect(
        house.paintPosX,
        house.paintPosY,
        house.paintWidth,
        house.paintHeight
      );
    });
  }
}
