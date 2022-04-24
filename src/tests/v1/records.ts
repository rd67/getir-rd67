import "mocha";
import { expect } from "chai";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

import app from "../../index";

import { STATUS_CODES } from "@config/constants";

import * as recordInterfaces from "v1/records/interfaces";

const apiPath = "/v1/records";

export const recordsListTest = async () => {
  const data: recordInterfaces.RecordsListParams = {
    startDate: "2019-04-24",
    endDate: "2022-04-24",
    minCount: 0,
    maxCount: 1000,
  };

  const response = await chai.request(app).post(apiPath).send(data);

  expect(response).to.have.status(STATUS_CODES.SUCCESS);

  expect(response.body).to.have.own.property("code").to.be.eq(1);
  expect(response.body).to.have.own.property("msg");
  expect(response.body).to.have.own.property("data");

  const responseData = response.body.data;

  expect(responseData).to.have.own.property("records").to.be.an("array");
};
