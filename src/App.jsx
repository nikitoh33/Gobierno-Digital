import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Login from './components/Login';
import BusinessList from './components/BusinessList';
import AssociateBusinessModal from './components/AssociateBusinessModal';
import ClaimWizard from './components/ClaimWizard';
import ClaimSuccess from './components/ClaimSuccess';
import UserProfileView from './components/UserProfileView';
import Footer from './components/Footer';
import { initialBusinesses, mockUser } from './data/mockData';
import { 
  Building2, 
  Wind, 
  FileText, 
  ShieldAlert, 
  CheckCircle, 
  ArrowRight, 
  Clock,
  User,
  ShieldCheck,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export default function App() {
  // Estado de Autenticación de Usuario (paso previo al Dashboard)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(mockUser);

  // Estado de Comercios (persistido en localStorage; reseteado a los 2 comercios base)
  const [businesses, setBusinesses] = useState(() => {
    try {
      const saved = localStorage.getItem('mendo_businesses_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
      return initialBusinesses;
    } catch {
      return initialBusinesses;
    }
  });

  // Estado de Expedientes / Solicitudes
  const [claims, setClaims] = useState(() => {
    try {
      const saved = localStorage.getItem('mendo_claims');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navegación: 'dashboard' | 'claim_wizard' | 'claim_success' | 'profile'
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [activeClaim, setActiveClaim] = useState(null);
  const [claimToDelete, setClaimToDelete] = useState(null);
  const [isAssociateModalOpen, setIsAssociateModalOpen] = useState(false);

  // Sincronizar en localStorage
  useEffect(() => {
    localStorage.setItem('mendo_businesses_v4', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('mendo_claims', JSON.stringify(claims));
  }, [claims]);

  // Manejadores
  const handleStartClaim = (business) => {
    setSelectedBusiness(business);
    setCurrentView('claim_wizard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitClaim = (claimData) => {
    const updatedClaims = [claimData, ...claims];
    setClaims(updatedClaims);
    setActiveClaim(claimData);
    setCurrentView('claim_success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedBusiness(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfile = () => {
    setCurrentView('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddBusiness = (newBusiness) => {
    setBusinesses(prev => [newBusiness, ...prev]);
  };

  const handleDeleteBusiness = (businessId) => {
    setBusinesses(prev => prev.filter(b => b.id !== businessId));
  };

  const handleDeleteClaim = (claimId) => {
    setClaims(prev => prev.filter(c => c.id !== claimId));
    if (activeClaim && activeClaim.id === claimId) {
      setActiveClaim(null);
      setCurrentView('dashboard');
    }
    setClaimToDelete(null);
  };

  const handleResetBusinesses = () => {
    setBusinesses(initialBusinesses);
  };

  const handleResolveDebt = (businessId) => {
    setBusinesses(prev => prev.map(b => {
      if (b.id === businessId) {
        return {
          ...b,
          tieneDeuda: false,
          estado: "HABILITADO",
          estadoFiscal: "HABILITADO",
          motivoBloqueo: undefined,
          detalleDeuda: undefined,
          ultimoPagoTasas: "Al día (Octubre 2026 - Regularizado ante organismo)"
        };
      }
      return b;
    }));
  };

  const handleResetData = () => {
    localStorage.removeItem('mendo_businesses_v4');
    localStorage.removeItem('mendo_claims');
    setBusinesses(initialBusinesses);
    setClaims([]);
    setCurrentView('dashboard');
    setSelectedBusiness(null);
    setActiveClaim(null);
  };

  const handleLoginSuccess = (userData) => {
    if (userData) {
      setCurrentUser(prev => ({
        ...prev,
        ...userData
      }));
    }
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('dashboard');
    setSelectedBusiness(null);
    setActiveClaim(null);
  };

  // Si no está autenticado, renderizar exclusivamente el componente de Login institucional
  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1F2937]">
      {/* Header Institucional Fiel a Argentina.gob.ar con navegación al inicio y perfil */}
      <Header 
        user={currentUser} 
        onGoHome={handleBackToDashboard} 
        onOpenProfile={handleOpenProfile} 
        onLogout={handleLogout}
      />

      {/* Contenedor Principal */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 py-5 sm:py-8">
        
        {/* VISTA 1: DASHBOARD PRINCIPAL */}
        {currentView === 'dashboard' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-150">
            
            {/* Hero Banner Institucional con Recuadre Marcado */}
            <div className="bg-white rounded-2xl p-4 sm:p-8 border-2 border-gray-300 shadow-md relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-[#0072BB] uppercase tracking-wider bg-blue-50 px-2.5 sm:px-3 py-1 rounded-full mb-2.5 sm:mb-3 border-2 border-blue-200">
                  <Wind className="w-3.5 h-3.5 shrink-0" />
                  Programa Provincial de Recuperación Productiva
                </span>
                <h1 className="text-xl sm:text-4xl font-extrabold text-[#0B2341] tracking-tight leading-tight">
                  Ventanilla Digital de Asistencia ante Emergencias Climáticas
                </h1>
                <p className="text-xs sm:text-base text-gray-700 mt-2 sm:mt-3 leading-relaxed">
                  Canal oficial para comerciantes de la Ciudad de Mendoza y Gran Mendoza afectados por Viento Zonda, tormentas aluvionales o granizo. Gestione su solicitud de evaluación técnica para exenciones de tasas, subsidios o líneas de crédito productivo.
                </p>
              </div>

              {/* Indicadores con Borde Nítido */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t-2 border-gray-200">
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3.5 border-2 border-gray-200">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block">Comercios Asociados</span>
                  <span className="text-lg sm:text-xl font-extrabold text-gray-900">{businesses.length} locales</span>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3.5 border-2 border-gray-200">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block">Habilitados</span>
                  <span className="text-lg sm:text-xl font-extrabold text-emerald-700">
                    {businesses.filter(b => !b.tieneDeuda).length} apto(s)
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3.5 border-2 border-gray-200">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block">Inhabilitados</span>
                  <span className="text-lg sm:text-xl font-extrabold text-red-700">
                    {businesses.filter(b => b.tieneDeuda).length} con deuda
                  </span>
                </div>
                <div className="bg-gray-50 rounded-xl p-2.5 sm:p-3.5 border-2 border-gray-200">
                  <span className="text-[11px] sm:text-xs text-gray-500 font-medium block">Expedientes</span>
                  <span className="text-lg sm:text-xl font-extrabold text-[#0072BB]">{claims.length} trámite(s)</span>
                </div>
              </div>
            </div>

            {/* Listado de Comercios con Recuadros Nítidos */}
            <BusinessList 
              businesses={businesses}
              claims={claims}
              onStartClaim={handleStartClaim}
              onOpenAssociateModal={() => setIsAssociateModalOpen(true)}
              onResolveDebt={handleResolveDebt}
            />

            {/* Sección de Expedientes Previos con Borde Marcado */}
            {claims.length > 0 && (
              <div className="bg-white rounded-2xl border-2 border-gray-300 shadow-md p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pb-3 border-b-2 border-gray-200 gap-2">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0072BB]" />
                    <h3 className="font-bold text-base sm:text-lg text-[#0B2341]">
                      Historial de Solicitudes y Expedientes Presentados
                    </h3>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold bg-gray-100 px-2.5 py-1 rounded-full self-start sm:self-auto">
                    {claims.length} expediente(s) en curso
                  </span>
                </div>

                <div className="divide-y-2 divide-gray-100 text-xs sm:text-sm">
                  {claims.map((c) => (
                    <div key={c.id} className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#0072BB] text-sm">
                            {c.trackingCode}
                          </span>
                          <span className="bg-blue-100 text-[#0072BB] font-bold text-xs px-2.5 py-0.5 rounded-full border border-blue-200">
                            {c.contingencyType}
                          </span>
                        </div>
                        <p className="text-gray-900 font-bold mt-1">
                          {c.businessName} • {Array.isArray(c.suggestedAssistance) ? c.suggestedAssistance.join(', ') : c.suggestedAssistance}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          Peritaje asignado a: <strong>{c.responsibleEntity}</strong>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className="bg-amber-100 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border-2 border-amber-200">
                          {c.status}
                        </span>
                        <button
                          onClick={() => {
                            setActiveClaim(c);
                            setCurrentView('claim_success');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="text-xs text-[#0072BB] font-bold hover:underline cursor-pointer"
                        >
                          Ver Ficha →
                        </button>
                        <button
                          onClick={() => setClaimToDelete(c)}
                          className="inline-flex items-center gap-1 text-xs text-red-700 hover:text-red-900 bg-red-50 hover:bg-red-100 border border-red-200 font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          title="Desistir o eliminar esta solicitud"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Eliminar</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* VISTA 2: FORMULARIO WIZARD DE SOLICITUD */}
        {currentView === 'claim_wizard' && selectedBusiness && (
          <ClaimWizard 
            business={selectedBusiness}
            onCancel={handleBackToDashboard}
            onSubmitClaim={handleSubmitClaim}
          />
        )}

        {/* VISTA 3: PANTALLA DE COMPROBANTE Y ÉXITO */}
        {currentView === 'claim_success' && activeClaim && (
          <ClaimSuccess 
            claim={activeClaim}
            onBackToDashboard={handleBackToDashboard}
            onDeleteClaim={handleDeleteClaim}
          />
        )}

        {/* VISTA 4: PERFIL DEL CIUDADANO EN PANTALLA COMPLETA */}
        {currentView === 'profile' && (
          <UserProfileView 
            user={mockUser}
            businesses={businesses}
            onBack={handleBackToDashboard}
            onDeleteBusiness={handleDeleteBusiness}
            onResetBusinesses={handleResetBusinesses}
          />
        )}

      </main>

      {/* Modal de Asociación de Comercio por CUIT */}
      <AssociateBusinessModal 
        isOpen={isAssociateModalOpen}
        onClose={() => setIsAssociateModalOpen(false)}
        onAddBusiness={handleAddBusiness}
      />

      {/* Modal de Confirmación para Eliminar / Desistir Solicitud */}
      {claimToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-gray-300">
            <div className="flex items-center gap-3 text-red-700 pb-3 border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h4 className="font-extrabold text-base text-gray-900">¿Eliminar Solicitud?</h4>
                <p className="text-xs text-gray-500 font-mono">Expediente {claimToDelete.trackingCode}</p>
              </div>
            </div>

            <div className="my-4 text-xs text-gray-600 space-y-2">
              <p>
                Está a punto de desistir y dar de baja el expediente para <strong>{claimToDelete.businessName}</strong>.
              </p>
              <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-lg text-amber-900 leading-relaxed">
                Esta acción cancelará el peritaje técnico programado de Defensa Civil y liberará el comercio para futuras presentaciones.
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setClaimToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDeleteClaim(claimToDelete.id)}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg text-xs transition-colors shadow-xs cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Confirmar Eliminación</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Institucional Estilo Argentina.gob.ar */}
      <Footer />
    </div>
  );
}
