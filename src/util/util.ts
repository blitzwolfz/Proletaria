export async function toHHMMSS(timestamp: number, howlong: number) {

    return new Date((howlong - (Math.floor(Date.now() / 1000) - timestamp)) * 1000).toISOString().substr(11, 8)
}

export async function getRndInteger(min:number, max:number, maxInclude = false) {
    if(maxInclude) return Math.floor(Math.random() * (max+1 - min) ) + min;

    return Math.floor(Math.random() * (max - min) ) + min;
  }