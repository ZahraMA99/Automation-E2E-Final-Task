export default class GenerateRandomNumberClass {
  static generateRandomNumber(maxNumber = 100) {
    return Math.round(maxNumber * Math.random());
  }
}
