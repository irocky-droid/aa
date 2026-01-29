import Head from 'next/head'
import Calculator from '@/components/calculator/Calculator'

const Index = () => (
	<>
		<Head>
			<title>iOS Calc 26 </title>
			<meta name='description' content='A beautiful iOS 26 style calculator built with Next.js' />
			<meta name='theme-color' content='#667eea' media='(prefers-color-scheme: light)' />
			<meta name='theme-color' content='#1a1a2e' media='(prefers-color-scheme: dark)' />
		</Head>
		
		<div className='min-h-screen'>
			<Calculator />
		</div>
	</>
)

export default Index
