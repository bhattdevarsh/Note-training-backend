import {
  ConfigService,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
  MONGO_URI_PREFIX,
} from '../config/config.service';
import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';
import { ServerSettings } from '../system-settings/entities/server-settings/server-settings.entity';
import { TokenCache } from '../auth/entities/token-cache/token-cache.entity';
import { Note } from 'src/note-management/entities/note/note.entity';
import { UpdateNote } from 'src/note-management/entities/update-note/update-note.entity';

export function connectTypeORM(config: ConfigService): MongoConnectionOptions {
  const mongoUriPrefix = config.get(MONGO_URI_PREFIX) || 'mongodb';
  const mongoOptions = 'retryWrites=true';
  return {
    url: `${mongoUriPrefix}://${config.get(DB_USER)}:${config.get(
      DB_PASSWORD,
    )}@${config.get(DB_HOST)}/${config.get(DB_NAME)}?${mongoOptions}`,
    type: 'mongodb',
    logging: false,
    synchronize: true,
    entities: [ServerSettings, TokenCache, Note,UpdateNote],
    useNewUrlParser: true,
    w: 'majority',
    useUnifiedTopology: true,
  };
}
