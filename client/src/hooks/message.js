import { useCallback } from 'react'
import { ToastContainer, toast } from 'react-toastify';

export const useMessage = () => useCallback(
  (text) => toast(text), [])