import { CallingService } from './../calling.service';
import { Component, Input, Signal, OnInit } from '@angular/core';
import { ParticipantComponent } from "../participant/participant.component";
import { CommonModule } from '@angular/common';
import { Call, StreamVideoParticipant } from '@stream-io/video-client';
import { state } from '@angular/animations';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-call',
  standalone: true,
  imports: [CommonModule,ParticipantComponent],
  templateUrl: './call.component.html',
  styleUrl: './call.component.css'
})
export class CallComponent {

  OnInit(){
    if (this.call) {
      console.log('Video call started:', this.call);
    } else {
      console.log('No active call.');
    }
  }
  @Input({required:true}) call!:Call;
  participants:Signal<StreamVideoParticipant[]>;
  constructor(private CallingService:CallingService){
    this.participants=toSignal(
      this.CallingService.call()!.state.participants$,
      {requireSync:true}
    );
  }

  toggleMicrophone(){
    this.call.microphone.toggle(); }
    toggleCamera(){
      this.call.camera.toggle(); }
      trackBySessionId(_:number,participant:StreamVideoParticipant){
        return participant.sessionId;
      }
      leaveCall(){
        this.CallingService.setCallId(undefined);
      }

}
