export interface Car {
  brand: string,
  model: string
  gearbox: string,
  engineFuelType: string,
  engineVolume: number,
  enginePower: number,
  vrc: "original" | "copy",
  steeringWheel: "left" | "right",
  price: number,
  loanPrice: number,
}