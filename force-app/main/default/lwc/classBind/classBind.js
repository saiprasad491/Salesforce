import { LightningElement } from 'lwc';

export default class ClassBind extends LightningElement {
  get computedClassNames(){
    flag = true;
    return [
      "bdr",
      {"bg": this.flag},
      "clr"
    ];
  }
}