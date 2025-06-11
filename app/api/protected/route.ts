import { NextResponse } from 'next/server'
import { getSession } from '../../../lib/session'

export async function GET() {
  try {
    const session = await getSession()

    if (!session.isLoggedIn) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    return NextResponse.json({
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
