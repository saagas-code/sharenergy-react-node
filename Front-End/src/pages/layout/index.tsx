
import { Header } from './../../components/Header/index';

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <>
      <Header />
      <div className="p-4">
        {children}
      </div>
    </>
  )
}