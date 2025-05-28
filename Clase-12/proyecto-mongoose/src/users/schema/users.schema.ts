import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument} from 'mongoose';

export type UsersDocument = HydratedDocument<User>

@Schema()
export class User {

    @Prop({required: true})
    firstName: string;

    @Prop({required: true})
    lastName: string;

    /*@Prop({
        type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Pets'}]
    })
    pets: Pets[];*/

    @Prop({ unique: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);