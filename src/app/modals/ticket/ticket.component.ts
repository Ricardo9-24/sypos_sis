import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {
  nIdOrden = 1;
  jsBarra:any = "TIC0001007003981"
  @ViewChild('ticket') content:ElementRef | undefined; 
  constructor() { }

  ngOnInit(): void {
  }

  imprimirPDF(){
    const options = {
      background: 'white',
      scale: 2
    };
    let content = this.content?.nativeElement;
    console.log(content)
    let pdfContent = window.document.getElementById("ticket");
    const bufferX = 5;
    const bufferY = 15;

    html2canvas(content,options).then(canvas =>{
      const content = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'pt', 'A4');
      const imgProps = (pdf as any).getImageProperties(content);
      console.log(imgProps)
      var width = pdf.internal.pageSize.getWidth() -1 * bufferX;
            
      const height = (imgProps.height * width) / imgProps.width;
          console.log(height)  
      pdf.addImage(content, 'PNG', bufferX, bufferY, width, height, undefined, 'FAST');
      return pdf;
    }).then(docResult => {
      docResult.save('Cotizacion_'+ this.nIdOrden+'.pdf');

    });

  }

}
