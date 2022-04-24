process.env.NODE_ENV = "test";

import "../../pathAlias";

import * as records from "./records";

describe("V1 Apis Tests", () => {
  // before((done) => {
  //   setTimeout(() => {
  //     done();
  //   }, 3000);
  // });

  describe("Records Tests", () => {
    it("Users List", records.recordsListTest);
  });

  // after(async () => {
  //   return new Promise(async (resolve, reject) => {
  //     const promises: any = [];

  //     await Promise.all(promises);

  //     resolve(null);
  //   }).then(function (result) {
  //     //  Can't use done flow, in latest version
  //     //  This is a fix
  //     expect(true).to.be.true;
  //   });
  // });
});
