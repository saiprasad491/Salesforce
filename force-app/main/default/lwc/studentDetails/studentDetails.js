import { LightningElement,wire,track } from 'lwc';
import getStudents from '@salesforce/apex/StudentController.getStudents';
import addNewStudent from '@salesforce/apex/StudentController.addNewStudent';
import removeStudent from '@salesforce/apex/StudentController.removeStudent';
import updateStudent from '@salesforce/apex/StudentController.updateStudent';
import {refreshApex} from '@salesforce/apex';
import getClasses from '@salesforce/apex/StudentController.getClasses';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import STUDENT_OBJECT from '@salesforce/schema/Student__c';
import STREAM_FIELD from '@salesforce/schema/Student__c.Stream__c';
import SKILL_FIELD from '@salesforce/schema/Student__c.Salesforce_Skill_Set__c';


export default class StudentDetails extends LightningElement {
  students;
  wiredStudentsResult;
  showModal = false;
  stdObj={
    name:'',
    email:'',
    age:0,
    entranceScore:0,
    enrolledFullTime:'',
    salesforceSkillSet:[],
    stream:'',
    address:'',
    class:'',
    fees:''
  }
  
  // toast function
  showToast(title, message, variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant
    });
    this.dispatchEvent(event);
  }

  //for dynamic stream and skill set
  streamOptions = [];
  salesforceSkillSetOptions = [];

  // get student object metadata
  @wire(getObjectInfo, { objectApiName: STUDENT_OBJECT })
  objectInfo;

  // get stream picklist values
  @wire(getPicklistValues, {
      recordTypeId: '$objectInfo.data.defaultRecordTypeId',
      fieldApiName: STREAM_FIELD
  })
  wiredStream({data,error}){
      if(data){
          this.streamOptions = data.values;
      }else if(error){
          console.error(error);
      }
  }

  // get skillset picklist values
  @wire(getPicklistValues, {
      recordTypeId: '$objectInfo.data.defaultRecordTypeId',
      fieldApiName: SKILL_FIELD
  })
  wiredSkillSet({data,error}){
      if(data){
             //salesforceSkillSetOptions
          this.salesforceSkillSetOptions = data.values;
      }else if(error){
          console.error(error);
      }
  }

    classes = []
    wiredClassesResult;
    @wire(getClasses)
    wiredClasses(result){
        this.wiredClassesResult = result;

        if(result.data){
            this.classes = result.data.map(cls => {
                return {
                    label: cls.Name,
                    value: cls.Id
                };
            });

            console.log(this.classes);
        } 
        else if(result.error){
            console.error(result.error);
        }
    }
    

    successModal=false;
    openSucessModal(){
      this.successModal=true;
    }
    closeSuccessModal(){
      this.successModal=false;
    }
    

    get hasSkills() {
        return this.stdObj.salesforceSkillSet &&
        this.stdObj.salesforceSkillSet.length > 0;
    }

  editModal = false;
  openEditModal(){
    this.editModal=true;
  }
  closeEditModal(){
    this.editModal=false;
  }
  
