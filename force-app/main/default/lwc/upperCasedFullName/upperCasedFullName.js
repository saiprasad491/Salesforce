import { LightningElement } from 'lwc';

export default class UpperCasedFullName extends LightningElement {
  firstName="";
  lastName="";
  handleChange(evt){
    const field = evt.target.name;
    if(field=="fname"){
      this.firstName = evt.target.value;
    }
    if(field=="lname"){
      this.lastName = evt.target.value;
    }
  }
  get upperCasedFullName(){
    return `${this.firstName} ${this.lastName}`.toUpperCase();
  }
}