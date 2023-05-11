export class Player {
  name!: string
  average!: number

  constructor(char: string, avg: number) {
    this.name = char
    this.average = avg
  }

  get playerName() {
    return this.name
  }

  get playerAvg() {
    return this.average
  }
}
