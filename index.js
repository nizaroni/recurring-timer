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

// second argument could be the volume instead of the sound file
if (isNumber(soundFile)) {
	volume = soundFile
	soundFile = defaultSound
}

const options = { afplay: ['--volume', volume] }

let count = 1
let remainingTime = minutes * 60
let isRinging = false
showCountdown()

setInterval(function interval() {
	remainingTime -= 1

	if (remainingTime > 0) {
		if (!isRinging) {
			showCountdown()
		}
		return
	}

	remainingTime = minutes * 60
	isRinging = true

	log(`🔔 timer #${count}`)
	player.play(soundFile, options, function callback(error) {
		if (error) {
			throw error
		}

		count += 1
		isRinging = false
	})
}, 1000)


function showCountdown() {
	log(`⏲  ${remainingTime} until timer #${count}...`)
}
