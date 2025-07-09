'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
//import { useToast } from '@/components/ui/Toast';
import { Toaster, toast } from "sonner";
import { 
  FiUser, 
  FiBell, 
  FiMonitor, 
  FiDatabase, 
  FiShield, 
  FiSave,
  FiRefreshCw,
  FiDownload,
  FiUpload
} from 'react-icons/fi';

export default function SettingsPage() {
  //const { success, error } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  // Profile settings
  const [profileData, setProfileData] = useState({
    name: 'Administrador',
    email: 'admin@edu.com',
    role: 'admin',
    phone: '+1 234 567 8900',
    department: 'Tecnología Educativa',
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    lowAttentionAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
  });

  // System settings
  const [systemSettings, setSystemSettings] = useState({
    autoRefreshInterval: 30,
    dataRetentionDays: 90,
    maxStudentsPerClass: 35,
    attentionThreshold: 60,
    recordingEnabled: true,
  });

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: FiUser },
    { id: 'notifications', name: 'Notificaciones', icon: FiBell },
    { id: 'monitoring', name: 'Monitoreo', icon: FiMonitor },
    { id: 'data', name: 'Datos', icon: FiDatabase },
    { id: 'security', name: 'Seguridad', icon: FiShield },
  ];

  const handleSave = async (section: string) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      //success('Configuración guardada', `Los ajustes de ${section} se han actualizado correctamente.`);
      toast.success(`Configuración guardada Los ajustes de ${section} se han actualizado correctamente.`);

    } catch (err) {
      error('Error al guardar', 'No se pudieron guardar los cambios. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nombre Completo
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Departamento
            </label>
            <input
              type="text"
              value={profileData.department}
              onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('perfil')}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          <FiSave className="h-4 w-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Preferencias de Notificación</h3>
        <div className="space-y-4">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  {key === 'emailNotifications' && 'Notificaciones por Email'}
                  {key === 'pushNotifications' && 'Notificaciones Push'}
                  {key === 'lowAttentionAlerts' && 'Alertas de Baja Atención'}
                  {key === 'weeklyReports' && 'Reportes Semanales'}
                  {key === 'systemUpdates' && 'Actualizaciones del Sistema'}
                </label>
                <p className="text-xs text-gray-500">
                  {key === 'emailNotifications' && 'Recibir notificaciones en tu correo electrónico'}
                  {key === 'pushNotifications' && 'Mostrar notificaciones en el navegador'}
                  {key === 'lowAttentionAlerts' && 'Alertas cuando la atención baje del umbral'}
                  {key === 'weeklyReports' && 'Resumen semanal de actividad'}
                  {key === 'systemUpdates' && 'Notificaciones sobre actualizaciones'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setNotificationSettings({
                    ...notificationSettings,
                    [key]: e.target.checked
                  })}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('notificaciones')}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          <FiSave className="h-4 w-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  );

  const renderMonitoringTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración de Monitoreo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Intervalo de Actualización (segundos)
            </label>
            <input
              type="number"
              min="5"
              max="300"
              value={systemSettings.autoRefreshInterval}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                autoRefreshInterval: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Umbral de Atención (%)
            </label>
            <input
              type="number"
              min="0"
              max="100"
              value={systemSettings.attentionThreshold}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                attentionThreshold: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Máximo Estudiantes por Aula
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={systemSettings.maxStudentsPerClass}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                maxStudentsPerClass: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="recording"
              checked={systemSettings.recordingEnabled}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                recordingEnabled: e.target.checked
              })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="recording" className="text-sm font-medium text-gray-700">
              Habilitar Grabación de Video
            </label>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={() => handleSave('monitoreo')}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          <FiSave className="h-4 w-4" />
          <span>Guardar Cambios</span>
        </button>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gestión de Datos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Retención de Datos (días)
            </label>
            <input
              type="number"
              min="30"
              max="365"
              value={systemSettings.dataRetentionDays}
              onChange={(e) => setSystemSettings({
                ...systemSettings,
                dataRetentionDays: parseInt(e.target.value)
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              Los datos se eliminarán automáticamente después de este período
            </p>
          </div>
        </div>
        
        <div className="mt-8">
          <h4 className="text-md font-medium text-gray-900 mb-4">Acciones de Datos</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiDownload className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Exportar Datos</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <FiUpload className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Importar Datos</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 p-4 border border-red-300 rounded-lg hover:bg-red-50 transition-colors text-red-600">
              <FiRefreshCw className="h-5 w-5" />
              <span className="text-sm font-medium">Limpiar Datos</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Configuración">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'monitoring' && renderMonitoringTab()}
            {activeTab === 'data' && renderDataTab()}
            {activeTab === 'security' && (
              <div className="text-center py-12">
                <FiShield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Configuración de Seguridad</h3>
                <p className="text-gray-500">Esta sección estará disponible en una próxima actualización.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" />

    </DashboardLayout>
  );
}

