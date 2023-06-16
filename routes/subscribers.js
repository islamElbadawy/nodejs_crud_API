const express = require('express');
const router = express.Router();
const Subscriber = require('../models/subscriber');

//Get All
router.get('/', async (req, res) => {
	try {
		const subscribers = await Subscriber.find();
		res.status(200).json(subscribers);
	} catch (err) {
		res
			.status(500)
			.json({ message: err.message });
	}
});

// Get One
router.get('/:id', getSubscriber, (req, res) => {
	res.json(res.subscriber);
});

//Create One
router.post('/', async (req, res) => {
	const subscriber = new Subscriber({
		name: req.body.name,
		subscriberToChannel:
			req.body.subscriberToChannel,
	});

	try {
		const newSubscriber = await subscriber.save();
		res.status(201).json(newSubscriber);
	} catch (err) {
		res
			.status(400)
			.json({ message: err.message });
	}
});

//Update One
router.patch(
	'/:id',
	getSubscriber,
	async (req, res) => {
		if (req.body.name !== null) {
			res.subscriber.name = req.body.name;
		}
		if (req.body.subscriberToChannel !== null) {
			res.subscriber.subscriberToChannel =
				req.body.subscriberToChannel;
		}

		try {
			const updatedSubscriber =
				await res.subscriber.save();
			res.status(201).json(updatedSubscriber);
		} catch (err) {
			res
				.status(400)
				.json({ message: err.message });
		}
	}
);

//Delete One
router.delete(
	'/:id',
	getSubscriber,
	async (req, res) => {
		try {
			await Subscriber.findByIdAndDelete(
				req.params.id
			);
			res.json({
				message:
					'Subscriber deleted successfully',
			});
		} catch (error) {
			return res
				.status(500)
				.json({ message: error.message });
		}
	}
);

async function getSubscriber(req, res, next) {
	let subscriber;
	try {
		subscriber = await Subscriber.findById(
			req.params.id
		);
		if (subscriber === null) {
			return res.status(404).json({
				message: 'Cannot find subscriber',
			});
		}
	} catch (error) {
		return res
			.status(500)
			.json({ message: error.message });
	}

	res.subscriber = subscriber;
	next();
}

module.exports = router;
