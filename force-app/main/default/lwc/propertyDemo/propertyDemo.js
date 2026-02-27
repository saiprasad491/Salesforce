import { LightningElement } from 'lwc';

export default class PropertyDemo extends LightningElement {
  name = "";  //property
  name1 = "";  //property
  handleClick(){
    this.name = "Saiprasad Sahoo";
  }
  handleChange(evt){
    this.name1 = evt.target.value;
  }
}