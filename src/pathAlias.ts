import "module-alias/register";

import ModuleAlias from "module-alias";

ModuleAlias.addAliases({
  "@config": `${__dirname}/config`,
  "@docs": `${__dirname}/docs`,
  "@helpers": `${__dirname}/helpers`,
  "@interfaces": `${__dirname}/interfaces`,
  "@middlewares": `${__dirname}/middlewares`,
  "@models": `${__dirname}/models`,
  "@v1": `${__dirname}/v1`,
  "@packages": `${__dirname}/packages`,
});
