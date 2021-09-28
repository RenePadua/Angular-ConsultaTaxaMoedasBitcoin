import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface btcRate {
  time: {
    updated: string;
  };
  bpi: {
    USD: {
      rate_float: number;
    };
    BRL: {
      rate_float: number;
    };
  };
}

@Injectable()
export class BtcService {
  RateBtc: Array<btcRate> = []; 

  constructor(private http: HttpClient) {
    if (this.RateBtc.length == 0) {
      this.newRateBtc();
    }
    this.timerUpdate();
  }

  timerUpdate() {
    setInterval(() => {
      this.newRateBtc();
    }, 60000);
  }

  checkRate(oldRate: number, newRate: number) {
    if (oldRate === newRate) {
      return 0;
    }
    else {
      return 1;
    }
  }

  newRateBtc() {
    this.http
      .get<btcRate>('https://api.coindesk.com/v1/bpi/currentprice/BRL.json')
      .subscribe((data) => {
        if (this.RateBtc.length == 0) {
          this.RateBtc.push(data);
        }

        if (
          this.checkRate(
            this.RateBtc[this.RateBtc.length - 1].bpi.USD.rate_float,
            data.bpi.USD.rate_float) != 0 ||

          this.checkRate(
            this.RateBtc[this.RateBtc.length - 1].bpi.BRL.rate_float,
            data.bpi.BRL.rate_float) != 0 ) 
            {
              this.RateBtc.push(data);
            }
      });
  }
}