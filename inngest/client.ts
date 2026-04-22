import { Inngest } from "inngest"
import { InngestEnvSchema } from "@/lib/env"

InngestEnvSchema.parse(process.env)

export const inngest = new Inngest({ id: "orchestr8" })
