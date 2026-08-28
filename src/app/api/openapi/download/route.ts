import type { NextRequest } from 'next/server'
import { stringify as stringifyYaml } from 'yaml'
import { apiReferenceConfig } from '@/config/api-reference'
import { getSpecConfig, loadSpecDocument } from '@/lib/openapi/fetch'
import type { OpenAPIDocument } from '@/lib/openapi/types'

const DOWNLOADS = {
  yaml: {
    filename: 'empay-openapi.yaml',
    contentType: 'application/yaml; charset=utf-8',
    serialize: (document: OpenAPIDocument) => stringifyYaml(document),
  },
  json: {
    filename: 'empay-openapi.json',
    contentType: 'application/json; charset=utf-8',
    serialize: (document: OpenAPIDocument) => JSON.stringify(document, null, 2),
  },
} as const

type DownloadFormat = keyof typeof DOWNLOADS

export async function GET(request: NextRequest) {
  const format = request.nextUrl.searchParams.get('format')
  if (!isDownloadFormat(format)) {
    return Response.json(
      { error: 'Choose a supported format: yaml or json.' },
      { status: 400 },
    )
  }

  const download = DOWNLOADS[format]
  const specConfig = getSpecConfig(apiReferenceConfig, apiReferenceConfig.defaultSpecId)
  let document: OpenAPIDocument

  try {
    document = await loadSpecDocument(specConfig)
  } catch {
    return Response.json({ error: 'The OpenAPI specification is unavailable.' }, { status: 502 })
  }

  return new Response(download.serialize(document), {
    headers: {
      'Cache-Control': 'public, max-age=300',
      'Content-Disposition': `attachment; filename="${download.filename}"`,
      'Content-Type': download.contentType,
    },
  })
}

function isDownloadFormat(format: string | null): format is DownloadFormat {
  return format === 'yaml' || format === 'json'
}
