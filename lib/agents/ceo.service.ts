// Option A: If the subsequent logic should use the scrubbed data
const clientContext = signal.clientId ? await this.getGlobalContext(signal.clientId) : null;
const cleanData = medicAgent.scrubSensitiveData(signal.data, clientContext?.region);

// Pass cleanData to the next process instead of raw signal.data
const result = await this.processValidatedSignal(cleanData); 

// --- OR ---

// Option B: If you aren't ready to use it yet, underscore it to tell the linter it's intentional
const _cleanData = medicAgent.scrubSensitiveData(signal.data, clientContext?.region);
