export class CountryVO {
  constructor(
    public readonly id: string,
    public readonly countryNameEn: string,
    public readonly countryNameKr: string,
    public readonly countryCallingCode: string,
    public readonly countryCode: string,
    public readonly currencyCode: string,
    public readonly createdAt: string,
    public readonly updatedAt: string,
  ) {}
}
