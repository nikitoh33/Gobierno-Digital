import React from 'react';
import { PhoneCall, Shield, FileText, ExternalLink, Landmark } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0B2341] text-gray-300 mt-16 border-t-4 border-[#0072BB] print:hidden">
      {/* Sección Superior: Teléfonos de Emergencia y Asistencia Rápida */}
      <div className="bg-[#071629] py-3 sm:py-4 px-3.5 sm:px-6 lg:px-8 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-4 text-xs">
          <div className="flex items-center gap-2 text-white font-bold">
            <PhoneCall className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-[11px] sm:text-xs">CENTRALES DE EMERGENCIAS PROVINCIALES:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-6 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white bg-red-600 px-2 py-0.5 rounded text-[11px]">911</span>
              <span className="text-gray-300">Policía y Salud</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white bg-amber-600 px-2 py-0.5 rounded text-[11px]">103</span>
              <span className="text-gray-300">Defensa Civil</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-white bg-blue-600 px-2 py-0.5 rounded text-[11px]">147</span>
              <span className="text-gray-300">Ciudad de Mendoza</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido Principal del Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Columna 1: Identidad Institucional */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-3">
              <img 
                src="/escudo.svg" 
                alt="República Argentina" 
                className="h-10 w-auto filter drop-shadow brightness-110"
              />
              <span className="text-xl font-bold tracking-tight text-white">
                Argentina<span className="text-[#0072BB]">.gob.ar</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              MendoRecupera es la ventanilla digital unificada para la gestión de contingencias climáticas y asistencia al sector productivo y comercial del Gran Mendoza.
            </p>
            <div className="pt-2 text-[11px] text-gray-300 space-y-0.5">
              <p className="font-bold text-white">Gobierno de la Provincia de Mendoza</p>
              <p className="text-gray-400">Ministerio de Producción y Desarrollo Económico</p>
              <p className="text-gray-400">Municipalidad de la Ciudad de Mendoza</p>
            </div>
          </div>

          {/* Columna 2: Marco Normativo y Legal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-[#0072BB]" />
              Marco Normativo
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-300">
              <li>
                <a 
                  href="https://www.argentina.gob.ar/aaip/datospersonales/ley" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline flex items-center gap-1"
                >
                  <span>Ley 25.326 - Protección de Datos Personales</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.argentina.gob.ar/accesoalainformacion" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline flex items-center gap-1"
                >
                  <span>Ley 27.275 - Acceso a la Información Pública</span>
                  <ExternalLink className="w-3 h-3 text-gray-500" />
                </a>
              </li>
              <li>
                <span className="text-gray-400">Resolución Ministerial N° 451/2026 - Emergencia Climática</span>
              </li>
              <li>
                <span className="text-gray-400">Ordenanza Municipal Ciudad de Mendoza N° 4110</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Interoperabilidad Estatal */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#0072BB]" />
              Organismos Interconectados
            </h4>
            <ul className="space-y-1.5 text-xs text-gray-400">
              <li>• ARCA (Agencia de Recaudación y Control Aduanero)</li>
              <li>• ATM (Administración Tributaria Mendoza)</li>
              <li>• Municipalidad de la Ciudad de Mendoza</li>
              <li>• Dirección Provincial de Defensa Civil</li>
              <li>• Fondo para la Transformación y el Crecimiento (FTyC)</li>
            </ul>
          </div>

          {/* Columna 4: Acerca del Sistema */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-[#0072BB]" />
              Propósito y Alcance
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Plataforma digital desarrollada con el propósito de optimizar los tiempos de respuesta del Estado ante emergencias climáticas severas, garantizando transparencia, trazabilidad y cero intermediación burocrática.
            </p>
          </div>

        </div>

        {/* Barra de Copyright inferior */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Presidencia de la Nación - República Argentina | Gobierno de la Provincia de Mendoza</p>
          <p className="text-[11px] text-gray-400">
            Versión 1.2.0 • Diseñado conforme a los estándares de diseño y accesibilidad de Argentina.gob.ar
          </p>
        </div>
      </div>
    </footer>
  );
}
