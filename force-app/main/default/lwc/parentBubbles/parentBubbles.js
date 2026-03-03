import { LightningElement } from 'lwc';

export default class ParentBubbles extends LightningElement {
  handleNotify(){
    console.log("Parent received event");
  }
}