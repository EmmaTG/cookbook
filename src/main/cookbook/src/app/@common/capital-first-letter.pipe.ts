import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalFirstLetter'
})
export class CapitalFirstLetterPipe implements PipeTransform {

  transform(value: string): string {
    var splitStr: string[] = value.split(" ");
    var res = "";
    for (let str of splitStr){
        res += str.substring(0,1).toUpperCase() + str.substring(1).toLowerCase();
        if (!(str===splitStr[splitStr.length-1])){
            res += " ";
        }
    }
    return res;
  }

}
