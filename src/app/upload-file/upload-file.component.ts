import { Component, OnInit } from '@angular/core';
import { UploadFileService } from './upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  shortLink: string = "";
  loading: boolean = false;
  file: File = null as any;
$e: any;

  constructor(private uploadFileService: UploadFileService) { }

  ngOnInit(): void {
  }

  // Lorsque le fichier est selectionné
  onChange(e: any) {
    this.file = e.target.files[0];
  }

  // Lors du clic sur le boutton de selection du fichier
  onUpload() {
    this.loading = !this.loading;
    this.uploadFileService.upload(this.file).subscribe(
      (e: any) => {
        if(typeof (e) === 'object') {

          this.shortLink = e.link;
          this.loading = false;
      }
    }
    );
  }
}
