# Supabase & Vercel Integration – FrontDesk Agents

## 1. Contexto

Este documento registra la integración entre:

- **Supabase Project**: `FrontDeskAgents`
- **Supabase URL**: `https://awzczbaarskqjgdatefv.supabase.co`
- **Frontend / Hosting**: Vercel
- **Proyecto Vercel**: `front-desk-agents-llc-completed`
- **Dominio de producción**: https://frontdeskagents.com

> Nota: Las claves privadas NO se guardan en este repositorio.  
> Solo se documentan los nombres de variables y el flujo de integración.

---

## 2. Variables de entorno requeridas

En el panel de Vercel para `front-desk-agents-llc-completed`, deben existir:

- `NEXT_PUBLIC_SUPABASE_URL`
  - Valor: `https://awzczbaarskqjgdatefv.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - Valor: `ANON PUBLIC KEY` del proyecto Supabase (copiado del dashboard).

Ambas variables deben estar definidas en:
- **Production**
- **Preview**

---

## 3. Proceso estándar de integración

1. **Obtener credenciales en Supabase**
   - Ir a: Project → Settings → API
   - Copiar:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

2. **Configurar variables en Vercel**
   - Settings → Environment Variables
   - Crear/actualizar las variables anteriores.
   - Guardar cambios.

3. **Desplegar de nuevo**
   - Vercel normalmente hace el redeploy automático.
   - Si no, pulsar “Redeploy” sobre la rama `main`.

4. **Validar en producción**
   - Navegar a https://frontdeskagents.com
   - Confirmar:
     - Carga correcta de la aplicación (status 200).
     - HTTPS válido (candado SSL).
     - Sin errores de CORS en la consola del navegador.
     - Llamadas a Supabase responden 200 OK.

---

## 4. Estado de la integración

- **Fecha de última verificación**: 2025-12-01
- **Estado**: ✅ Production Live – Supabase Integrated
- **Notas de verificación**:
  - El Command Center cargó datos dinámicos (ej. conteo de llamadas y citas).
  - SSL activo, sin errores de red críticos durante la obtención de datos.

> Esta sección debe actualizarse cada vez que se cambie de proyecto Supabase,
> se roten claves o se migre el hosting.
