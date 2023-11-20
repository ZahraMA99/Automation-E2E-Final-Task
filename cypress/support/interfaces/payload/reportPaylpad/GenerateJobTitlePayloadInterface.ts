export interface GenerateJobTitlePayload {
  title: string;
  description: string;
  specification: {
    name: string;
    type: string;
    size: number;
    base64: string;
  };
  note: string;
}
