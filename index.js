const player = require('play-sound')()
const log = require('single-line-log').stdout
const isNumber = require('is-number')
const format = require('format-duration')

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

const totalSeconds = minutes * 60
const options = { afplay: ['--volume', volume] }

let remainingTime = totalSeconds
let count = 1
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

	remainingTime = totalSeconds
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
	const prettyTime = format(remainingTime * 1000)
	log(`⏲  ${prettyTime} until timer #${count}...`)
}
