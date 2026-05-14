import { describe, it, expect, beforeEach, vi } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('../../../lib/meli/meli-client', () => ({
  getProduct: vi.fn(),
}))

import { getProduct } from '../../../lib/meli/meli-client'
import { GET } from './route'

const getProductMock = getProduct as unknown as ReturnType<typeof vi.fn>

function makeReq(url: string): NextRequest {
  return new NextRequest(new Request(url))
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('GET /api/products', () => {
  it('returns 400 when id missing', async () => {
    const res = await GET(makeReq('http://localhost/api/products'))
    expect(res.status).toBe(400)
    const body = await res.json()
    expect(body.error).toMatch(/Provide \?id=/)
    expect(getProductMock).not.toHaveBeenCalled()
  })

  it('returns 200 with data on happy path', async () => {
    const product = { id: 'MLC1', title: 'Foo', slug: 'foo' }
    getProductMock.mockResolvedValueOnce(product)
    const res = await GET(makeReq('http://localhost/api/products?id=MLC1'))
    expect(res.status).toBe(200)
    const body = await res.json()
    expect(body.data).toEqual(product)
    expect(getProductMock).toHaveBeenCalledWith('MLC1')
  })

  it('returns 502 with error message when MeLi 5xx (graceful degradation)', async () => {
    getProductMock.mockRejectedValueOnce(new Error('MeliClient error 503: Service Unavailable'))
    const res = await GET(makeReq('http://localhost/api/products?id=MLC999'))
    expect(res.status).toBe(502)
    const body = await res.json()
    expect(body.error).toMatch(/503/)
  })

  it('returns 502 with 404 message when MeLi responds 404', async () => {
    getProductMock.mockRejectedValueOnce(new Error('MeliClient error 404: Not Found'))
    const res = await GET(makeReq('http://localhost/api/products?id=NOPE'))
    expect(res.status).toBe(502)
    const body = await res.json()
    expect(body.error).toMatch(/404/)
  })
})
