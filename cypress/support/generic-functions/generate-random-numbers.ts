export default class GenerateRandomNumberClass {
  static generateRandomNumber(maxNumber = 1000) {
    return Math.round(maxNumber * Math.random());
  }
}
