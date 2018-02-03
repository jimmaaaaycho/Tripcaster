import Map from './model'

export const createMap = async (req, res) => {
    const {
        destinationAddresses,
        endingLocation,
        transportation
    } = req.body;

        const newMap = new Map({
        destinationAddresses,
        endingLocation,
        transportation
})

    try {
        return res.status(201).json({ map: await newMap.save() });
    }
    catch(e) {
        return res.status(e.status).json({error: true, message: "Error with Map"});
    }

    if(!destination_addresses) {
        return res.status(400).json({error: true, message: "destinationAddresses must be provided"})
    }
    else if (!endingLocation) {
        return res.status(400).json({error: true, message: "endingLocation must be provided"})
    }

}

export const getAllMaps = async (req, res) => {
    try {
        return res.status(200).json( { maps: await Map.find({}) } )
    } catch (e) {
        return res.status(e.status).json({error: true, message: "Error with Map"});
    }
}

export const commuteTime = async (req, res) => {
    try {
        var distance = require('google-distance-matrix');

        var origins = ['San Francisco CA'];
        var destinations = ['New York NY'];

        distance.key('AIzaSyD4ZU_jIWanHgsa59a17HUfIRj45DmLsB8');
        distance.units('imperial');

        distance.matrix(origins, destinations, function (err, distances) {
            if (err) {
                return console.log(err);
            }
            if(!distances) {
                return console.log('No commute routes found');
            }
            if (distances.status == 'OK') {
                for (var i=0; i < origins.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        var origin = distances.origin_addresses[i];
                        var destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var duration = distances.rows[i].elements[j].duration.value;
                            var duration_text = distances.rows[i].elements[j].duration.text;

                            console.log('Time from ' + origin + ' to ' + destination + ' is ' + duration);
                            console.log('Time from ' + origin + ' to ' + destination + ' is ' + duration_text);
                        } else {
                            console.log(destination + ' is not reachable by land from ' + origin);
                        }
                    }
                }
            }
            return res.status(200).json({duration_text, duration})
            });
        }
        catch (e) {
            return res.status(e.status).json({error: true, message: "Error with getting commute time"});
        }
    }
