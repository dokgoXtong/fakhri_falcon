import { Injectable, computed, signal } from '@angular/core';
import { Call, StreamVideoClient, User } from '@stream-io/video-client';

@Injectable({
  providedIn: 'root',
})
export class CallingService {
  // Declare the signal to track the call ID
  calledId = signal<string | undefined>(undefined);

  // The computed property just returns the call instance based on the calledId
  call = computed<Call | undefined>(() => {
    const currentCallId = this.calledId();
    if (currentCallId !== undefined) {
      return this.client.call('default', currentCallId);
    }
    return undefined;
  });

  // Instance of StreamVideoClient
  client: StreamVideoClient;

  constructor() {
    const apiKey = 'hra2mhde5bfj';

    // Generate token dynamically or use a pre-generated token
    const token = this.generateTokenForUser('fakhri');  // Ensure token corresponds to user.id '9ss'
    const user: User = { id: 'fakhri' };

    // Initialize StreamVideoClient with token and user
    this.client = new StreamVideoClient({ apiKey, token, user });
  }

  // Generate token for the specified user (replace this with actual logic if needed)
  generateTokenForUser(userId: string): string {
    // Replace with an actual logic for token generation. This is just an example token.
    // In production, this would be dynamically generated using Stream's backend API.
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZmFraHJpIn0.z4xV-DC3fqVWlackDvbUdrlRWi5MFPMYoqE86Uq2qQ8'; // Manually generated or fetched from a token generation tool
    return token;
  }

  // Set the call ID and handle joining/leaving logic
  setCallId(callId: string | undefined) {
    if (callId === undefined) {
      const currentCall = this.call();
      if (currentCall) {
        currentCall.leave();
      }
    }
    this.calledId.set(callId);
  }

  // Start or join the call asynchronously
  async joinCall() {
    const currentCall = this.call();
    if (currentCall) {
      await currentCall.join({ create: true });
      currentCall.camera.enable();
      currentCall.microphone.enable();
    }
  }

  // Leave the call
  leaveCall() {
    const currentCall = this.call();
    if (currentCall) {
      currentCall.leave();
    }
  }
}
