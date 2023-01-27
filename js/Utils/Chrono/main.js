
export function getTime_HH_MM_SS_MS() {
	let d = new Date(); let s = d.getSeconds(); let m = d.getMinutes(); let h = d.getHours(); let ms = d.getMilliseconds();
	return ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2) + '.' + ('' + ms).substr(-2);
}