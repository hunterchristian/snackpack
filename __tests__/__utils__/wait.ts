const wait = (millis: number) =>
  new Promise(resolve => setTimeout(resolve, millis));

export default wait;
