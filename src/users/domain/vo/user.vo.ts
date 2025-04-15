export class UserVO {
  constructor(
    private id: string,
    private securityCode: string,
    private countryCode: number,
    private phoneNumber: string,
  ) {}
}
