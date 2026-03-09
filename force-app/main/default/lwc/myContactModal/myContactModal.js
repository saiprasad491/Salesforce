import { LightningElement } from 'lwc';

export default class MyContactModal extends LightningElement {
  handleClose(){
    this.handleClose('closed');
  }
}