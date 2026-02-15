import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface TwinDraft {
    id: string;
    response: string;
    timestamp: Time;
    prompt: string;
}
export interface Scenario {
    id: string;
    name: string;
    timestamp: Time;
    assumptions: Array<Assumption>;
    branches: Array<Branch>;
    outcomeSummary: string;
}
export interface Branch {
    name: string;
    rationale: string;
}
export interface Blueprint {
    id: string;
    doctrineManual?: string;
    traits: Array<Trait>;
    name: string;
    lastModified: Time;
}
export interface Assumption {
    value: string;
    name: string;
}
export interface Playbook {
    id: string;
    title: string;
    constraints: string;
    content: string;
    audience: string;
    timestamp: Time;
}
export interface Artifact {
    id: string;
    content: string;
    name: string;
    timestamp: Time;
}
export interface Trait {
    name: string;
    description: string;
}
export interface backendInterface {
    deleteArtifact(id: string): Promise<void>;
    deleteBlueprint(id: string): Promise<void>;
    deletePlaybook(id: string): Promise<void>;
    deleteScenario(id: string): Promise<void>;
    deleteTwinDraft(id: string): Promise<void>;
    getAllArtifacts(): Promise<Array<Artifact>>;
    getAllBlueprints(): Promise<Array<Blueprint>>;
    getAllPlaybooks(): Promise<Array<Playbook>>;
    getAllScenarios(): Promise<Array<Scenario>>;
    getAllTwinDrafts(): Promise<Array<TwinDraft>>;
    getArtifact(id: string): Promise<Artifact>;
    getBlueprint(id: string): Promise<Blueprint>;
    getPlaybook(id: string): Promise<Playbook>;
    getScenario(id: string): Promise<Scenario>;
    getTwinDraft(id: string): Promise<TwinDraft>;
    saveArtifact(id: string, name: string, content: string): Promise<void>;
    saveBlueprint(id: string, name: string, traits: Array<Trait>): Promise<void>;
    savePlaybook(id: string, title: string, audience: string, constraints: string, content: string): Promise<void>;
    saveScenario(id: string, name: string, assumptions: Array<Assumption>, outcomeSummary: string, branches: Array<Branch>): Promise<void>;
    saveTwinDraft(id: string, prompt: string, response: string): Promise<void>;
    seedDemoData(): Promise<void>;
}
