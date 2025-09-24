import { createHash } from "crypto";

export const joinUUIDs = (uuids: string[]): string => {
  const sorted = [...uuids].sort();
  const join = sorted.join("-");
  return createHash("sha256").update(join).digest("hex");
};
