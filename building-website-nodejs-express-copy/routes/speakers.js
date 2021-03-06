const express = require('express');


const router = express.Router();

module.exports = params => {
    const { speakersService } = params;


    router.get('/', async (request, response, next) => {

        try {
            const speakers = await speakersService.getList();
            const artwork = await speakersService.getAllArtwork();
            return response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artwork });
        } catch (err) {
            return next(err)
        }

    });

    router.get('/:shortname', async (request, response, next) => {
        try {
            const speaker = await speakersService.getSpeaker(request.params.shortname);
            console.log(speaker);
            const artwork = await speakersService.getArtworkForSpeaker(request.params.shortname)
            console.log(artwork)
            return response.render('layout', { pageTitle: 'Speakers', template: 'speakers-detail', speaker, artwork });
            // return response.send(`Detail page of ${request.params.shortname}`);
        } catch (err) {
            return next(err);
        }
    });
    return router;
};



