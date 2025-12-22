// mic-recorder-to-mp3.d.ts
declare module 'mic-recorder-to-mp3' {
  export interface MicRecorderOptions {
    bitRate?: number;
  }

  export interface RecordingResult {
    buffer: ArrayBuffer;
    blob: Blob;
  }

  export default class MicRecorder {
    constructor(options?: MicRecorderOptions);
    
    start(): Promise<void>;
    
    stop(): {
      getMp3(): Promise<[ArrayBuffer, Blob]>;
    };
  }
}