handleEditClick(e) {
    const id = e.currentTarget.dataset.id;
    const student = this.students.find(st => st.Id === id);

    this.stdObj.id = student.Id;
    this.stdObj.name = student.Name__c;
    this.stdObj.email = student.Email__c;
    this.stdObj.age = student.Age__c;
    this.stdObj.entranceScore = student.Entrance_Score__c;
    this.stdObj.enrolledFullTime = student.Enrolled_Full_Time__c;

    this.stdObj.salesforceSkillSet = student.Salesforce_Skill_Set__c
        ? student.Salesforce_Skill_Set__c.split(';')
        : [];

    this.stdObj.stream = student.Stream__c;
    this.stdObj.address = student.Address__c;
    this.stdObj.class = student.Class__c;

    this.openEditModal();
 
  }

  handleUpdation() {
    // 2. Process data transformations right before sending to Apex
    let skillSet = this.stdObj.salesforceSkillSet;
    if (Array.isArray(skillSet)) {
        skillSet = skillSet.join(';');
    }

    let enrolled = this.stdObj.enrolledFullTime;
    if (typeof enrolled === 'string') {
        enrolled = enrolled === 'true';
    }

    // 3. Pass the values from this.stdObj to your Apex method
    updateStudent({
        id: this.stdObj.id, // Access the Id we saved earlier
        name: this.stdObj.name,
        email: this.stdObj.email,
        age: parseInt(this.stdObj.age, 10),
        entranceScore: parseFloat(this.stdObj.entranceScore),
        enrolledFullTime: enrolled,
        salesforceSkillSet: skillSet,
        stream: this.stdObj.stream || null,
        address: this.stdObj.address || null,
        classId: this.stdObj.class
    })
    .then(() => {
        // alert('Record updated successfully');
        this.showToast('Success','Student updated','success');
        this.closeEditModal();
        return refreshApex(this.wiredStudentsResult);
    })
    .catch(error => {
       this.showToast('Error',error.body.message,'error');
    });
  }




  viewModal = false;
  openViewModal(){
    this.viewModal = true;
  }
  closeViewModal(){
    this.viewModal = false;
  }
  
  handleViewClick(e){
    const id = e.currentTarget.dataset.id;
    const student = this.students.find(st => st.Id === id);

    this.stdObj.name = student.Name__c;
    this.stdObj.email = student.Email__c;
    this.stdObj.age = student.Age__c;
    this.stdObj.entranceScore = student.Entrance_Score__c;
    this.stdObj.enrolledFullTime = student.Enrolled_Full_Time__c;
    this.stdObj.salesforceSkillSet = student.Salesforce_Skill_Set__c;
    this.stdObj.stream = student.Stream__c;
    this.stdObj.address = student.Address__c;
    
    this.openViewModal();

  }

  handleSkillSetChange(e){
      this.stdObj = {
          ...this.stdObj,
          salesforceSkillSet: e.detail.value
      };
  }

  handleInputChange(e){
    const field = e.target.name;
    const value = e.target.value;
    this.stdObj={
      ...this.stdObj,
      [field]:value
    }
  }

  handleFullTimaeChange(e){
    this.stdObj.enrolledFullTime=e.target.checked;
  }

  handleStreamChange(e){
    this.stdObj.stream=e.detail.value;
  }

  handleDeleteClick(e){
    const id = e.currentTarget.dataset.id;
    removeStudent({studentId:id})
    .then(()=>{
      this.showToast('Deleted','Student removed','success');
      return refreshApex(this.wiredStudentsResult);

    })
    .catch(error=>{
      this.showToast('Error',error.body.message,'error');
    })
  }



  handleSaveClick() {

    let skillSet = this.stdObj.salesforceSkillSet;


    if (Array.isArray(skillSet)) {
        skillSet = skillSet.join(';');
    }

    let enrolled = this.stdObj.enrolledFullTime;
    if (typeof enrolled === 'string') {
        enrolled = enrolled === 'true';
    }

    console.log('Student Data:', this.stdObj);

    addNewStudent({
        name: this.stdObj.name,
        email: this.stdObj.email,
        age: parseInt(this.stdObj.age),
        entranceScore: parseFloat(this.stdObj.entranceScore),
        enrolledFullTime: enrolled,
        salesforceSkillSet: skillSet,
        stream: this.stdObj.stream || null,
        address: this.stdObj.address || null,
        classId: this.stdObj.class
    })
    .then(() => {
    this.showToast('Success', 'Student added successfully', 'success');
    this.closeModal();
    return refreshApex(this.wiredStudentsResult);
    })
    .catch(error => {
        this.showToast('Error', error.body.message, 'error');
    })

}

  handleAddClick(){
    //alert('New Student Added');
    this.openModal();
  }

  openModal(){
      this.showModal = true;
  }

  closeModal(){
      this.showModal = false;
  }

  @wire(getStudents)
  wiredStudents(result){
    this.wiredStudentsResult=result;
    if(result.data){
      this.students=result.data;
      // console.log(this.students);
    }else{
      console.error(result.error);
    }
  }
}