export async function toHHMMSS(timestamp: number, howlong: number) {

    return new Date((howlong - (Math.floor(Date.now() / 1000) - timestamp)) * 1000).toISOString().substr(11, 8)
}