import React from 'react';
import { AuthGuard } from '../guards/auth-guard';

export const withAuthGuard = (Component: any) => (props: any) => (
  <AuthGuard>
    <Component {...props} />
  </AuthGuard>
);