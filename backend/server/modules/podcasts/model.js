import mongoose, { Schema } from 'mongoose';


const PodcastSchema = new Schema({
	image: {
		type: String,
		required: false,
		default: ''
	},
	title_original: {
		type: String,
		required: true
	},
	publisher_highlighted: {
		type: String,
		required: false,
		default: ''
	},
	podcast_title_original: {
		type: String,
		required: false,
		default: ''
	},
	pub_date_ms: {
		type: Date,
		required: false,
		default: ''
	},
	description_highlighted: {
		type: String,
		required: false,
		default: ''
	},
	id: {
		type: String,
		required: true,
        unique: true
	},
	publisher_original: {
		type: String,
		required: false,
		default: ''
	},
	podcast_id: {
		type: String,
		required: true,
        unique: true
	},
	description_original: {
		type: String,
		required: false,
		default: ''
	},
	podcast_title_highlighted: {
		type: String,
		required: false,
		default: ''
	},
	audio: {
		type: String,
		required: false,
		default: ''
	},
	itunes_id: {
		type: Number,
		required: false,
		default: '',
        unique: true
	},
	audio_length: {
		type: String,
		required: true
	},
	title_highlighted: {
		type: String,
		required:false,
		default: ''
	},
	rss: {
		type: String,
		required:false,
		default: ''
	}
});

export default mongoose.model('Podcast', PodcastSchema)

