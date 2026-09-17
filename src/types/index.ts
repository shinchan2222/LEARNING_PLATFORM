export interface SecurityIncident {
  id: string;
  threatName: string;
  tactic: string;
  sourceIp: string;
  targetAsset: string;
  containmentTimeSeconds: number;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'CONTAINED' | 'ISOLATED' | 'ANALYZING';
  timestamp: string;
}

export interface SecurityModule {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  desc: string;
  tag: string;
  color: string;
  features: string[];
  liveMetrics: Record<string, string>;
}

export interface PlatformCapability {
  id: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
}

export interface PartnerProgram {
  type: 'MSP' | 'MSSP' | 'ENTERPRISE';
  title: string;
  headline: string;
  description: string;
  features: string[];
}
