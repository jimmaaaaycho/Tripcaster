import mongoose, { Schema } from 'mongoose';

const MapSchema = new Schema({
    destinationAddresses: {
        type: String,
        require: true
    },
    endingLocation: {
        type: String,
        require: true
    },
    transportation: {
        type: String,
        require: true,
        default: 'DRIVING'
    },
});

export default mongoose.model('Map', MapSchema);
