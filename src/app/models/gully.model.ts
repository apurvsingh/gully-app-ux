export interface GullyRequest {
  name: string
  height: number;
  width: number;
  pipeHeight: number;
  pipeDiameter: number;
  waterHeight: number;
}

export interface GullyResponse extends GullyRequest{
  error: Error
}

export interface Error{
  errorMessage: string
}