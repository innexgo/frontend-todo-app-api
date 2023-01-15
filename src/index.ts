import { fetchApi, Result, staticUrl } from '@innexgo/frontend-common'

export interface Info {
  service: string,
  versionMajor: number,
  versionMinor: number,
  versionRev: number,
  appPubOrigin: string,
  authPubApiHref: string,
  authAuthenticatorHref: string,
}

export interface GoalIntent {
  goalIntentId: number,
  creationTime: number,
  creatorUserId: number
}

export interface GoalIntentData {
  goalIntentDataId: number,
  creationTime: number,
  creatorUserId: number,
  goalIntent: GoalIntent,
  name: string,
  active: boolean
}

export interface Goal {
  goalId: number,
  creationTime: number,
  creatorUserId: number,
  intent?: GoalIntent
}

export interface TimeUtilityFunction {
  timeUtilityFunctionId: number,
  creationTime: number,
  creatorUserId: number,
  startTimes: number[],
  utils: number[],
}

export interface UserGeneratedCode {
  userGeneratedCodeId: number,
  creationTime: number,
  creatorUserId: number,
  sourceCode: string,
  sourceLang: string,
  wasmCache: number[],
}

type GoalDataStatusKind = "SUCCEED" | "FAIL" | "CANCEL" | "PENDING";

export interface GoalData {
  goalDataId: number,
  creationTime: number,
  creatorUserId: number,
  goal: Goal
  name: string,
  durationEstimate: number | null,
  timeUtilityFunction: TimeUtilityFunction,
  status: GoalDataStatusKind
}

export interface GoalEvent {
  goalEventId: number,
  creationTime: number,
  creatorUserId: number,
  goal: Goal,
  startTime: number,
  endTime: number,
  active: boolean,
}

export interface GoalDependency {
  goalDependencyId: number,
  creationTime: number,
  creatorUserId: number,
  goal: Goal,
  dependent_goal: Goal,
  active: boolean,
}

export interface ExternalEvent {
  externalEventId: number,
  creationTime: number,
  creatorUserId: number
}

export interface ExternalEventData {
  externalEventDataId: number,
  creationTime: number,
  creatorUserId: number,
  externalEvent: ExternalEvent,
  name: string,
  startTime: number,
  endTime: number,
  active: boolean
}

export interface GoalTemplate {
  goalTemplateId: number,
  creationTime: number,
  creatorUserId: number,
}

export interface GoalTemplateData {
  goalTemplateDataId: number,
  creationTime: number,
  creatorUserId: number,
  goalTemplate: GoalTemplate,
  name: string,
  utility: number,
  durationEstimate: number | null,
  userGeneratedCode: UserGeneratedCode,
  active: boolean,
}

export interface GoalTemplatePattern {
  goalTemplatePatternId: number,
  creationTime: number,
  creatorUserId: number,
  goalTemplate: GoalTemplate,
  pattern: string,
  active: boolean,
}

type NamedEntityKind =
  "DATE" |
  "TIME" |
  "MONEY" |
  "URL" |
  "PERSON" |
  "LOCATION" |
  "HASHTAG" |
  "EMOTICON" |
  "EMOJI" |
  "PROPN" |
  "VERB";

export interface NamedEntity {
  namedEntityId: number,
  creationTime: number,
  creatorUserId: number,
}

export interface NamedEntityData {
  namedEntityDataId: number,
  creationTime: number,
  creatorUserId: number,
  namedEntity: NamedEntity,
  name: string,
  kind: NamedEntityKind,
  active: boolean,
}

export interface NamedEntityPattern {
  namedEntityPatternId: number,
  creationTime: number,
  creatorUserId: number,
  namedEntity: NamedEntity,
  pattern: string,
  active: boolean,
}

export interface GoalEntityTag {
  goalEntityTagId: number,
  creationTime: number,
  creatorUserId: number,
  namedEntity: NamedEntity,
  goal: Goal,
  active: boolean,
}

