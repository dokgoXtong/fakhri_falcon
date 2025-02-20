import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CallComponent } from './call/call.component';
import { CommonModule } from '@angular/common';
import {
  ChannelService,
  StreamChatModule
} from 'stream-chat-angular';
import { CallingService } from './calling.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CallComponent, CommonModule, StreamChatModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  callingService: CallingService;
  channelService: ChannelService; // Declare the channelService property
  title = 'Falcons';

  constructor(callingService: CallingService, channelService: ChannelService) {
    this.callingService = callingService;
    this.channelService = channelService; // Properly inject the ChannelService
  }

  startCall() {
    const channelId = 'some-channel-id'; // Replace with actual logic to get the channel ID
    this.callingService.setCallId(channelId);
    this.callingService.joinCall(); // Join the call after setting the ID
  }
}
