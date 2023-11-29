import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

Algun codigo que funciona 28

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("orchestrator", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('orchestrator', {
    connection: 'azureQueueConnection',
    queueName: '333333-1111111-79f2e051a7c0e242f555',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});