export const TodoAppErrorCodes = [
  "NO_CAPABILITY",
  "GOAL_INTENT_NONEXISTENT",
  "GOAL_NONEXISTENT",
  "GOAL_EVENT_NONEXISTENT",
  "GOAL_TEMPLATE_NONEXISTENT",
  "EXTERNAL_EVENT_NONEXISTENT",
  "NAMED_ENTITY_NONEXISTENT",
  "USER_GENERATED_CODE_NONEXISTENT",
  "TIME_UTILITY_FUNCTION_NONEXISTENT",
  "TIME_UTILITY_FUNCTION_NOT_VALID",
  "NEGATIVE_START_TIME",
  "NEGATIVE_DURATION",
  "GOAL_FORMS_CYCLE",
  "DECODE_ERROR",
  "INTERNAL_SERVER_ERROR",
  "METHOD_NOT_ALLOWED",
  "UNAUTHORIZED",
  "BAD_REQUEST",
  "NOT_FOUND",
  "NETWORK",
  "UNKNOWN",
] as const;

// Creates a union type
export type TodoAppErrorCode = typeof TodoAppErrorCodes[number];

async function fetchApiOrNetworkError<T>(url: string, props: object): Promise<Result<T, TodoAppErrorCode>> {
  try {
    const [code, resp] = await fetchApi(url, props);
    if (code >= 200 && code < 300) {
      return { Ok: resp }
    } else {
      return { Err: resp }
    }
  } catch (_) {
    return { Err: "NETWORK" };
  }
}

const undefToTodoAppApi = (s: string | undefined) =>
  s === undefined ? `${staticUrl()}/public/` : s

export interface ExternalEventNewProps {
  name: string,
  startTime: number,
  endTime: number,
  apiKey: string,
}

export function info(appPubApiHref?: string): Promise<Result<Info, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "info", {});
}


export function externalEventNew(props: ExternalEventNewProps, appPubApiHref?: string): Promise<Result<ExternalEventData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "external_event/new", props);
}

export interface ExternalEventDataNewProps {
  externalEventId: number,
  name: string,
  startTime: number,
  endTime: number,
  active: boolean,
  apiKey: string,
}

export function externalEventDataNew(props: ExternalEventDataNewProps, appPubApiHref?: string): Promise<Result<ExternalEventData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "external_event_data/new", props);
}

export interface GoalIntentNewProps {
  name: string,
  apiKey: string,
}

export function goalIntentNew(props: GoalIntentNewProps, appPubApiHref?: string): Promise<Result<GoalIntentData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_intent/new", props);
}

export interface GoalIntentDataNewProps {
  goalIntentId: number,
  name: string,
  active: boolean,
  apiKey: string,
}

export function goalIntentDataNew(props: GoalIntentDataNewProps, appPubApiHref?: string): Promise<Result<GoalIntentData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_intent_data/new", props);
}

export interface GoalNewProps {
  name: string,
  durationEstimate?: number,
  timeUtilityFunctionId: number,
  goalIntentId?: number,
  timeSpan?: [startTime: number, endTime: number],
  apiKey: string,
}

export function goalNew(props: GoalNewProps, appPubApiHref?: string): Promise<Result<GoalData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal/new", props);
}

export interface GoalDataNewProps {
  goalId: number,
  name: string,
  durationEstimate?: number,
  timeUtilityFunctionId: number,
  status: GoalDataStatusKind,
  apiKey: string,
}

export function goalDataNew(props: GoalDataNewProps, appPubApiHref?: string): Promise<Result<GoalData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_data/new", props);
}

export interface GoalEventNewProps {
  goalId: number,
  startTime: number,
  endTime: number,
  active: boolean,
  apiKey: string,
}

export function goalEventNew(props: GoalEventNewProps, appPubApiHref?: string): Promise<Result<GoalEvent, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_event/new", props);
}


export interface GoalDependencyNewProps {
  goalId: number,
  dependentGoalId: number,
  active: boolean,
  apiKey: string,
}

export function goalDependencyNew(props: GoalDependencyNewProps, appPubApiHref?: string): Promise<Result<GoalDependency, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_dependency/new", props);
}


export interface GoalEntityTagNewProps {
  goalId: number,
  namedEntityId: number,
  active: boolean,
  apiKey: string,
}

