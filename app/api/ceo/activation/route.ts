// app/api/ceo/activation/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { authorizeOwner } from '@/lib/auth/authorization';
import { db } from '@/db/client'; // Asume que db/client.ts maneja system_activations

export async function GET(request: NextRequest) {
  try {
    // 1. Autorización: Solo el OWNER puede ver el estado
    await authorizeOwner(request); 

    // 2. Obtener el estado de toda la matriz
    // NOTA: Implementar db.system_activations.findAll() para obtener todas las filas
    const activations = await db.system_activations.findAll(); 

    return NextResponse.json(activations);

  } catch (error) {
    console.error("Error fetching activation matrix:", error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Autorización: Solo el OWNER puede modificar el estado
    const user = await authorizeOwner(request);

    const { system_key, enabled } = await request.json();

    if (!system_key || typeof enabled !== 'boolean') {
      return new NextResponse('Missing system_key or enabled state.', { status: 400 });
    }

    // 2. Actualizar la matriz en la DB
    // NOTA: Implementar db.system_activations.update({ system_key, enabled, activated_by, ... })
    const updated = await db.system_activations.update({
      where: { system_key: system_key },
      data: { 
        enabled: enabled,
        activated_by: user.email, // Registra quién hizo el cambio
        last_updated: new Date()
      }
    });

    return NextResponse.json(updated);

  } catch (error) {
    console.error("Error updating activation matrix:", error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
