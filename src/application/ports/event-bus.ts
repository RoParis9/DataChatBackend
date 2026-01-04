export interface EventBus {
  publish(event: DomainEvent): Promise<void>;
}

export interface DomainEvent {
  name: string;
  payload: unknown;
}
