export async function toHHMMSS(timestamp: number, howlong: number) {

    return new Date((howlong - (Math.floor(Date.now() / 1000) - timestamp)) * 1000).toISOString().substr(11, 8)
}

export async function getRndInteger(min:number, max:number, maxInclude = false) {
    if(maxInclude) return Math.floor(Math.random() * (max+1 - min) ) + min;

    return Math.floor(Math.random() * (max - min) ) + min;
}

export async function NumCommafy(str:number): Promise<String> {
    return stringCommafy(String(str));
}

export async function stringCommafy(str:string): Promise<String> {
    return str.replace(/(^|[^\w.])(\d{4,})/g, function (_$0, $1, $2) {
        return $1 + $2.replace(/\d(?=(?:\d\d\d)+(?!\d))/g, "$&,");
    });
}
