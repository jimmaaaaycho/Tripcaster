import Podcast from './model'

export const createPodcast = async (req, res) => {
	const {
		image,
		title_original,
		publisher_highlighted,
		podcast_title_original,
		pub_date_ms,
		description_highlighted,
		id,
		publisher_original,
		podcast_id,
		description_original,
		podcast_title_highlighted,
		audio,
		itunes_id,
		audio_length,
		title_highlighted,
		rss
	} = req.body;


	const newPodcast = new Podcast({
		image,
		title_original,
		publisher_highlighted,
		podcast_title_original,
		pub_date_ms,
		description_highlighted,
		id,
		publisher_original,
		podcast_id,
		description_original,
		podcast_title_highlighted,
		audio,
		itunes_id,
		audio_length,
		title_highlighted,
		rss
})

	try {
		return res.status(201).json({ podcast: await newPodcast.save() });
	}
	catch(e) {
		return res.status(e.status).json({error: true, message: "Error with Podcast"});
	}
}

export const getAllPodcasts = async (req, res) => {
	try {
		return res.status(200).json( { podcasts: await Podcast.find({}) } )
	} catch (e) {
		return res.status(e.status).json({error: true, message: "Error with Podcast"});
	}
}
