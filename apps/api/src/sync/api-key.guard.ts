import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import type { Request } from 'express'

/**
 * Protege los endpoints de sync con una API key estática.
 * Leer el header X-Api-Key y compararlo contra la variable de entorno SYNC_API_KEY.
 * Sin esta variable configurada, todos los requests son rechazados.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const syncApiKey = process.env.SYNC_API_KEY
    if (!syncApiKey) {
      throw new UnauthorizedException('Sync API key not configured')
    }

    const request = context.switchToHttp().getRequest<Request>()
    const providedKey = request.headers['x-api-key']

    if (providedKey !== syncApiKey) {
      throw new UnauthorizedException('Invalid API key')
    }

    return true
  }
}
