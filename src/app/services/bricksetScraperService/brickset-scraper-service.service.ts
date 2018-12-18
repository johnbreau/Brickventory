import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class BricksetScraperService {
  private apiKey: string;
  private userHash: string;
  private year: string;
  private pageSize: string;

  constructor(public http: HttpClient) {
    console.log('Hello BricksetGateway Provider');
  }

  bricketGetSet() {
    this.apiKey = 'PEVh-NM7r-No3K';
    this.userHash = 'johnbreau';
    this.year = '2018';
    this.pageSize = '840';
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://brickset.com/api/v2.asmx?WSDL', true);

    // let sr =
    //     `<?xml version="1.0" encoding="utf-8"?>
    //     <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    //       <soap:Body>
    //         <getSet xmlns="https://brickset.com/api/">
    //           <apiKey>` + this.apiKey + `</apiKey>
    //           <userHash>` + this.userHash + `</userHash>
    //           <SetID>` + this.setID + `</SetID>
    //         </getSet>
    //       </soap:Body>
    //     </soap:Envelope>`;

        // To get all sets...
        const sr =
          `<?xml version="1.0" encoding="utf-8"?>
          <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
            <soap:Body>
            <getSets xmlns="https://brickset.com/api/">
              <apiKey>` + this.apiKey + `</apiKey>
              <userHash>` + this.userHash + `</userHash>
              <query>` + '' + `</query>
              <theme>` + '' + `</theme>
              <subtheme>` + '' + `</subtheme>
              <setNumber>` + '' + `</setNumber>
              <year>` + this.year  + `</year>
              <owned>` + '' + `</owned>
              <wanted>` + '' + `</wanted>
              <orderBy>` + '' + `</orderBy>
              <pageSize>` + this.pageSize + `</pageSize>
              <pageNumber>` + '' + `</pageNumber>
              <userName>` + '' + `</userName>
            </getSets>
            </soap:Body>
          </soap:Envelope>`;

    xmlhttp.onreadystatechange =  () => {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                const jsonText = JSON.stringify(this.xmlToJson(xmlhttp.responseXML));
                console.log('Brickset Return:', jsonText);
            }
        }
    }
    // Send the POST request
    xmlhttp.setRequestHeader('Content-Type', 'text/xml');
    xmlhttp.responseType = 'document';
    xmlhttp.send(sr);
  }

  xmlToJson(xml) {
    // Create the return object
    let obj = {};
    if (xml.nodeType === 1) { // element
      // do attributes
      if (xml.attributes.length > 0) {
      obj['@attributes'] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj['@attributes'][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // text
      obj = xml.nodeValue;
    }
    // do children
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof(obj[nodeName]) === 'undefined') {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof(obj[nodeName].push) === 'undefined') {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
          }
        }
      }
      return obj;
    }
  }
