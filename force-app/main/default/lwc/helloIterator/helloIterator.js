import { LightningElement } from 'lwc';

export default class HelloIterator extends LightningElement {
  contacts = [
    {
      id:1001,
      name:"Saiprasad Sahoo",
      role:"Salesforce Intern"
    },
    {
      id:1002,
      name:"Saikrushna Dalei",
      role:"Salesforce Developer"
    },
    {
      id:1003,
      name:"Bibhutibhusan Behera",
      role:"Salesforce Intern"
    },
    {
      id:1004,
      name:"Chandan Kumar Das",
      role:"Salesforce Team Lead"
    }
  ]
}