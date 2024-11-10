import { Injectable } from '@angular/core';
import { Message } from 'primeng/api';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  INIT_STATE = { summary: 'INIT', severity: 'info' };

  private send$ = new BehaviorSubject<Message>(this.INIT_STATE);
  sendSub = this.send$.asObservable();

  public send(message: Message): void {
    this.send$.next(message);
  }

  public sendSuccess(summary: string, detail?: string): void {
    this.send({ summary, detail, severity: 'success' });
  }

  public sendError(summary: string, detail?: string): void {
    this.send({ summary, detail, severity: 'error' });
  }

  public sendInfo(summary: string, detail?: string): void {
    this.send({ summary, detail, severity: 'info' });
  }

  public sendWarn(summary: string, detail?: string): void {
    this.send({ summary, detail, severity: 'warn' });
  }
}
