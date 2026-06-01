import { eventSchema        } from './event'
import { liquorItemSchema   } from './liquorItem'
import { foodItemSchema     } from './foodItem'
import { djSchema           } from './dj'
import { galleryImageSchema } from './galleryImage'
import { serviceSchema      } from './service'

export const schemaTypes = [
  eventSchema,
  serviceSchema,
  liquorItemSchema,
  foodItemSchema,
  djSchema,
  galleryImageSchema,
]