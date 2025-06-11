import { type NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '../../../../../lib/jwt'

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const payload = await verifyJWT(token)

    return NextResponse.json({
      user: payload,
      message: 'Token válido',
    })
  } catch (error) {
    return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
  }
}
