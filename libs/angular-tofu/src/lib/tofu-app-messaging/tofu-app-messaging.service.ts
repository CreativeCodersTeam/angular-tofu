// noinspection JSValidateJSDoc

import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject } from 'rxjs';

export interface TofuAppMessage<T> {
  type: unknown;
  payload: T;
}

/**
 * A messaging service for coordinating communication.
 * Provides functionality to send and receive messages of specific types using a reactive programming approach.
 *
 * This service facilitates decoupled communication between different components or services by using observables
 * and subscriptions. Messages can be sent with a specific type and payload, allowing interested components
 * to register and listen for messages of specific types.
 */
@Injectable({
  providedIn: 'root',
})
export class TofuAppMessagingService {
  private messageSubject = new Subject<TofuAppMessage<unknown>>();

  private messages$ = this.messageSubject.asObservable();

  /**
   * Sends a message to the appropriate receivers.
   *
   * @param {TofuAppMessage<T>} message - The message object to be sent, which contains the payload and associated metadata.
   * @return {void} This method does not return a value.
   */
  public sendMessage<T>(message: TofuAppMessage<T>): void {
    this.messageSubject.next(message);
  }

  /**
   * Sends a message to the appropriate receivers.
   *
   * @param {string} messageType - The type of the message to send.
   * @param {T} payload - The data to be sent with the message.
   * @return {void} This method does not return a value.
   */
  public send<T>(messageType: string, payload: T): void {
    this.messageSubject.next({ type: messageType, payload: payload });
  }

  /**
   * Registers to listen for messages of a specific type and returns an observable that emits the payload of those messages.
   *
   * @param {string} messageType - The type of message to listen for.
   * @return {Observable<T>} An observable that emits the payload messages of the specified type.
   */
  public register<T>(messageType: string): Observable<T> {
    return this.messages$.pipe(
      map((message: TofuAppMessage<unknown>) => message as TofuAppMessage<T>),
      filter((message: TofuAppMessage<T>) => message.type === messageType),
      map((message: TofuAppMessage<T>) => message.payload)
    );
  }

  /**
   * Registers a callback function to be invoked whenever a message of the specified type is received.
   *
   * @param {string} messageType - The type of message to listen for.
   * @param {(message: T) => void} callback - A function to handle the received message.
   * @return {Subscription} A subscription object that can be used to unsubscribe from the message listener.
   */
  public registerWithCallback<T>(
    messageType: string,
    callback: (message: T) => void
  ) {
    return this.register<T>(messageType).subscribe(callback);
  }
}
