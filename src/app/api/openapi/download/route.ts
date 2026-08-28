import type { NextRequest } from 'next/server'

const DOWNLOADS = {
  yaml: {
    publicPath: '/openapi.yaml',
    filename: 'empay-openapi.yaml',
    contentType: 'application/yaml; charset=utf-8',
  },
  json: {
    publicPath: '/openapi.json',
    filename: 'empay-openapi.json',
    contentType: 'application/json; charset=utf-8',
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
  const sourceResponse = await fetch(new URL(download.publicPath, request.nextUrl.origin), {
    cache: 'force-cache',
  })

  if (!sourceResponse.ok) {
    return Response.json({ error: 'The OpenAPI specification is unavailable.' }, { status: 502 })
  }

  return new Response(sourceResponse.body, {
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
