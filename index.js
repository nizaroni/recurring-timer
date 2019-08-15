const player = require('play-sound')()
const log = require('single-line-log').stdout
const isNumber = require('is-number')

const defaultSound = `${__dirname}/pew.mp3`

let [
	,,
	minutes = 5,
	soundFile = defaultSound,
	volume = 1,
] = process.argv

// second argument could be the volume
if (isNumber(soundFile)) {
	volume = soundFile
	soundFile = defaultSound
}

const options = { afplay: ['--volume', volume] }

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
