export class CreateUserDto{
    readonly password: string;
    readonly name: string;
    readonly surname: string;
    readonly dateOfBirth: string;
    readonly email: string;
}