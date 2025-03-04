import { Inter } from 'next/font/google'
import { Footer, Layout } from 'nextra-theme-blog'
import 'nextra-theme-blog/style.css'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Navbar } from './components/nav-bar'
import { NavbarRight } from './components/navbar-right'
import { NeuroShader } from './components/neuro-shader'
import './globals.css'
import './styles.css'
 
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata = {
  title: 'Chris Sperandio'
}

export default async function RootLayout({ children }) { 
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <Head backgroundColor={{ dark: '#111', light: '#f9f9f9' }} />
      <body>
        {/* Background shader - always present */}
        <NeuroShader />
        
        <Layout>
          <Navbar pageMap={await getPageMap()}>
            <NavbarRight />
          </Navbar>

          <main className="minimal-content">
            {children}
          </main>

          <Footer>
            {new Date().getFullYear()} © Christopher Sperandio
          </Footer>
        </Layout>
      </body>
    </html>
  )
}