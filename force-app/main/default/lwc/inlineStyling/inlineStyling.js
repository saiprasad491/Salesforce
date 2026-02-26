import { LightningElement } from 'lwc';

export default class InlineStyling extends LightningElement {
  get inlines(){
    return `font-size:50px; color:chocolate;`;
  }
}