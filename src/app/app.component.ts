import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  bankForm:FormGroup;

  submitted= false;

  searchedbox ='';

  isEditoperation = false;

  bankList:any = [];
  selectedIndex:any;
  selectedObj:any;



  constructor(private formBuilder:FormBuilder){
    this.bankForm = this.formBuilder.group({
      bankid:['',[Validators.required]],
      personnm:['',[Validators.required]]
    })

    let data = localStorage.getItem('BANK_LIST');
    if(data){
      this.bankList = JSON.parse(data);
    }
  }

  ngOnInit(): void {
    let testtid = this.uniqueid();
    console.log('testtid', testtid);

  }


  onSubmit(){
    this.submitted = true;

    console.log("Controls are Valid",this.bankList);
    if(this.bankForm.valid){
      this.bankForm.value.id = this.uniqueid();
      this.bankList.push(this.bankForm.value);
      alert("Form is Valid...Submit Successfully");
      this.aClear();
    }
    else{
      alert("Form is invalid ... Please try again!")
    }
    localStorage.setItem("BANK_LIST",JSON.stringify(this.bankList));
  }


  onUpdate(){
    this.isEditoperation = false;

    this.bankList[this.selectedIndex].bankid = this.bankForm.value.bankid;
    this.bankList[this.selectedIndex].personnm = this.bankForm.value.personnm;

    alert("Updated Successfully!");

    localStorage.setItem("BANK_LIST",JSON.stringify(this.bankList));
    this.aClear();

    console.log('Update')
  }

  onEdit(obj:any){
    
    this.selectedIndex = this.bankList.findIndex((xb:any)=>xb.id === obj.id);

    console.log('this.selectedIndex', this.selectedIndex);

    this.selectedObj = obj;

    this.isEditoperation = true;

    this.bankForm.patchValue({
      bankid:obj.bankid,
      personnm:obj.personnm
    })
    
  }

  onDelete(id:any){
    this.selectedIndex = this.bankList.findIndex((xb:any)=>xb.id === id);
    console.log('this.selectedIndex', this.selectedIndex);

    this.bankList.splice(this.selectedIndex,1);

    
    localStorage.setItem("BANK_LIST",JSON.stringify(this.bankList));
  }





  
  
  
  aClear(){
    this.bankForm.reset();
  }
  
  
  
  uniqueid() {
    return '_' + Math.random().toString(36).substr(2, 9);
  };


  get f(){
   return this.bankForm.controls;
  }












}
