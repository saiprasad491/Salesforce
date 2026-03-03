import { LightningElement } from 'lwc';

export default class GrandParent extends LightningElement {
  handleNotify(){
    console.log("Grandparent received event");
  }
}