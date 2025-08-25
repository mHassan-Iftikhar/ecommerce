import { Header, Footer } from '../../components';
import type { FC, ReactNode } from 'react'

interface RootLayoutProps {
    className?: string;
    children: ReactNode
}

const RootLayout:FC<RootLayoutProps> = ({
    className = 'm-6',
    children
}) => {
  return (
    <main className={` ${className}`}>
        <Header />
          {children}
        <Footer />
    </main>
  )
}

export default RootLayout