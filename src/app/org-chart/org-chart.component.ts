import { Component, Inject, inject } from '@angular/core';
import { OrgService } from '../core/services/org.service';
import { FamItemConfig, Size } from 'ngx-basic-primitives';
import { MatRadioChange } from '@angular/material/radio';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '../core/interfaces';
import { debounceTime, distinctUntilChanged, fromEvent, map } from 'rxjs';
@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent {
  private orgService: OrgService = inject(OrgService);
  private dialogBox: MatDialog = inject(MatDialog)
  x: any
  items: any[] = [];
  cursorItem:string=''
  employeeData: any = []
  templateName :string= "md";
  showGraph=true;
  constructor() {
    this.initEmployeeData()
  }
//getting employe data 
  initEmployeeData() {
    this.orgService.getEmployeedata().subscribe((res: any) => {
      this.employeeData = res?.data
      console.log(this.employeeData)
      const mapped = Object.keys(this.employeeData).map(key => ({ type: key, value: this.employeeData[key] }));
      const modifiedEmployees = mapped[0].value.map((employee: { employeeId: any; mentorId: any; name: any; lable: any; image: any; profileimage: any }) => {
        return {
          ...employee,
          id: employee.employeeId,
          title: employee.name,
          lable: employee.name,
          employeeId: employee.employeeId,
          parents: employee.mentorId,
          mentorId: employee.mentorId,
          image: employee.profileimage
        };
      });
      console.log(modifiedEmployees, "modifiedEmployees")
      for (let i of modifiedEmployees) {
        this.x = new FamItemConfig(i)
        this.items.push(this.x);
      }
    })
  }
  defaultTemplateName = "md";
  normalLevelShift = 120;
  normalItemsInterval = 120;
  //screen or frame sizes
  sizes2: {[id: string]:Size} = {
    "1920 * 1070": new Size( 1280, 600),
    "640 * 480":new Size(640*640)
  
  };
  autoSizeMinimumKey: string = "640*480";
  autoSizeMinimum = this.sizes2[this.autoSizeMinimumKey];
  autoSizeMaximumKey: string = "1920 * 1070";
  autoSizeMaximum = this.sizes2[this.autoSizeMaximumKey];
  openDialog(employeeData: any) {
    const dialogRef = this.dialogBox.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: employeeData.name,
        image:employeeData.profileimage,
        designation:employeeData.designation    }
    });
    dialogRef.afterClosed()
    };
    searchResults: any = [];
    searchEmployee(id: { name: string; employeeId: string; }) {
   console.log(id?.employeeId)
   this.cursorItem=id?.employeeId
   this.searchResults.length=0
      }
  //serching employee
    onSearch(event: Event) {
      const searchTerm = (event.target as HTMLInputElement).value;
      fromEvent(document, 'input')
      .pipe(
        map((event) => (event.target as HTMLInputElement).value),
        debounceTime(500),
        distinctUntilChanged(),
        map((searchTerm) => {
          if (searchTerm.trim() === '') {
            return [];
          } else {
            return this.employeeData.items.filter((item: { name: string; }) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }
        })
      )
      .subscribe((searchResults) => {
        console.log(searchResults)
        this.searchResults = searchResults;
      });
  }
  }
//for popup

@Component({
  selector: 'app-pop',
  templateUrl: './popup.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}