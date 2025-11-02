// src/components/Toast.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import '../styles/styleindex.css';

export default function Toast() {
  const { toast } = useApp();

  if (!toast.show) return null;

  return (
    <div className={`toast show ${toast.type}`}>
      {toast.message}
    </div>
  );
}