import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("RandomAppModule", (m) => {
  const RandomApp = m.contract("RandomApp", [""]);

  return { RandomApp };
});
