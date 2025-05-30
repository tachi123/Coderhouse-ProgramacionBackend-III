import { IsString, IsNumber, IsPositivo} from 'class-validator';

export class CreateProductDto {

    @IsString()
    name: string;

    @IsNumber()
    @IsPositivo()
    id: number;

    @IsNumber()
    @IsPositivo()
    price: number;


}
