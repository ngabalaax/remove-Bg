import React, { useState } from 'react';
import { useUpdateSettingsMutation } from '../../store/apiSlices/apiSlice';
import { toast } from 'react-toastify';

const Setting = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
  });
  const [updateSettings] = useUpdateSettingsMutation();

  const handleSettingChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateSettings(settings).unwrap();
      toast.success('Settings saved successfully.');
    } catch (error) {
      toast.error('Failed to save settings.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Setting Page</h2>
      <div className="mb-4">
        <label className="mr-4">Theme:</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleSettingChange}
          className="p-2 border rounded"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="mr-4">Notifications:</label>
        <input
          type="checkbox"
          name="notifications"
          checked={settings.notifications}
          onChange={handleSettingChange}
        />
      </div>
      <button onClick={handleSave} className="p-2 bg-blue-500 text-white rounded">
        Save
      </button>
    </div>
  );
};

export default Setting;
