const player = require('play-sound')()
const log = require('single-line-log').stdout

const [
	,,
	minutes = 5,
	soundFile = `${__dirname}/pew.mp3`,
] = process.argv

const options = { afplay: ['--volume', 1.5] }

let count = 1
log(`⏲  waiting for timer #${count}...`)

setInterval(function interval() {
	log(`🔔 timer #${count}`)

	player.play(soundFile,  options, function callback(error) {
		if (error) {
			throw error
		}

		count += 1
		log(`⏲  waiting for timer #${count}...`)
	})
}, minutes * 60 * 1000)
