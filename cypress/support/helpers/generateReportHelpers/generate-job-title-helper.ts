import { GenerateJobTitlePayload } from "../../interfaces/payload/GenerateJobTitlePayloadInterface";
import JobTitleInitClass from "../../init/job-title-init";

const baseUrl = Cypress.config("baseUrl");

let JOB_TITLE_ID: number;
export let JOB_TITLE: string;


export const URLs = {
  jobTitleURL: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
};

export default class GenerateJobTitleHelper {
  static addJobTitlesViaAPI() {
    return new Cypress.Promise((resolve, reject) => {
      cy.request({
        method: "POST",
        url: `${URLs.jobTitleURL}`,
        body: JobTitleInitClass.initJobTitle(),
      }).then((response) => {
        cy.log("---- SUCCESSFULL: ADMIN ADD NEW JOB TITLE ----");
        JOB_TITLE_ID = response.body.data.id;
        JOB_TITLE = response.body.data.title;
        resolve(JOB_TITLE_ID);
      });
    });
  }
}
