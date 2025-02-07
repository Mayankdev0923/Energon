export interface FuelLocation {
  readonly id: string;
  readonly name: string;
  readonly address: string;
  readonly coordinates: readonly [number, number];
  readonly price: number;
  availability: number;
  readonly rating: number;
  readonly email: string;
}