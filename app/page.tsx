// ... (código justo antes del corte) ...
              <img
                src="https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=1200&q=90&fit=crop"
                alt="Professional executive"
                className="w-full aspect-video object-cover"
              />
              {/* ¡CORRECCIÓN! El div debe cerrarse correctamente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" /> 
            </div> {/* Cierra el div con la imagen */}

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Listo para Transformar tu Servicio al Cliente?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Contáctanos hoy para iniciar tu consulta ejecutiva gratuita y descubre el poder del FrontDesk AI.
            </p>
            
            <Link
                href="/demo"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 max-w-xs mx-auto"
              >
                Schedule Executive Demo
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div> {/* Cierra el max-w-4xl div */}
        </div> {/* Cierra el container div */}
      </section> {/* Cierra la sección Final CTA */}

      {/* Footer Section (Opcional, pero necesario para completar el diseño) */}
      <footer className="py-12 border-t border-white/10 bg-[#000814]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} FrontDesk Agents LLC. All rights reserved. | 
            <Link href="/privacy" className="hover:text-cyan-400 ml-2">Privacy Policy</Link>
          </div>
        </div>
      </footer>

    </div> // Cierra el div principal de la página (min-h-screen)
  ); // Cierra el return
} // Cierra el export default function HomePage()