export function goalEntityTagNew(props: GoalEntityTagNewProps, appPubApiHref?: string): Promise<Result<GoalEntityTag, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_entity_tag/new", props);
}

export interface TimeUtilityFunctionNewProps {
  startTimes: number[],
  utils: number[],
  apiKey: string,
}

export function timeUtilityFunctionNew(props: TimeUtilityFunctionNewProps, appPubApiHref?: string): Promise<Result<TimeUtilityFunction, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "time_utility_function/new", props);
}

export interface UserGeneratedCodeNewProps {
  sourceCode: string,
  sourceLang: string,
  wasmCache: number[],
  apiKey: string,
}

export function userGeneratedCodeNew(props: UserGeneratedCodeNewProps, appPubApiHref?: string): Promise<Result<UserGeneratedCode, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "user_generated_code/new", props);
}

export interface GoalTemplateNewProps {
  name: string,
  utility: number,
  durationEstimate?: number,
  userGeneratedCodeId: number,
  apiKey: string,
}

export function goalTemplateNew(props: GoalTemplateNewProps, appPubApiHref?: string): Promise<Result<GoalTemplateData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template/new", props);
}


export interface GoalTemplateDataNewProps {
  goalTemplateId: number,
  name: string,
  utility: number,
  durationEstimate?: number,
  userGeneratedCodeId: number,
  active: boolean,
  apiKey: string,
}

export function goalTemplateDataNew(props: GoalTemplateDataNewProps, appPubApiHref?: string): Promise<Result<GoalTemplateData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template_data/new", props);
}

export interface GoalTemplatePatternNewProps {
  goalTemplateId: number,
  pattern: string,
  active: boolean,
  apiKey: string,
}

export function goalTemplatePatternNew(props: GoalTemplatePatternNewProps, appPubApiHref?: string): Promise<Result<GoalTemplatePattern, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template_pattern/new", props);
}


export interface NamedEntityNewProps {
  name: string,
  kind: NamedEntityKind,
  apiKey: string,
}

export function namedEntityNew(props: NamedEntityNewProps, appPubApiHref?: string): Promise<Result<NamedEntity, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity/new", props);
}


export interface NamedEntityDataNewProps {
  namedEntityId: number,
  name: string,
  kind: NamedEntityKind,
  active: boolean,
  apiKey: string,
}

export function namedEntityDataNew(props: NamedEntityDataNewProps, appPubApiHref?: string): Promise<Result<NamedEntityData, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity_data/new", props);
}

export interface NamedEntityPatternNewProps {
  namedEntityId: number,
  pattern: string,
  active: boolean,
  apiKey: string,
}

export function namedEntityPatternNew(props: NamedEntityPatternNewProps, appPubApiHref?: string): Promise<Result<NamedEntityPattern, TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity_pattern/new", props);
}

