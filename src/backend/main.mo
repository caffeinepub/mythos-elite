import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Blob "mo:core/Blob";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  // Types
  type Blueprint = {
    id : Text;
    name : Text;
    traits : [Trait];
    doctrineManual : ?Text;
    lastModified : Time.Time;
  };

  type Trait = {
    name : Text;
    description : Text;
  };

  type Artifact = {
    id : Text;
    name : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type TwinDraft = {
    id : Text;
    prompt : Text;
    response : Text;
    timestamp : Time.Time;
  };

  type Playbook = {
    id : Text;
    title : Text;
    audience : Text;
    constraints : Text;
    content : Text;
    timestamp : Time.Time;
  };

  type Scenario = {
    id : Text;
    name : Text;
    assumptions : [Assumption];
    outcomeSummary : Text;
    branches : [Branch];
    timestamp : Time.Time;
  };

  type Assumption = {
    name : Text;
    value : Text;
  };

  type Branch = {
    name : Text;
    rationale : Text;
  };

  module Blueprint {
    public func compare(b1 : Blueprint, b2 : Blueprint) : Order.Order {
      Text.compare(b1.id, b2.id);
    };
  };

  module Artifact {
    public func compare(a1 : Artifact, a2 : Artifact) : Order.Order {
      Text.compare(a1.id, a2.id);
    };
  };

  module TwinDraft {
    public func compare(t1 : TwinDraft, t2 : TwinDraft) : Order.Order {
      Text.compare(t1.id, t2.id);
    };
  };

  module Playbook {
    public func compare(p1 : Playbook, p2 : Playbook) : Order.Order {
      Text.compare(p1.id, p2.id);
    };
  };

  module Scenario {
    public func compare(s1 : Scenario, s2 : Scenario) : Order.Order {
      Text.compare(s1.id, s2.id);
    };
  };

  // Persistent Storage
  let blueprints = Map.empty<Text, Blueprint>();
  let artifacts = Map.empty<Text, Artifact>();
  let twinDrafts = Map.empty<Text, TwinDraft>();
  let playbooks = Map.empty<Text, Playbook>();
  let scenarios = Map.empty<Text, Scenario>();

  // File Storage
  include MixinStorage();

  // Blueprint Methods
  public shared ({ caller }) func saveBlueprint(id : Text, name : Text, traits : [Trait]) : async () {
    let blueprint : Blueprint = {
      id;
      name;
      traits;
      doctrineManual = null;
      lastModified = Time.now();
    };
    blueprints.add(id, blueprint);
  };

  public query ({ caller }) func getBlueprint(id : Text) : async Blueprint {
    switch (blueprints.get(id)) {
      case (null) { Runtime.trap("Blueprint not found") };
      case (?blueprint) { blueprint };
    };
  };

  public query ({ caller }) func getAllBlueprints() : async [Blueprint] {
    blueprints.values().toArray().sort();
  };

  public shared ({ caller }) func deleteBlueprint(id : Text) : async () {
    switch (blueprints.get(id)) {
      case (null) { Runtime.trap("Blueprint not found") };
      case (?_) {
        blueprints.remove(id);
      };
    };
  };

  // Artifact Methods
  public shared ({ caller }) func saveArtifact(id : Text, name : Text, content : Text) : async () {
    let artifact : Artifact = {
      id;
      name;
      content;
      timestamp = Time.now();
    };
    artifacts.add(id, artifact);
  };

  public query ({ caller }) func getArtifact(id : Text) : async Artifact {
    switch (artifacts.get(id)) {
      case (null) { Runtime.trap("Artifact not found") };
      case (?artifact) { artifact };
    };
  };

  public query ({ caller }) func getAllArtifacts() : async [Artifact] {
    artifacts.values().toArray().sort();
  };

  public shared ({ caller }) func deleteArtifact(id : Text) : async () {
    switch (artifacts.get(id)) {
      case (null) { Runtime.trap("Artifact not found") };
      case (?_) {
        artifacts.remove(id);
      };
    };
  };

  // Twin Draft Methods
  public shared ({ caller }) func saveTwinDraft(id : Text, prompt : Text, response : Text) : async () {
    let twinDraft : TwinDraft = {
      id;
      prompt;
      response;
      timestamp = Time.now();
    };
    twinDrafts.add(id, twinDraft);
  };

  public query ({ caller }) func getTwinDraft(id : Text) : async TwinDraft {
    switch (twinDrafts.get(id)) {
      case (null) { Runtime.trap("Twin Draft not found") };
      case (?twinDraft) { twinDraft };
    };
  };

  public query ({ caller }) func getAllTwinDrafts() : async [TwinDraft] {
    twinDrafts.values().toArray().sort();
  };

  public shared ({ caller }) func deleteTwinDraft(id : Text) : async () {
    switch (twinDrafts.get(id)) {
      case (null) { Runtime.trap("Twin Draft not found") };
      case (?_) {
        twinDrafts.remove(id);
      };
    };
  };

  // Playbook Methods
  public shared ({ caller }) func savePlaybook(id : Text, title : Text, audience : Text, constraints : Text, content : Text) : async () {
    let playbook : Playbook = {
      id;
      title;
      audience;
      constraints;
      content;
      timestamp = Time.now();
    };
    playbooks.add(id, playbook);
  };

  public query ({ caller }) func getPlaybook(id : Text) : async Playbook {
    switch (playbooks.get(id)) {
      case (null) { Runtime.trap("Playbook not found") };
      case (?playbook) { playbook };
    };
  };

  public query ({ caller }) func getAllPlaybooks() : async [Playbook] {
    playbooks.values().toArray().sort();
  };

  public shared ({ caller }) func deletePlaybook(id : Text) : async () {
    switch (playbooks.get(id)) {
      case (null) { Runtime.trap("Playbook not found") };
      case (?_) {
        playbooks.remove(id);
      };
    };
  };

  // Scenario Methods
  public shared ({ caller }) func saveScenario(id : Text, name : Text, assumptions : [Assumption], outcomeSummary : Text, branches : [Branch]) : async () {
    let scenario : Scenario = {
      id;
      name;
      assumptions;
      outcomeSummary;
      branches;
      timestamp = Time.now();
    };
    scenarios.add(id, scenario);
  };

  public query ({ caller }) func getScenario(id : Text) : async Scenario {
    switch (scenarios.get(id)) {
      case (null) { Runtime.trap("Scenario not found") };
      case (?scenario) { scenario };
    };
  };

  public query ({ caller }) func getAllScenarios() : async [Scenario] {
    scenarios.values().toArray().sort();
  };

  public shared ({ caller }) func deleteScenario(id : Text) : async () {
    switch (scenarios.get(id)) {
      case (null) { Runtime.trap("Scenario not found") };
      case (?_) {
        scenarios.remove(id);
      };
    };
  };

  // Demo Data
  public shared ({ caller }) func seedDemoData() : async () {
    blueprints.clear();
    artifacts.clear();
    twinDrafts.clear();
    playbooks.clear();
    scenarios.clear();

    // Example Blueprint
    let blueprint : Blueprint = {
      id = "blueprint1";
      name = "Demo Blueprint";
      traits = [{
        name = "Risk Tolerance";
        description = "Comfortable with high stakes and potential losses.";
      }];
      doctrineManual = ?("This is a demo doctrine manual with strategic heuristics...");
      lastModified = Time.now();
    };
    blueprints.add(blueprint.id, blueprint);

    // Example Artifacts
    let artifact1 : Artifact = {
      id = "artifact1";
      name = "Founder Interview";
      content = "Transcript of founder's interview focusing on strategic vision.";
      timestamp = Time.now();
    };
    let artifact2 : Artifact = {
      id = "artifact2";
      name = "Strategic Memo";
      content = "Confidential memo outlining market entry strategies.";
      timestamp = Time.now();
    };
    artifacts.add(artifact1.id, artifact1);
    artifacts.add(artifact2.id, artifact2);

    // Example Twin Draft
    let twinDraft : TwinDraft = {
      id = "twinDraft1";
      prompt = "How would you respond to a major market disruption?";
      response = "Leverage core competencies, double down on innovation and maintain transparency with stakeholders.";
      timestamp = Time.now();
    };
    twinDrafts.add(twinDraft.id, twinDraft);

    // Example Playbook
    let playbook : Playbook = {
      id = "playbook1";
      title = "Public Identity Positioning";
      audience = "Investors";
      constraints = "Focus on transparency and innovation";
      content = "Strategic communication plan aimed at establishing market leadership through consistent messaging and thought leadership.";
      timestamp = Time.now();
    };
    playbooks.add(playbook.id, playbook);

    // Example Scenarios
    let scenario1 : Scenario = {
      id = "scenario1";
      name = "Product Launch Decision";
      assumptions = [{
        name = "Market Demand";
        value = "High";
      }];
      outcomeSummary = "Product launch carries a 65% probability of success based on market analysis and competitor landscape.";
      branches = [{
        name = "Immediate Launch";
        rationale = "Capitalize on current interest and momentum.";
      }];
      timestamp = Time.now();
    };

    let scenario2 : Scenario = {
      id = "scenario2";
      name = "Competitor Acquisition";
      assumptions = [{
        name = "Valuation";
        value = "Favorable";
      }];
      outcomeSummary = "Acquisition is predicted to streamline market share growth with a manageable risk profile.";
      branches = [{
        name = "Due Diligence";
        rationale = "Conduct a thorough analysis to validate market and synergy assumptions.";
      }];
      timestamp = Time.now();
    };
    scenarios.add(scenario1.id, scenario1);
    scenarios.add(scenario2.id, scenario2);
  };
};
