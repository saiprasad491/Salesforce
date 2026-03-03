import { LightningElement } from 'lwc';

export default class Subscriber extends LightningElement {

  // connectedCallback(){
  //   window.addEventListener('message',this.handleMessage,false);
  // }

  handleMessage=(evt)=>{
    let detail = evt.detail.value;
    console.log(`${evt.detail.value} hanlde msg called.`)
    // alert(`${detail} has been received`);
  }

  // disconnectedCallback() {
  //   window.removeEventListener('message',this.handleMessage,false);
  // }
}