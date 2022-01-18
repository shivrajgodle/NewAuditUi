import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { ProjectServiceService } from 'src/app/Services/project-service.service';
import { Product } from '../../domain/product';
import { ProductService } from '../../service/productservice';
import { Client, ClientData, RuleData } from './client';
import Swal from 'sweetalert2';

interface Level{
  level:string;
}

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.scss'],
  providers:[MessageService]
})
export class RulesComponent implements OnInit {

  ruleForm!: FormGroup;
  errorMsg!: string;
  projectData:any=[];
  level:Level[];

  selectedProjectId:string;
  selectedLevel:string;

//edit table

  products2: Product[];
  
  ruleData: RuleData[];

  statuses: SelectItem[];

  clonedProducts: { [s: string]: RuleData; } = {};

  //crud table
  client1:ClientData[]=[];
 
  client!: Client;

  //for activation part
  checked1: boolean=true;
  loader:boolean=true;
  

  submitted?:boolean;
  clientDialogue?:boolean;
  clientEditDialogue?:boolean;

  selectedClients!:boolean;

  constructor(private router: Router ,private messageService: MessageService,private proservice:ProjectServiceService , private productService: ProductService,private primengConfig : PrimeNGConfig ) 
  { 
    this.level=[
      {level:"Low"},
      {level:"Mid"},
      {level:"High"},
      {level:"Very High"},
      {level:"Critical"},
      {level:"Blocked"}
    ]

    // this.projectData=[
    //   {
    //     projectId:'50001'
    //   },
    //   {
    //     projectId:'50002'
    //   },
    //   {
    //     projectId:'50003'
    //   },
    //   {
    //     projectId:'50004'
    //   },
    //   {
    //     projectId:'50005'
    //   }
    // ]

  }

  ngOnInit(): void {

    this.productService.getProductsSmall().then(data => this.products2 = data);

    this.statuses = [{label: 'In Stock', value: 'INSTOCK'},{label: 'Low Stock', value: 'LOWSTOCK'},{label: 'Out of Stock', value: 'OUTOFSTOCK'}]

    this.proservice.getProjectDetails().subscribe((data:any)=>{
     console.log(data['content']);
     this.projectData=data['content'];
     
    })

    this.proservice.getRuleData().subscribe((data:RuleData)=>{
      console.log("i am from getRule data",data);
      this.ruleData = data['content']
      
    })

    

    // console.log(this.pcode1);
    this.ruleForm=new FormGroup({
      projectId:new FormControl(''),
      trigger:new FormControl('',Validators.required),
      level:new FormControl('',Validators.required),
      escalationIds:new FormControl('',Validators.required),
      noDaysNoResponse:new FormControl('',Validators.required),
      reminderPeriod1:new FormControl('',Validators.required),
      reminderIds1:new FormControl('',Validators.required),
      reminderPeriod2:new FormControl('',Validators.required),
      reminderIds2:new FormControl('',Validators.required),
      reminderPeriod3:new FormControl('',Validators.required),
      reminderIds3:new FormControl('',Validators.required),
      templateEscalation:new FormControl('',Validators.required),
      templateReminder:new FormControl('',Validators.required),
      scope:new FormControl('',Validators.required),
      entityIdStr:new FormControl('',Validators.required),
      entityIdNum:new FormControl('',Validators.required),
    });


    //fetching data from service method and display all data here...

    this.proservice.getClientData().subscribe((result:any)=>{
      if (result) 
      {
        this.hideloader();
      }
       this.client1=result['content'];
     })
 
     this.primengConfig.ripple = true;

     this.statuses = [{label: 'low', value: 'Low'},{label: 'Mid', value: 'Mid'},{label: 'High', value: 'High'},
     {label: 'Very High', value: 'Very High'},{label: 'Critical', value: 'Critical'},{label: 'Blocked', value: 'Blocked'}]
    
  }

  hideloader() {
    this.loader=false;
  }

  onSave() {

    this.submitted=true;

 
    

    this.ruleForm.value.projectId=this.selectedProjectId['projectId'];
    //console.log(this.ruleForm.value.projectId);
    this.ruleForm.value.level=this.selectedLevel['level']; 

    console.log("ninad",this.ruleForm.value);

    this.proservice.ruleData(this.ruleForm.value).subscribe(
      (data:any)=>{
        alert("rule data successfully added");
        console.log(data);
        // this.router.navigate(['/uikit/rules']);
        window.location.reload();
        
      },
      (error)=>{
        alert("something went wrong");
      }
    );    
    this.hideDialog();
  }


  //edit table
  onRowEditInit(product: RuleData) {
    this.clonedProducts[product.projectId] = {...product};
}

onRowEditSave(product: RuleData) {
    // if (product.price > 0) {
    //     delete this.clonedProducts[product.id];
    //     this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    // }  
    // else {
    //     this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
    // }

    this.proservice.editRuleData(product.id,product).subscribe((data:any)=>{
      alert("rule data edited successfully");
      this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
      console.log(data);
      // this.router.navigate(['/uikit/rules']);
      
    },
    (error)=>{
      alert("something went wrong");
    })
}

onRowEditCancel(product: RuleData, index: number) {
    this.ruleData[index] = this.clonedProducts[product.projectId];
    delete this.ruleData[product.projectId];
}


//crud table

//to open dialog box
addClient(){
  this.client={};
  this.submitted=false;
  this.clientDialogue=true;
}

//to hide dialog box
hideDialog(){
  this.clientDialogue=false;
  this.submitted=false;
}




//save client information
saveClient(){
  this.submitted=true;
  
    if(this.client.companyName?.trim()){
     if(this.client.id)
     {
     //swal fire code starts here
     this.hideDialog();
     Swal.fire({
         title: 'Do you want to save the changes?',
         showDenyButton: true,
         showCancelButton: true,
         confirmButtonText: 'Save',
         denyButtonText: `Don't save`,
       }).then((result) => {
   
     /* Read more about isConfirmed, isDenied below */
       if (result.isConfirmed) 
       {
           Swal.fire('Saved!', '', 'success')
           //Logic for Update
           this.proservice.updateClient(this.client.id,this.client).subscribe((result)=>{
           window.location.reload();
         })          
       }else if (result.isDenied) {
         Swal.fire('Changes are not saved', '', 'info')
       }
     })
   }
    else 
    {

 //code for Saving New Client
     this.client.status = true;
       
     //this.client1.push(this.client);
     this.proservice.postClient(this.client).subscribe((result)=>{
         window.location.reload();
         this.messageService.add({severity:'success', summary:'Success', detail:'Client Created Successfully'});
       })
       this.clientDialogue = false;
   }
 }
}


editClient(client:Client)
{
 this.client={...client};
 // this.submitted=false;
 this.clientDialogue=true;
 console.log(client);
}

//method for changing the status of client
changeStatus(client:Client)
{

this.client={...client};
 client.status=false;
 if(this.client.companyName)
 {        
   this.proservice.updateClient(this.client.id,this.client).subscribe((result)=>{
     window.location.reload();
     console.log("status"+result);

     }) 
 }
}


}
