
export function numberComparator(number1: any, number2: any) {
    
    number1 = parseFloat(number1);
    number2 = parseFloat(number2);
    if (number1 < number2) {
        console.log('-1')
        return -1;
    } else {
        console.log('>1')
        return 1;
    }
}

export function currencyFormatter(currency: number, cant:number, sign: string,moneda:Number): string {    
    
    let precio = ((currency) * cant)
    let sMoneda:string = "";
    let sMonedaAbr:string = "";
    switch (Number(moneda)) {
        case 1:
            sMoneda = "$";
            sMonedaAbr = "MXN";
            break;
        case 2:
            sMoneda = "$";
            sMonedaAbr = "USD";
            break;
        case 3:            
            sMoneda = "€";
            sMonedaAbr = "EUR";
            break;
        default:
            sMoneda = "$";
            sMonedaAbr = "MXN";
            break;
    }

    let currencyStr = precio;
    let nStr = currencyStr.toFixed(2);
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }   

    return sMoneda +" "+ x1 + x2 ;
    //return sign + `${formatted}`;
}

export function currencyFormatterMXN(currency: string): string {      
    let currencyStr = parseFloat(currency);
    let nStr = currencyStr.toFixed(2);
    nStr += '';
    let x = nStr.split('.');
    let x1 = x[0];
    let x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }   
    return "$" +" "+ x1 + x2 ;
    //return sign + `${formatted}`;
}
