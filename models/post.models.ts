
import { Schema, Document, model  } from 'mongoose';

const postSchema = new Schema({

    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    img: [{
        type: String
    }],
    coords: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
})

postSchema.pre<IPost>('save', function(next) {
    this.created = new Date();
    next();
});

interface IPost extends Document {
    created: Date;
    mensaje: string;
    img: string[];
    coords:  string;
    user: string;
}

export const Post = model<IPost>('Post', postSchema);