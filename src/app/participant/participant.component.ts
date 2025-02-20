import { CallingService } from './../calling.service';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StreamVideoParticipant } from '@stream-io/video-client';

@Component({
  selector: 'app-participant',
  standalone: true,
  imports: [],
  templateUrl: './participant.component.html',
  styleUrl: './participant.component.css'
})
export class ParticipantComponent {
  @ViewChild('videoElement') videoElement !: ElementRef<HTMLVideoElement>;
  @ViewChild('audioElement') audioElement !: ElementRef<HTMLAudioElement>;

  @Input() participant !: StreamVideoParticipant;
  unbindVideoElement: (() => void) | undefined;
  unbindAudioElement: (() => void) | undefined;
constructor(private CallingService:CallingService){}
ngAfterViewInit(): void {
  //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //Add 'implements AfterViewInit' to the class.
  this.unbindVideoElement = this.CallingService
.call()
?. bindVideoElement(
this.videoElement.nativeElement,
this.participant.sessionId,
'videoTrack');
this.unbindAudioElement=this.CallingService.call()?.bindAudioElement(this.audioElement.nativeElement,this.participant.sessionId)
}
ngOnDestroy(): void {
  //Called once, before the instance is destroyed.
  //Add 'implements OnDestroy' to the class.

  this.unbindAudioElement?.();
  this.unbindVideoElement?.();
}
}
