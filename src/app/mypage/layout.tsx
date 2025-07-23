// layout.tsx (서버 컴포넌트)
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ResponsiveLayout>{children}</ResponsiveLayout>;
}
