import {
  Injectable,
  HttpService,
  NotImplementedException,
  BadRequestException,
} from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Observable, from, of, throwError } from 'rxjs';
import { switchMap, catchError, map } from 'rxjs/operators';
import { ServerSettingsService } from '../../entities/server-settings/server-settings.service';
import { ServerSettings } from '../../entities/server-settings/server-settings.entity';
import {
  INFO_ENDPOINT,
  SERVICE_TYPE_CREATE_ENDPOINT,
  SERVICE_REGISTER_ENDPOINT,
} from '../../../constants/url-endpoints';
import {
  ConnectedServices,
  SERVICE,
  BEARER_HEADER_VALUE_PREFIX,
  APPLICATION_JSON_CONTENT_TYPE,
  AUTHORIZATION,
  CONTENT_TYPE_HEADER_KEY,
} from '../../../constants/app-strings';
import { NOT_CONNECTED } from '../../../constants/messages';
import { TokenCache } from '../../../auth/entities/token-cache/token-cache.entity';

@Injectable()
export class SettingsService extends AggregateRoot {
  private infrastructureURL: string;
  private serverSettings: ServerSettings;

  constructor(
    private readonly serverSettingsService: ServerSettingsService,
    private readonly http: HttpService,
  ) {
    super();
  }

  find(): Observable<ServerSettings> {
    const settings = this.serverSettingsService.find();
    return from(settings);
  }

  update(query, params) {
    return this.find().pipe(
      switchMap(settings => {
        let baseEncodedCred: string;
        if (settings.clientSecret !== params.clientSecret) {
          baseEncodedCred = Buffer.from(
            settings.clientId + ':' + params.clientSecret,
          ).toString('base64');
          return this.http
            .post(
              settings.authServerURL + '/client/v1/verify_changed_secret',
              null,
              { headers: { Authorization: 'Basic ' + baseEncodedCred } },
            )
            .pipe(
              catchError((err, caught) => {
                return of(err);
              }),
              switchMap(data => {
                if (data.response && data.response.status > 299) {
                  // TODO: notify error
                  return of({});
                } else {
                  return from(this.serverSettingsService.update(query, params));
                }
              }),
            );
        } else {
          return from(this.serverSettingsService.update(query, params));
        }
      }),
    );
  }

  async registerService(token: TokenCache) {
    return this.queryAuthInfoForInfrastructureConsole()
      .pipe(
        switchMap(infraUrl => {
          this.infrastructureURL = infraUrl;
          return this.registerServiceTypeOnInfra(token);
        }),
        switchMap(response => {
          return this.registerServiceOnInfra(token);
        }),
      )
      .toPromise();
  }

  queryAuthInfoForInfrastructureConsole() {
    return this.find().pipe(
      switchMap(settings => {
        this.serverSettings = settings;
        return this.http.get(this.serverSettings.authServerURL + INFO_ENDPOINT);
      }),
      map(res => res.data),
      switchMap(authInfo => {
        const services: { type: string; url: string }[] = authInfo.services;
        for (const service of services) {
          if (service.type === ConnectedServices.InfrastructureConsole) {
            return of(service.url);
          }
        }
        return throwError(
          new NotImplementedException(
            `${ConnectedServices.InfrastructureConsole} ${NOT_CONNECTED}`,
          ),
        );
      }),
    );
  }

  registerServiceTypeOnInfra(token: TokenCache) {
    const headers = this.getHeaders(token);
    return this.http
      .post(
        this.infrastructureURL + SERVICE_TYPE_CREATE_ENDPOINT,
        { name: SERVICE },
        { headers },
      )
      .pipe(catchError(error => of({})));
  }

  registerServiceOnInfra(token: TokenCache) {
    const headers = this.getHeaders(token);
    return this.http
      .post(
        this.infrastructureURL + SERVICE_REGISTER_ENDPOINT,
        {
          name: SERVICE + ' ' + this.serverSettings.uuid,
          clientId: this.serverSettings.clientId,
          serviceURL: this.serverSettings.appURL,
          type: SERVICE,
        },
        { headers },
      )
      .pipe(
        catchError(error => {
          return throwError(new BadRequestException(error.response.data));
        }),
      );
  }

  getHeaders(token: TokenCache) {
    const headers = {};
    headers[
      AUTHORIZATION
    ] = `${BEARER_HEADER_VALUE_PREFIX} ${token.accessToken}`;
    headers[CONTENT_TYPE_HEADER_KEY] = APPLICATION_JSON_CONTENT_TYPE;
    return headers;
  }
}