export interface GoalIntentViewProps {
  goalIntentId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function goalIntentView(props: GoalIntentViewProps, appPubApiHref?: string): Promise<Result<GoalIntent[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_intent/view", props);
}

export interface GoalIntentDataViewProps {
  goalIntentDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalIntentId?: number[],
  name?: string[],
  responded?: boolean,
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalIntentDataView(props: GoalIntentDataViewProps, appPubApiHref?: string): Promise<Result<GoalIntentData[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_intent_data/view", props);
}

export interface GoalViewProps {
  goalId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalIntentId?: number[],
  apiKey: string,
}

export function goalView(props: GoalViewProps, appPubApiHref?: string): Promise<Result<Goal[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal/view", props);
}

export interface GoalDataViewProps {
  goalDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalId?: number[],
  name?: string[],
  minDurationEstimate?: number,
  maxDurationEstimate?: number,
  concrete?: boolean,
  timeUtilityFunctionId?: number[],
  status?: GoalDataStatusKind[],
  onlyRecent: boolean,
  goalIntentId?: number[],
  scheduled?: boolean,
  apiKey: string,
}


export function goalDataView(props: GoalDataViewProps, appPubApiHref?: string): Promise<Result<GoalData[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_data/view", props);
}

export interface GoalEventViewProps {
  goalEventId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalId?: number[],
  minStartTime?: number,
  maxStartTime?: number,
  minEndTime?: number,
  maxEndTime?: number,
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalEventView(props: GoalEventViewProps, appPubApiHref?: string): Promise<Result<GoalEvent[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_event/view", props);
}

export interface GoalDependencyViewProps {
  goalDependencyId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalId?: number[],
  dependentGoalId?: number[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalDependencyView(props: GoalDependencyViewProps, appPubApiHref?: string): Promise<Result<GoalDependency[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_dependency/view", props);
}

export interface GoalTemplateViewProps {
  goalTemplateId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function goalTemplateView(props: GoalTemplateViewProps, appPubApiHref?: string): Promise<Result<GoalTemplate[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template/view", props);
}

export interface GoalTemplateDataViewProps {
  goalTemplateDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalTemplateId?: number[],
  name?: string[],
  minUtility?: number,
  maxUtility?: number,
  minDurationEstimate?: number,
  maxDurationEstimate?: number,
  concrete?: boolean,
  userGeneratedCodeId?: number[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalTemplateDataView(props: GoalTemplateDataViewProps, appPubApiHref?: string): Promise<Result<GoalTemplateData[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template_data/view", props);
}

export interface GoalTemplatePatternViewProps {
  goalTemplatePatternId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  goalTemplateId?: number[],
  pattern?: string[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalTemplatePatternView(props: GoalTemplatePatternViewProps, appPubApiHref?: string): Promise<Result<GoalTemplatePattern[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "goal_template_pattern/view", props);
}

export interface ExternalEventViewProps {
  externalEventId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function externalEventView(props: ExternalEventViewProps, appPubApiHref?: string): Promise<Result<ExternalEvent[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "external_event/view", props);
}

export interface ExternalEventDataViewProps {
  externalEventDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  externalEventId?: number[],
  name?: string[],
  minStartTime?: number,
  maxStartTime?: number,
  minEndTime?: number,
  maxEndTime?: number,
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function externalEventDataView(props: ExternalEventDataViewProps, appPubApiHref?: string): Promise<Result<ExternalEventData[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "external_event_data/view", props);
}

export interface TimeUtilityFunctionViewProps {
  timeUtilityFunctionId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function timeUtilityFunctionView(props: TimeUtilityFunctionViewProps, appPubApiHref?: string): Promise<Result<TimeUtilityFunction[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "time_utility_function/view", props);
}

export interface UserGeneratedCodeViewProps {
  userGeneratedCodeId?: number[],
  minCreationUser?: number,
  maxCreationUser?: number,
  creatorUserId?: number[],
  sourceLang?: string[]
  apiKey: string,
}

export function userGeneratedCodeView(props: UserGeneratedCodeViewProps, appPubApiHref?: string): Promise<Result<UserGeneratedCode[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "user_generated_code/view", props);
}

export interface NamedEntityViewProps {
  namedEntityId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function namedEntityView(props: NamedEntityViewProps, appPubApiHref?: string): Promise<Result<NamedEntity[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity/view", props);
}

export interface NamedEntityDataViewProps {
  namedEntityDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  namedEntityId?: number[],
  name?: string[],
  kind?: NamedEntityKind[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function namedEntityDataView(props: NamedEntityDataViewProps, appPubApiHref?: string): Promise<Result<NamedEntityData[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity_data/view", props);
}

export interface NamedEntityPatternViewProps {
  namedEntityPatternId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  namedEntityId?: number[],
  pattern?: string[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function namedEntityPatternView(props: NamedEntityPatternViewProps, appPubApiHref?: string): Promise<Result<NamedEntityPattern[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity_pattern/view", props);
}

export interface GoalEntityTagViewProps {
  goalEntityTagId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  namedEntityId?: number[],
  goalId?: number[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function goalEntityTagView(props: GoalEntityTagViewProps, appPubApiHref?: string): Promise<Result<GoalEntityTag[], TodoAppErrorCode>> {
  return fetchApiOrNetworkError(undefToTodoAppApi(appPubApiHref) + "named_entity_pattern/view", props);
}

