import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  // shortLink: string = "";
  // loading: boolean = false;
  // file: File = null as any;
  // $e: any;

  selectFiles!: FileList;
  currentFile!: File;
  progress = 0;
  message = "";

  fileInfos!: Observable<any>;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadFileService.getFiles();
  }

  // Lorsque le fichier est selectionné
  // onChange(e: any) {
  //   this.file = e.target.files[0];
  // }

  selecteFiles(e: any) {
    this.selectFiles = e.target.files;
  }

  // Lors du clic sur le boutton de selection du fichier
  // onUpload() {
  //   this.loading = !this.loading;
  //   this.uploadFileService.upload(this.file).subscribe(
  //     (e: any) => {
  //       if(typeof (e) === 'object') {

  //         this.shortLink = e.link;
  //         this.loading = false;
  //     }
  //   }
    // );
  // }
  upload() {
    this.progress = 0;

    this.currentFile = this.selectFiles.item(0)!;
    this.uploadFileService.upload(this.currentFile).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadFileService.getFiles();
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Could not upload the file!';
        this.currentFile = undefined!;
      });

    this.selectFiles = undefined!;
  }

}
