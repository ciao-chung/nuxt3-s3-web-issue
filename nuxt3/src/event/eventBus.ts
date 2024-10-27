import mitt from 'mitt'

type FormKey = string
type EventType = {
  [key: `form/${FormKey}/beforeSave`]: unknown
  [key: `form/${FormKey}/submit`]: unknown
  [key: `form/${FormKey}/reset`]: unknown
  close: unknown
}

export const eventBus = mitt<EventType>()