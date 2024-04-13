import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { UploadFileService } from 'src/app/services/uploadFile/upload-file.service';

// import { UploadsService } from 'src/app/services/uploads.service';

@Component({
  selector: 'app-uploads',
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent implements OnInit {

  profileForm = new UntypedFormGroup({ });
  error: string = "";

  fileUpload = {status: '', message: '', filePath: ''};

  constructor(private fb: FormBuilder, private fileUploadService: UploadFileService) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });
  }

  onSelectedFile(event:any) {
    console.log(event)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.patchValue({
        profile:file
      });
    }
    console.log(this.profileForm)
  }

  onSubmit() {
    console.log(this.profileForm)
    const formData = new FormData();
    console.log(this.profileForm.get('profile')?.value)
    formData.append('profile', this.profileForm.get('profile')?.value);
    formData.append('name', this.profileForm.get('name')?.value);
    console.log(formData)
    // formData.append('profile', this.profileForm.get('profile').value);

    this.fileUploadService.upload(formData).subscribe(result =>{
      console.log(result);
       this.fileUpload = result
      // this.error = err
    }
      // console.log(res)
    );
  }

}
