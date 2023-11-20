import GenerateRandomNumberClass from "../../generic-functions/generate-random-numbers";
import { GenerateJobTitlePayload } from "../../interfaces/payload/reportPaylpad/GenerateJobTitlePayloadInterface";

let randomNumber = GenerateRandomNumberClass.generateRandomNumber();
let jobSpecificationFilePath =
  "cypress\fixturessoftware-engineer-job-specification-dialog.txt";

export default class JobTitleInitClass {
  static initJobTitle(): GenerateJobTitlePayload {
    return {
      title: `Software Engineer ${randomNumber}`,
      description:
        "A Software Engineer is a professional who designs, develops, tests, and maintains software applications, systems, and solutions.",
      specification: {
        name: jobSpecificationFilePath,
        type: "text/plain",
        size: 303,
        base64:
          "QSBTb2Z0d2FyZSBFbmdpbmVlciBpcyBhIHByb2Zlc3Npb25hbCB3aG8gZGVzaWducywgZGV2ZWxvcHMsIHRlc3RzLCBhbmQgbWFpbnRhaW5zIHNvZnR3YXJlIGFwcGxpY2F0aW9ucywgc3lzdGVtcywgYW5kIHNvbHV0aW9ucy4gVGhleSBwbGF5IGEgY3J1Y2lhbCByb2xlIGluIHRoZSBzb2Z0d2FyZSBkZXZlbG9wbWVudCBsaWZlIGN5Y2xlLCBjb250cmlidXRpbmcgdG8gdGhlIGNyZWF0aW9uIG9mIHNvZnR3YXJlIHByb2R1Y3RzIHRoYXQgbWVldCBzcGVjaWZpYyByZXF1aXJlbWVudHMgYW5kIHByb3ZpZGUgdmFsdWUgdG8gdXNlcnMu",
      },
      note: "Software Engineer",
    };
  }
}
