import express from "express";
import { getPayloadClient } from "./get-payload";
import { nextApp } from "./next-utils";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

const start = async () => {
  // payload ...
  const payload = await getPayloadClient({
    initOptions: {
      express: app,
      onInit: async (cms) => {
        cms.logger.info(`Admin URL : ${cms.getAdminURL()}`);
      },
    },
  });

  nextApp.prepare().then(() => {
    payload.logger.info("next js started");

    app.listen(PORT, async () => {
      payload.logger.info(
        `Next.js APP URL : ${process.env.NEXT_PUBLIC_SERVER_URL}`
      );
    });
  });
};

start();
