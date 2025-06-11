import { type NextRequest, NextResponse } from 'next/server'
import { getSession } from '../../../../../lib/session'
import bcrypt from 'bcryptjs'

// Simulación de base de datos
const users = [
  {
    id: '1',
    email: 'demo@example.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password123
    name: 'Usuario Demo',
  },
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Buscar usuario
    const user = users.find((u) => u.email === email)
    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 401 })
    }

    // Verificar contraseña
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 })
    }

    // Crear sesión
    const session = await getSession()
    session.userId = user.id
    session.email = user.email
    session.name = user.name
    session.isLoggedIn = true
    await session.save()

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, name: user.name },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
