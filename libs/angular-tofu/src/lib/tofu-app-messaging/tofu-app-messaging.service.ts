import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TofuAppMessagingService {
  private idCounter = 0n;

  registrations: TofuAppMessagingRegistration[] = [];

  constructor() {}

  public register<T>(
    messageType: string,
    callback: (message: T) => void
  ): bigint {
    const newId = this.idCounter++;

    this.registrations.push({
      id: newId,
      type: messageType,
      callback: callback,
    });

    return newId;
  }

  public sendMessage<T>(message: TofuAppMessage<T>) {
    for (const registration of this.registrations) {
      if (registration.type === message.type) {
        registration.callback(message.payload);
      }
    }
  }

  public removeRegistration(registrationId: bigint) {
    this.registrations = this.registrations.filter(
      (r) => r.id !== registrationId
    );
  }
}

export interface TofuAppMessage<T> {
  type: unknown;
  payload: T;
}

interface TofuAppMessagingRegistration {
  id: bigint;
  type: unknown;
  callback: (message: any) => void;
}
